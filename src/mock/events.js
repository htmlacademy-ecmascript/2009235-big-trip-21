import {
  getRandomArrayElement,
  getRandomInteger,
  getRandomBoolean,
  createRandomIntegerFromRangeGenerator,
  createdIdGenerator
} from '../utils/common.js';
import {eventDestinations} from './destinations.js';
import {offersData} from './offers.js';

const eventDatesFrom = [
  '2023-07-10T20:55:56.845Z',
  '2023-07-10T21:55:56.845Z',
  '2024-07-10T22:55:56.845Z',
  '2024-07-10T23:55:56.845Z',
];

const eventDatesTo = [
  '2023-08-10T20:55:56.845Z',
  '2023-08-10T21:55:56.845Z',
  '2024-08-10T22:55:56.845Z',
  '2024-08-10T23:55:56.845Z',
];

const generateEventID = createdIdGenerator();

let offerType;

const addRandomnType = () => {
  offerType = getRandomArrayElement(offersData).type;
  return offerType;
};

const generateOffersID = (type) => {
  const randomOffer = offersData.find((offer) => offer.type === type);
  const typeOffers = randomOffer.offers;
  if (!typeOffers.length) {
    return [];
  }
  const getRandomEventIndex = createRandomIntegerFromRangeGenerator(0, typeOffers.length - 1);
  const getRandomEventItem = () => typeOffers[getRandomEventIndex()].id;
  return Array.from({length: getRandomInteger(0, typeOffers.length - 1)}, getRandomEventItem);
};

const createEvent = () => ({
  id: generateEventID(),
  basePrice: getRandomInteger(1000, 10000),
  dateFrom: new Date(getRandomArrayElement(eventDatesFrom)),
  dateTo: new Date(getRandomArrayElement(eventDatesTo)),
  destination: getRandomArrayElement(eventDestinations).name,
  isFavorite: getRandomBoolean(),
  type: addRandomnType(),
  offers: generateOffersID(offerType),
});

export {createEvent};
