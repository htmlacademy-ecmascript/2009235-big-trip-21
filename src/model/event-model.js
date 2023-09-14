import {createEvent} from '../mock/events.js';
import Observable from '../framework/observable.js';

const EVENTS_COUNT = 4;

export default class EventsModel extends Observable {
  #events = [];

  constructor () {
    super();
    this.#events = Array.from({length: EVENTS_COUNT}, createEvent);
  }

  get events() {
    return this.#events;
  }

  updateEvent(updateType, updatedEvent) {
    const index = this.#events.findIndex((event) => event.id === updatedEvent.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting event');
    }

    this.#events = [
      ...this.#events.slice(0, index),
      updatedEvent,
      ...this.#events.slice(index + 1),
    ];

    this._notify(updateType, updatedEvent);
  }

  addEvent(updateType, addedEvent) {
    this.#events = [
      addedEvent,
      ...this.#events,
    ];

    this._notify(updateType, addedEvent);
  }

  deleteEvent(updateType, deletedEvent) {
    const deletedEventIndex = this.#events.findIndex((event) => event.id === deletedEvent.id);

    if (deletedEventIndex === -1) {
      throw new Error('Can\'t delete unexisting event');
    }

    this.#events = this.#events.filter((_, index) => index !== deletedEventIndex);

    this._notify(updateType);
  }
}
