import {SortType} from '../const';
import {getDateDifference} from './event.js';

const compareMoreEarlyDay = (eventA, eventB) => getDateDifference(eventA.dateFrom, eventB.dateFrom);
const compareMoreDuration = (eventA, eventB) => Math.abs(getDateDifference(eventB.dateFrom, eventB.dateTo)) - Math.abs(getDateDifference(eventA.dateFrom, eventA.dateTo));
const compareMoreExpensive = (eventA, eventB) => eventB.basePrice - eventA.basePrice;

const sort = {
  [SortType.DAY]: (events) => events.toSorted(compareMoreEarlyDay),
  [SortType.TIME]: (events) => events.toSorted(compareMoreDuration),
  [SortType.PRICE]: (events) => events.toSorted(compareMoreExpensive),
};

const startSort = (events, sortType) => sort[sortType](events);

export {sort, startSort};
