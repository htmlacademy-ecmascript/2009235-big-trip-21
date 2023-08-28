import {createEvent} from '../mock/events.js';

const EVENTS_COUNT = 4;

export default class EventsModel {
  #events = [];

  constructor () {
    this.#events = Array.from({length: EVENTS_COUNT}, createEvent);
  }

  get events() {
    return this.#events;
  }
}
