import { Message } from 'node-nats-streaming';
import { Listener, OrderCreatedEvent, Subjects, OrderCancelledEvent } from 'common';
import { queueGroupName } from './queue-group-name';

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
    readonly subject = Subjects.OrderCreated;
    queueGroupName = queueGroupName;

    async onMessage(data: OrderCancelledEvent['data'], msg: Message) {

    }
}