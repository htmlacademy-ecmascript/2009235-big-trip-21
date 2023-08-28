import {
  getRandomInteger,
  createRandomIntegerFromRangeGenerator,
} from '../utils/common.js';

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
  {
    id: '1b4c3e4e6-9053-42ce-b747-e281314baa31',
    title: 'Upgrade1',
    price: 20
  },{
    id: '2b4c3e4e6-9053-42ce-b747-e281314baa31',
    title: 'Upgrade2',
    price: 120
  },{
    id: '3b4c3e4e6-9053-42ce-b747-e281314baa31',
    title: 'Upgrade3',
    price: 90
  },{
    id: '4b4c3e4e6-9053-42ce-b747-e281314baa31',
    title: 'Upgrade4',
    price: 70
  },{
    id: '5b4c3e4e6-9053-42ce-b747-e281314baa31',
    title: 'Upgrade5',
    price: 30
  }
];

const generateOffers = () => {
  const getRandomEventIndex = createRandomIntegerFromRangeGenerator(0, eventOffers.length - 1);
  const getRandomEventItem = () => eventOffers[getRandomEventIndex()];
  return Array.from({length: getRandomInteger(0, eventOffers.length - 1)}, getRandomEventItem);
};

const createOffer = (index) => ({
  type: eventTypes[index],
  offers: generateOffers(),
});

const createOffers = () => Array.from({length: eventTypes.length}, (_, typeIndex) => createOffer(typeIndex));
const offersData = createOffers();
const getOffers = () => offersData;

export {getOffers, offersData};
