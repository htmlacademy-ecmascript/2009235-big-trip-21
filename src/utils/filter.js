import {FilterType} from '../const';
import {isEventFuture, isEventPresent, isEventPast} from './event.js';

const filter = {
  [FilterType.EVERYTHING]: (events) => events.filter((event) => !event.isArchive),
  [FilterType.FUTURE]: (events) => events.filter((event) => isEventFuture(event.dateFrom) && !event.isArchive),
  [FilterType.PRESENT]: (events) => events.filter((event) => isEventPresent(event.dateFrom, event.dateTo) && !event.isArchive),
  [FilterType.PAST]: (events) => events.filter((event) => isEventPast(event.dateTo) && !event.isArchive),
};

export {filter};
