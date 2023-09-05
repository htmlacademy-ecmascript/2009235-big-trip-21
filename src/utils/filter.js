import {FilterType} from '../const';
import {isEventFuture, isEventPresent, isEventPast} from './event.js';

const filter = {
  [FilterType.EVERYTHING]: (events) => [...events],
  [FilterType.FUTURE]: (events) => events.filter((event) => isEventFuture(event.dateFrom)),
  [FilterType.PRESENT]: (events) => events.filter((event) => isEventPresent(event.dateFrom, event.dateTo)),
  [FilterType.PAST]: (events) => events.filter((event) => isEventPast(event.dateTo)),
};

function generateFilter() {
  return Object.keys(filter).map(
    (filterType, index) => ({
      type: filterType,
      isChecked: index === 0,
    }),
  );
}

export {generateFilter};
