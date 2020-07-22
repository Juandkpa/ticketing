import { Subjects, OrderCancelledEvent, Publisher } from "common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
    readonly subject = Subjects.OrderCancelled
}