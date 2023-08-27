const DateTimeFormat = {
  DATE: 'MMM DD',
  TIME: 'HH:mm',
  DATE_IN_ATRIBUT: 'DD-MM-YYYY',
  DATE_TIME_IN_ATRIBUT: 'DD-MM-YYYYTHH:mm',
  DATE_TIME_IN_INPUT: 'DD/MM/YYYY HH:mm',
};

const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past',
};

const SortType = {
  DAY: 'sort-day',
  TIME: 'sort-time',
  PRICE: 'sort-price',
};

const MessageType = {
  NO_EVENTS: 'Click New Event to create your first point',
  LOADING: 'Loading...',
  FAILED_EVENTS_LOAD: 'Failed to load latest route information',
};

export {
  DateTimeFormat,
  FilterType,
  SortType,
  MessageType,
};
