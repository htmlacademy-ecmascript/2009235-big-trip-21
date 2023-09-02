import {SortType} from '../const';
import {getDateDifference} from './event.js';

const compareMoreEarlyDay = (eventA, eventB) => getDateDifference(eventA.dateFrom, eventB.dateFrom);
const compareMoreDuration = (eventA, eventB) => Math.abs(getDateDifference(eventB.dateFrom, eventB.dateTo)) - Math.abs(getDateDifference(eventA.dateFrom, eventA.dateTo));
const compareMoreExpensive = (eventA, eventB) => eventB.basePrice - eventA.basePrice;

const sort = {
  [SortType.DAY]: (events) => events.slice().sort(compareMoreEarlyDay),
  [SortType.TIME]: (events) => events.slice().sort(compareMoreDuration),
  [SortType.PRICE]: (events) => events.slice().sort(compareMoreExpensive),
};

const startSort = (events, sortType) => sort[sortType](events);

export {sort, startSort};
