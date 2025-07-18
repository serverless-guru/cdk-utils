import * as cdk from "aws-cdk-lib";
import * as cloudwatch from "aws-cdk-lib/aws-cloudwatch";
import * as cloudwatch_actions from "aws-cdk-lib/aws-cloudwatch-actions";
import * as sns from "aws-cdk-lib/aws-sns";
import * as sqs from "aws-cdk-lib/aws-sqs";
import { Construct } from "constructs";

export const CONSTRUCT_NAME = "sqs-with-dlq";

export interface SqsWithDlqProps {
	/**
	 * The SNS topic to send alarm notifications to
	 */
	readonly alarmTopicArn: string;

	/**
	 * Whether the queues should be FIFO queues
	 * @default false
	 */
	readonly fifo?: boolean;

	/**
	 * The number of days messages will be retained in the queues
	 * @default Duration.days(14)
	 */
	readonly messageRetentionPeriod?: cdk.Duration;
}

export class SqsWithDlq extends Construct {
	/**
	 * The main queue
	 */
	public readonly queue: sqs.Queue;

	/**
	 * The dead letter queue
	 */
	public readonly deadLetterQueue: sqs.Queue;

	/**
	 * Alarm indicating there are messages in the DLQ
	 */
	public readonly messagesVisibleAlarm: cloudwatch.Alarm;

	/**
	 * Alarm indicating there are messages that will expire within 3 days in the DLQ
	 */
	public readonly messageAgeAlarm: cloudwatch.Alarm;

	constructor(scope: Construct, id: string, props: SqsWithDlqProps) {
		super(scope, id);

		const retentionPeriod =
			props.messageRetentionPeriod ?? cdk.Duration.days(14);

		const minRetentionDays = 4;
		if (retentionPeriod.toDays() < minRetentionDays) {
			throw Error(
				`messageRetentionPeriod must be at least ${minRetentionDays} days, but got ${retentionPeriod.toDays()}.`,
			);
		}

		const alarmTopic = sns.Topic.fromTopicArn(
			this,
			"ImportedAlarmTopic",
			props.alarmTopicArn,
		);

		// Create the DLQ first
		this.deadLetterQueue = new sqs.Queue(this, "DLQ", {
			fifo: props.fifo,
			retentionPeriod: retentionPeriod,
		});

		// Create the main queue with the DLQ configuration
		this.queue = new sqs.Queue(this, "Queue", {
			fifo: props.fifo,
			retentionPeriod: retentionPeriod,
			deadLetterQueue: {
				queue: this.deadLetterQueue,
				maxReceiveCount: 3,
			},
		});

		// Create alarm for messages visible in DLQ
		this.messagesVisibleAlarm = new cloudwatch.Alarm(
			this,
			"DlqMessagesVisibleAlarm",
			{
				metric: this.deadLetterQueue.metricApproximateNumberOfMessagesVisible(),
				evaluationPeriods: 1,
				threshold: 1,
				comparisonOperator:
					cloudwatch.ComparisonOperator.GREATER_THAN_OR_EQUAL_TO_THRESHOLD,
				alarmDescription: "Alarm when there are messages in the DLQ",
			},
		);

		// Create alarm for message age approaching retention period
		const messageAgeThreshold = retentionPeriod.toDays() - 3;
		this.messageAgeAlarm = new cloudwatch.Alarm(this, "DlqMessageAgeAlarm", {
			metric: this.deadLetterQueue.metricApproximateAgeOfOldestMessage(),
			evaluationPeriods: 1,
			threshold: messageAgeThreshold * 24 * 60 * 60, // Convert days to seconds
			comparisonOperator:
				cloudwatch.ComparisonOperator.GREATER_THAN_OR_EQUAL_TO_THRESHOLD,
			alarmDescription: "Alarm when messages are approaching retention period",
		});

		// Add SNS action to both alarms
		this.messagesVisibleAlarm.addAlarmAction(
			new cloudwatch_actions.SnsAction(alarmTopic),
		);
		this.messageAgeAlarm.addAlarmAction(
			new cloudwatch_actions.SnsAction(alarmTopic),
		);
		cdk.Tags.of(this).add("construct-name", CONSTRUCT_NAME);
	}
}
