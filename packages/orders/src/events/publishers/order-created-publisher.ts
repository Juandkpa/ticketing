import { Publisher, Subjects, OrderCreatedEvent  } from "common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
    readonly subject = Subjects.OrderCreated;
}