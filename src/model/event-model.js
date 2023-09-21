import Observable from '../framework/observable.js';
import {UpdateType} from '../const.js';
import EventAdapter from '../adapters/event-adapter.js';

export default class EventsModel extends Observable {
  #events = [];
  #eventsApiService = null;

  constructor ({eventsApiService}) {
    super();
    this.#eventsApiService = eventsApiService;
  }

  get events() {
    return this.#events;
  }

  async init() {
    try {
      const events = await this.#eventsApiService.events;
      this.#events = events.map(EventAdapter.adaptToClient);
    } catch(err) {
      this.#events = [];
      throw new Error('Can\'t download events from the server');
    }

    this._notify(UpdateType.INIT);
  }

  async updateEvent(updateType, updatedEvent) {
    const index = this.#events.findIndex((event) => event.id === updatedEvent.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting event');
    }

    try {
      const response = await this.#eventsApiService.updateEvent(updatedEvent);
      const updatedEventFromServer = EventAdapter.adaptToClient(response);
      this.#events = [
        ...this.#events.slice(0, index),
        updatedEventFromServer,
        ...this.#events.slice(index + 1),
      ];

      this._notify(updateType, updatedEventFromServer);
    } catch(err) {
      throw new Error('Can\'t update event');
    }
  }

  async addEvent(updateType, addedEvent) {
    try {
      const response = await this.#eventsApiService.addEvent(addedEvent);
      const addedEventFromServer = EventAdapter.adaptToClient(response);
      this.#events = [
        addedEventFromServer,
        ...this.#events,
      ];

      this._notify(updateType, addedEventFromServer);
    } catch(err) {
      throw new Error('Can\'t add event');
    }
  }

  async deleteEvent(updateType, deletedEvent) {
    const deletedEventIndex = this.#events.findIndex((event) => event.id === deletedEvent.id);

    if (deletedEventIndex === -1) {
      throw new Error('Can\'t delete unexisting event');
    }

    try {
      await this.#eventsApiService.deleteEvent(deletedEvent);
      this.#events = this.#events.filter((event) => event.id !== deletedEvent.id);

      this._notify(updateType);
    } catch(err) {
      throw new Error('Can\'t delete event');
    }
  }
}
