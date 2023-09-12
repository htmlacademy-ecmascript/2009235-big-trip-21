const DateTimeFormat = {
  DATE: 'MMM DD',
  DAY: 'DD',
  TIME: 'HH:mm',
  DATE_IN_ATRIBUT: 'DD-MM-YYYY',
  DATE_TIME_IN_ATRIBUT: 'DD-MM-YYYYTHH:mm',
  DATE_TIME_IN_INPUT: 'DD/MM/YYYY HH:mm',
  DAY_HOUR_MIN: 'DD[D] HH[H] mm[M]',
  HOUR_MIN: 'HH[H] mm[M]',
  MIN: 'mm[M]',
};

const MeasureTime = {
  MSEC_IN_SEC: 1000,
  SEC_IN_MIN: 60,
  MIN_IN_HOUR: 60,
  HOUR_IN_DAY: 24,
};

const MSEC_IN_HOUR = MeasureTime.MIN_IN_HOUR * MeasureTime.SEC_IN_MIN * MeasureTime.MSEC_IN_SEC;

const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past',
};

const SortType = {
  DAY: 'sort-day',
  EVENT: 'sort-event',
  TIME: 'sort-time',
  PRICE: 'sort-price',
  OFFERS: 'sort-offer',
};

const disabledSortType = {
  [SortType.DAY]: false,
  [SortType.EVENT]: true,
  [SortType.TIME]: false,
  [SortType.PRICE]: false,
  [SortType.OFFERS]: true,
};

const MessageType = {
  LOADING: 'Loading...',
  FAILED_EVENTS_LOAD: 'Failed to load latest route information',
  [FilterType.EVERYTHING]: 'Click New Event to create your first point',
  [FilterType.FUTURE]: 'There are no future events now',
  [FilterType.PRESENT]: 'There are no present events now',
  [FilterType.PAST]: 'There are no past events now',
};

const UserAction = {
  UPDATE_EVENT: 'UPDATE_EVENT',
  ADD_EVENT: 'ADD_EVENT',
  DELETE_EVENT: 'DELETE_EVENT',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
};

export {
  DateTimeFormat,
  FilterType,
  SortType,
  disabledSortType,
  MessageType,
  MSEC_IN_HOUR,
  UserAction,
  UpdateType,
};
