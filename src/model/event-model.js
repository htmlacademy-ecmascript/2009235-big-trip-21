import {createEvent} from '../mock/events.js';

const EVENTS_COUNT = 4;

export default class EventsModel {
  events = Array.from({length: EVENTS_COUNT}, createEvent);

  getEvents() {
    return this.events;
  }
}
