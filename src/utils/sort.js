import {SortType} from '../const';
import {getEventDuration} from './event.js';

const compareMoreEarlyDay = (eventA, eventB) => new Date(eventA.dateFrom).setHours(0, 0, 0, 0) - new Date(eventB.dateFrom).setHours(0, 0, 0, 0);
const compareMoreDuration = (eventA, eventB) => getEventDuration(eventB.dateFrom, eventB.dateTo) - getEventDuration(eventA.dateFrom, eventA.dateTo);
const compareMoreExpensive = (eventA, eventB) => eventB.basePrice - eventA.basePrice;

const sort = {
  [SortType.DAY]: (events) => events.slice().sort(compareMoreEarlyDay),
  [SortType.TIME]: (events) => events.slice().sort(compareMoreDuration),
  [SortType.PRICE]: (events) => events.slice().sort(compareMoreExpensive),
};

export {sort};
