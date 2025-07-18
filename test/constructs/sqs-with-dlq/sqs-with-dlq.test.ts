import * as cdk from "aws-cdk-lib";
import { Tags, Template } from "aws-cdk-lib/assertions";
import {
	CONSTRUCT_NAME,
	SqsWithDlq,
} from "../../../src/constructs/sqs-with-dlq/lib";

describe("SqsWithDlq", () => {
	let stack: cdk.Stack;
	let alarmTopicArn: string;

	beforeEach(() => {
		stack = new cdk.Stack();
		alarmTopicArn = "arn:aws:sns:region:account-id:test-topic-name";
	});

	test("creates queue and DLQ with default settings", () => {
		// WHEN
		new SqsWithDlq(stack, "TestQueue", {
			alarmTopicArn,
		});

		// THEN
		const template = Template.fromStack(stack);

		template.resourceCountIs("AWS::SQS::Queue", 2);
		template.hasResourceProperties("AWS::SQS::Queue", {
			MessageRetentionPeriod: 1209600, // 14 days in seconds
		});
	});

	test("throws error when retention period is 3 days or less", () => {
		// THEN
		expect(() => {
			new SqsWithDlq(stack, "TestQueue", {
				alarmTopicArn,
				messageRetentionPeriod: cdk.Duration.days(3),
			});
		}).toThrow("messageRetentionPeriod must be at least 4 days, but got 3.");
	});

	test("creates FIFO queues when fifo is true", () => {
		// WHEN
		new SqsWithDlq(stack, "TestQueue", {
			alarmTopicArn,
			fifo: true,
		});

		// THEN
		const template = Template.fromStack(stack);

		template.hasResourceProperties("AWS::SQS::Queue", {
			FifoQueue: true,
		});
	});

	test("creates alarms with correct thresholds", () => {
		// WHEN
		new SqsWithDlq(stack, "TestQueue", {
			alarmTopicArn,
			messageRetentionPeriod: cdk.Duration.days(7),
		});

		// THEN
		const template = Template.fromStack(stack);

		// Test DLQ messages visible alarm
		template.hasResourceProperties("AWS::CloudWatch::Alarm", {
			MetricName: "ApproximateNumberOfMessagesVisible",
			Threshold: 1,
			ComparisonOperator: "GreaterThanOrEqualToThreshold",
		});

		// Test message age alarm
		template.hasResourceProperties("AWS::CloudWatch::Alarm", {
			MetricName: "ApproximateAgeOfOldestMessage",
			Threshold: 345600, // (7-3) days in seconds
			ComparisonOperator: "GreaterThanOrEqualToThreshold",
		});
	});

	test("configures DLQ redrive policy correctly", () => {
		// WHEN
		new SqsWithDlq(stack, "TestQueue", {
			alarmTopicArn,
		});

		// THEN
		const template = Template.fromStack(stack);

		const queues = Object.entries(template.findResources("AWS::SQS::Queue"));
		const dlqEntry = queues.find(([logicalId]: [string, any]) =>
			logicalId.includes("DLQ"),
		);
		const dlqLogicalId = dlqEntry ? dlqEntry[0] : undefined;

		template.hasResourceProperties("AWS::SQS::Queue", {
			RedrivePolicy: {
				deadLetterTargetArn: {
					"Fn::GetAtt": [dlqLogicalId, "Arn"],
				},
				maxReceiveCount: 3,
			},
		});
	});

	test("alarms are connected to provided SNS topic", () => {
		// WHEN
		new SqsWithDlq(stack, "TestQueue", {
			alarmTopicArn,
		});

		// THEN
		const template = Template.fromStack(stack);

		template.allResourcesProperties("AWS::CloudWatch::Alarm", {
			AlarmActions: [alarmTopicArn],
		});
	});

	test("accepts custom retention period greater than 3 days", () => {
		// WHEN
		new SqsWithDlq(stack, "TestQueue", {
			alarmTopicArn,
			messageRetentionPeriod: cdk.Duration.days(5),
		});

		// THEN
		const template = Template.fromStack(stack);

		template.hasResourceProperties("AWS::SQS::Queue", {
			MessageRetentionPeriod: 432000, // 5 days in seconds
		});
	});

	test("throws error when retention period is negative", () => {
		// THEN
		expect(() => {
			new SqsWithDlq(stack, "TestQueue", {
				alarmTopicArn,
				messageRetentionPeriod: cdk.Duration.days(-1),
			});
		}).toThrow();
	});

	test("All taggable resources have all required tags", () => {
		interface Tag {
			Key: string;
			Value: string;
		}

		// WHEN
		new SqsWithDlq(stack, "TestQueue", {
			alarmTopicArn,
		});
		const template = Template.fromStack(stack);

		const resources = template.toJSON().Resources as Record<string, unknown>;

		const requiredTags: Tag[] = [
			{ Key: "construct-name", Value: CONSTRUCT_NAME },
		];

		for (const [resource] of Object.entries(resources)) {
			// Type guard: check if resource is an object and has Properties with Tags array
			if (
				typeof resource === "object" &&
				resource !== null &&
				"Properties" in resource &&
				typeof (resource as any).Properties === "object" &&
				(resource as any).Properties !== null &&
				Array.isArray((resource as any).Properties.Tags)
			) {
				const tags = (resource as any).Properties.Tags as Tag[];
				for (const tag of requiredTags) {
					expect(tags).toEqual(expect.arrayContaining([tag]));
				}
			}
		}
	});

	test("construct does not apply tags to the whole stack", () => {
		// WHEN
		new SqsWithDlq(stack, "TestQueue", {
			alarmTopicArn,
		});

		// THEN
		Tags.fromStack(stack).hasNone();
	});
});
