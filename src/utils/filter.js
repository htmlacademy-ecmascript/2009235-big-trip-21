import {FilterType} from '../const';
import {isEventFuture, isEventPresent, isEventPast} from './event.js';

const filter = {
  [FilterType.EVERYTHING]: (events) => [...events],
  [FilterType.FUTURE]: (events) => events.filter((event) => isEventFuture(event.dateFrom)),
  [FilterType.PRESENT]: (events) => events.filter((event) => isEventPresent(event.dateFrom, event.dateTo)),
  [FilterType.PAST]: (events) => events.filter((event) => isEventPast(event.dateTo)),
};

function generateFilter(events) {
  return Object.entries(filter).map(
    ([filterType, filterEvents]) => ({
      type: filterType,
      count: filterEvents(events).length,
    }),
  );
}

const startFilter = (events, filterType) => filter[filterType](events);

export {
  generateFilter,
  startFilter,
};
