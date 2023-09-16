import Observable from '../framework/observable.js';
import {UpdateType} from '../const.js';

export default class EventsModel extends Observable {
  #events = [];
  #apiService = null;

  constructor ({apiService}) {
    super();
    this.#apiService = apiService;
  }

  get events() {
    return this.#events;
  }

  async init() {
    try {
      const events = await this.#apiService.events;
      this.#events = events.map(this.#adaptToClient);
    } catch(err) {
      this.#events = [];
    }

    this._notify(UpdateType.INIT);
  }

  async updateEvent(updateType, updatedEvent) {
    const index = this.#events.findIndex((event) => event.id === updatedEvent.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting event');
    }

    try {
      const response = await this.#apiService.updateEvent(updatedEvent);
      const updatedEventOnServer = this.#adaptToClient(response);
      this.#events = [
        ...this.#events.slice(0, index),
        updatedEventOnServer,
        ...this.#events.slice(index + 1),
      ];

      this._notify(updateType, updatedEventOnServer);
    } catch(err) {
      throw new Error('Can\'t update event');
    }
  }

  async addEvent(updateType, addedEvent) {
    try {
      const response = await this.#apiService.addEvent(addedEvent);
      const addedEventOnServer = this.#adaptToClient(response);
      this.#events = [
        addedEventOnServer,
        ...this.#events,
      ];

      this._notify(updateType, addedEventOnServer);
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
      await this.#apiService.deleteEvent(deletedEvent);
      this.#events = this.#events.filter((_, index) => index !== deletedEventIndex);

      this._notify(updateType);
    } catch(err) {
      throw new Error('Can\'t delete event');
    }
  }

  #adaptToClient(event) {
    const adaptedEvent = {...event,
      basePrice: event['base_price'],
      dateFrom: event['date_from'] !== null ? new Date(event['date_from']) : event['date_from'],
      dateTo: event['date_to'] !== null ? new Date(event['date_to']) : event['date_to'],
      isFavorite: event['is_favorite'],
    };

    delete adaptedEvent['base_price'];
    delete adaptedEvent['date_from'];
    delete adaptedEvent['date_to'];
    delete adaptedEvent['is_favorite'];

    return adaptedEvent;
  }
}
