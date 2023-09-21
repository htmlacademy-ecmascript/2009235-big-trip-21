import {SortType, disabledSortType} from '../const';
import {getDateDifference} from './event.js';

const getWeightForNullDate = (valueA, valueB) => {
  if (valueA === null && valueB === null) {
    return 0;
  }

  if (valueA === null) {
    return 1;
  }

  if (valueB === null) {
    return -1;
  }

  return null;
};

const compareMoreEarlyDay = (eventA, eventB) => {
  const weight = getWeightForNullDate(eventA.dateFrom, eventB.dateFrom);
  return weight ?? getDateDifference(eventA.dateFrom, eventB.dateFrom);
};

const compareMoreDuration = (eventA, eventB) => {
  const eventDurationB = Math.abs(getDateDifference(eventB.dateFrom, eventB.dateTo));
  const eventDurationA = Math.abs(getDateDifference(eventA.dateFrom, eventA.dateTo));
  return (eventDurationB > 0 ? eventDurationB : 0) - (eventDurationA > 0 ? eventDurationA : 0);
};

const compareMoreExpensive = (eventA, eventB) => eventB.basePrice - eventA.basePrice;

const sort = {
  [SortType.DAY]: (events) => events.sort(compareMoreEarlyDay),
  [SortType.EVENT]: () => {
    throw new Error(`Sort by ${SortType.EVENT} is not implemented`);
  },
  [SortType.TIME]: (events) => events.sort(compareMoreDuration),
  [SortType.PRICE]: (events) => events.sort(compareMoreExpensive),
  [SortType.OFFERS]: () => {
    throw new Error(`Sort by ${SortType.OFFERS} is not implemented`);
  },
};

const generateSort = () => Object.values(SortType)
  .map((sortType) => ({
    type: sortType,
    isDisabled: disabledSortType[sortType],
  }));

const startSort = (events, sortType) => sort[sortType](events);

export {
  generateSort,
  startSort,
  sort,
};
