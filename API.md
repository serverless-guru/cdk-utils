# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="Constructs"></a>

### SqsWithDlq <a name="SqsWithDlq" id="@serverless-guru/cdk-utils.SqsWithDlq"></a>

#### Initializers <a name="Initializers" id="@serverless-guru/cdk-utils.SqsWithDlq.Initializer"></a>

```typescript
import { SqsWithDlq } from '@serverless-guru/cdk-utils'

new SqsWithDlq(scope: Construct, id: string, props: SqsWithDlqProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@serverless-guru/cdk-utils.SqsWithDlq.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#@serverless-guru/cdk-utils.SqsWithDlq.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@serverless-guru/cdk-utils.SqsWithDlq.Initializer.parameter.props">props</a></code> | <code><a href="#@serverless-guru/cdk-utils.SqsWithDlqProps">SqsWithDlqProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@serverless-guru/cdk-utils.SqsWithDlq.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="@serverless-guru/cdk-utils.SqsWithDlq.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="@serverless-guru/cdk-utils.SqsWithDlq.Initializer.parameter.props"></a>

- *Type:* <a href="#@serverless-guru/cdk-utils.SqsWithDlqProps">SqsWithDlqProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@serverless-guru/cdk-utils.SqsWithDlq.toString">toString</a></code> | Returns a string representation of this construct. |

---

##### `toString` <a name="toString" id="@serverless-guru/cdk-utils.SqsWithDlq.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@serverless-guru/cdk-utils.SqsWithDlq.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="@serverless-guru/cdk-utils.SqsWithDlq.isConstruct"></a>

```typescript
import { SqsWithDlq } from '@serverless-guru/cdk-utils'

SqsWithDlq.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="@serverless-guru/cdk-utils.SqsWithDlq.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@serverless-guru/cdk-utils.SqsWithDlq.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@serverless-guru/cdk-utils.SqsWithDlq.property.deadLetterQueue">deadLetterQueue</a></code> | <code>aws-cdk-lib.aws_sqs.Queue</code> | The dead letter queue. |
| <code><a href="#@serverless-guru/cdk-utils.SqsWithDlq.property.messageAgeAlarm">messageAgeAlarm</a></code> | <code>aws-cdk-lib.aws_cloudwatch.Alarm</code> | Alarm indicating there are messages that will expire within 3 days in the DLQ. |
| <code><a href="#@serverless-guru/cdk-utils.SqsWithDlq.property.messagesVisibleAlarm">messagesVisibleAlarm</a></code> | <code>aws-cdk-lib.aws_cloudwatch.Alarm</code> | Alarm indicating there are messages in the DLQ. |
| <code><a href="#@serverless-guru/cdk-utils.SqsWithDlq.property.queue">queue</a></code> | <code>aws-cdk-lib.aws_sqs.Queue</code> | The main queue. |

---

##### `node`<sup>Required</sup> <a name="node" id="@serverless-guru/cdk-utils.SqsWithDlq.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `deadLetterQueue`<sup>Required</sup> <a name="deadLetterQueue" id="@serverless-guru/cdk-utils.SqsWithDlq.property.deadLetterQueue"></a>

```typescript
public readonly deadLetterQueue: Queue;
```

- *Type:* aws-cdk-lib.aws_sqs.Queue

The dead letter queue.

---

##### `messageAgeAlarm`<sup>Required</sup> <a name="messageAgeAlarm" id="@serverless-guru/cdk-utils.SqsWithDlq.property.messageAgeAlarm"></a>

```typescript
public readonly messageAgeAlarm: Alarm;
```

- *Type:* aws-cdk-lib.aws_cloudwatch.Alarm

Alarm indicating there are messages that will expire within 3 days in the DLQ.

---

##### `messagesVisibleAlarm`<sup>Required</sup> <a name="messagesVisibleAlarm" id="@serverless-guru/cdk-utils.SqsWithDlq.property.messagesVisibleAlarm"></a>

```typescript
public readonly messagesVisibleAlarm: Alarm;
```

- *Type:* aws-cdk-lib.aws_cloudwatch.Alarm

Alarm indicating there are messages in the DLQ.

---

##### `queue`<sup>Required</sup> <a name="queue" id="@serverless-guru/cdk-utils.SqsWithDlq.property.queue"></a>

```typescript
public readonly queue: Queue;
```

- *Type:* aws-cdk-lib.aws_sqs.Queue

The main queue.

---


## Structs <a name="Structs" id="Structs"></a>

### SqsWithDlqProps <a name="SqsWithDlqProps" id="@serverless-guru/cdk-utils.SqsWithDlqProps"></a>

#### Initializer <a name="Initializer" id="@serverless-guru/cdk-utils.SqsWithDlqProps.Initializer"></a>

```typescript
import { SqsWithDlqProps } from '@serverless-guru/cdk-utils'

const sqsWithDlqProps: SqsWithDlqProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@serverless-guru/cdk-utils.SqsWithDlqProps.property.alarmTopicArn">alarmTopicArn</a></code> | <code>string</code> | The SNS topic to send alarm notifications to. |
| <code><a href="#@serverless-guru/cdk-utils.SqsWithDlqProps.property.fifo">fifo</a></code> | <code>boolean</code> | Whether the queues should be FIFO queues. |
| <code><a href="#@serverless-guru/cdk-utils.SqsWithDlqProps.property.messageRetentionPeriod">messageRetentionPeriod</a></code> | <code>aws-cdk-lib.Duration</code> | The number of days messages will be retained in the queues. |

---

##### `alarmTopicArn`<sup>Required</sup> <a name="alarmTopicArn" id="@serverless-guru/cdk-utils.SqsWithDlqProps.property.alarmTopicArn"></a>

```typescript
public readonly alarmTopicArn: string;
```

- *Type:* string

The SNS topic to send alarm notifications to.

---

##### `fifo`<sup>Optional</sup> <a name="fifo" id="@serverless-guru/cdk-utils.SqsWithDlqProps.property.fifo"></a>

```typescript
public readonly fifo: boolean;
```

- *Type:* boolean
- *Default:* false

Whether the queues should be FIFO queues.

---

##### `messageRetentionPeriod`<sup>Optional</sup> <a name="messageRetentionPeriod" id="@serverless-guru/cdk-utils.SqsWithDlqProps.property.messageRetentionPeriod"></a>

```typescript
public readonly messageRetentionPeriod: Duration;
```

- *Type:* aws-cdk-lib.Duration
- *Default:* Duration.days(14)

The number of days messages will be retained in the queues.

---



