import {createEvent} from '../mock/events.js';
import Observable from '../framework/observable.js';

const EVENTS_COUNT = 4;

export default class EventsModel extends Observable {
  #events = [];
  #apiService = null;

  constructor ({apiService}) {
    super();
    this.#events = Array.from({length: EVENTS_COUNT}, createEvent);
    this.#apiService = apiService;

    this.#apiService.events.then((events) => {
      console.log(events.map(this.#adaptToClient), this.#events);
      // Есть проблема: cтруктура объекта похожа, но некоторые ключи называются иначе,
      // а ещё на сервере используется snake_case, а у нас camelCase.
      // Можно, конечно, переписать часть нашего клиентского приложения, но зачем?
      // Есть вариант получше - паттерн "Адаптер"
    });
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
