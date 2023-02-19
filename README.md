# angular-aws-pubsub

![Screenshot 2023-02-19 165737](https://user-images.githubusercontent.com/93249038/219945109-b7b641ac-7434-43b1-aa0d-ab98d8875190.png)

## Pub/sub pattern
PDF
RSS
When a platform grows, it can be difficult for different microservices to interact without creating interdependency. The publish/subscribe (pub/sub) pattern provides asynchronous communication among multiple AWS services, such as Amazon SQS, Lambda or Amazon Simple Storage Service (Amazon S3), without creating interdependency. In this pattern, microservices publish events as messages in a channel that subscribers can listen to. For example, a factory can use a pub/sub pattern to enable equipment to publish problems or failures to a channel, a subscriber can then display and log these equipment issues.

You should consider using this pattern if:

1 You have an event-driven architecture.

2 You can enable loosely coupled architecture.

3 You don't need to complete all operational parts of a transaction before the response back to the calling system (certain operations can be asynchronous).

You need to scale to volumes that are beyond the capability of a traditional data center. This level of scalability is primarily due to parallel operations, message caching, tree-based routing, and other features built into the pub/sub model.

There are several disadvantages to using this pattern. For example, the pub/sub pattern typically cannot guarantee delivery of messages to all subscriber types, although certain services such as Amazon Simple Notification Service (Amazon SNS) can provide exactly-once delivery to some subscriber subsets. Another disadvantage is that a publisher could assume that a subscriber is listening to a channel when, in fact, they are not.

## Use case
In this use case, an SNS topic is used to publish events to several dependent microservices in an insurance system. After a customer makes their monthly payment, the information must be updated in subsystems such as “Customer” or “Sales,” and an email must be sent to the customer with the payment confirmation. This pattern can be implemented by using either Amazon SNS or Amazon EventBridge.

EventBridge filters events between multiple subscribers. The EventBridge implementation provides the following two options:

Send three events with different event types. The distant target picks them up based on the event rule.

Send one message with three event rules listening to the same event type. Unnecessary data is filtered out before specific targets are invoked.

Amazon SNS implementation
The following illustration shows how Amazon SNS is used to implement the pub/sub pattern. After a user makes a payment, an SNS message is sent by the “Payments” Lambda function to the "Payments" SNS topic. This SNS topic has three subscribers that receive a copy of the message and process it.


  Amazon SNS implementation for pub/sub pattern
        
Amazon EventBridge implementation
In the following illustration, EventBridge is used to build a version of the pub/sub pattern in which subscribers are defined by using event rules. After a user makes a payment, the “Payments” Lambda function sends a message to EventBridge by using the default event bus based on a custom schema that has three different rules pointing to different targets. Each microservice processes the messages and performs the required actions.

        
<img width="581" alt="integrating-diagram5 (1)" src="https://user-images.githubusercontent.com/93249038/219945542-1beeeb43-bbeb-4bca-bc3a-148e81e4a0bd.png">
