import { TicketUpdatedListener } from "../ticket-updated-listener";
import { natsWrapper } from "../../../nats-wrapper";
import  mongoose, { mongo }  from "mongoose";
import { TicketUpdatedEvent, Listener } from "common";
import { Ticket } from "../../../models/ticket";

const setup = async () => {
    const listener = new TicketUpdatedListener(natsWrapper.client);
    const ticket = Ticket.build({
        id: mongoose.Types.ObjectId().toHexString(),
        title: 'concert',
        price: 20
    })
    await ticket.save();

    const data: TicketUpdatedEvent['data'] = {
        version: ticket.version +1,
        id: ticket.id,
        title: 'concert new',
        price: 101,
        userId: 'fjdkfjsd'
    };

    // @ts-ignore
    const msg: Message = {
        ack: jest.fn()
    };

    return { listener,data, ticket, msg };
};


it('finds, updates, and saves a ticket', async () => {
    const { msg, data, ticket, listener } = await setup();

    await listener.onMessage(data, msg);

    const updatedTicket = await Ticket.findById(ticket.id);

    expect(updatedTicket!.title).toEqual(data.title);
    expect(updatedTicket!.price).toEqual(data.price);
    expect(updatedTicket!.version).toEqual(data.version);

});

it('acks the message', async () => {
    const { msg, data, listener } = await setup();

    await listener.onMessage(data, msg);

    expect(msg.ack).toHaveBeenCalled();
});

it('does not call ack if the event has a skipped version number', async () => {
    const { msg, data, listener } = await setup();

    data.version = 10;

    try {
        await listener.onMessage(data, msg);
    }catch(err) {

    }

    expect(msg.ack).not.toHaveBeenCalled();
});
