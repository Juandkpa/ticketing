import { ExpirationCompleteEvent, Subjects, Publisher } from "common";

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
    readonly subject = Subjects.ExpirationComplete;
}