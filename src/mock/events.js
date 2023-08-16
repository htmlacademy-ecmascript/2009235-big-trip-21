import {
  getRandomArrayElement,
  getRandomInteger,
  getRandomBoolean,
  createRandomIdFromRangeGenerator,
  createdIdGenerator
} from '../utils.js';

const eventDatesFrom = [
  '2023-07-10T20:55:56.845Z',
  '2023-07-10T21:55:56.845Z',
  '2023-07-10T22:55:56.845Z',
  '2023-07-10T23:55:56.845Z',
];

const eventDatesTo = [
  '2023-08-10T20:55:56.845Z',
  '2023-08-10T21:55:56.845Z',
  '2023-08-10T22:55:56.845Z',
  '2023-08-10T23:55:56.845Z',
];

const eventDestinations = [
  'Geneva',
  'Chamonix',
  'Amsterdam',
  'Paris',
  'Balashikha',
];

const eventTypes = [
  'taxi',
  'bus',
  'train',
  'ship',
  'check-in',
  'sightseeing',
  'restaurant',
];

const eventOffers = [
  'Add something +€ 10',
  'Add something +€ 30',
  'Add something +€ 50',
  'Add something +€ 70',
  'Add something +€ 100',
];

const generateID = createdIdGenerator();

const generateOffers = () => {
  const getRandomEventIndex = createRandomIdFromRangeGenerator(0, eventOffers.length - 1);
  const getRandomEventItem = () => eventOffers[getRandomEventIndex()];
  return Array.from({length: getRandomInteger(0, eventOffers.length - 1)}, getRandomEventItem);
};

const createEvent = () => ({
  id: generateID(),
  basePrice: getRandomInteger(1000, 10000),
  dateFrom: new Date(getRandomArrayElement(eventDatesFrom)),
  dateTo: new Date(getRandomArrayElement(eventDatesTo)),
  destination: getRandomArrayElement(eventDestinations),
  isFavorite: getRandomBoolean(),
  offers: generateOffers(),
  type: getRandomArrayElement(eventTypes),
});

//const simularEvents = (count) => Array.from({length: count}, createEvent);

export {createEvent};

