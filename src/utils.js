import dayjs from 'dayjs';

const DateTimeFormat = {
  DATE: 'MMM DD',
  TIME: 'HH:mm',
  DATE_IN_ATRIBUT: 'DD-MM-YYYY',
  DATE_TIME_IN_ATRIBUT: 'DD-MM-YYYYTHH:mm',
  DATE_TIME_IN_INPUT: 'DD/MM/YYYY HH:mm',
};

const getRandomArrayElement = (items) => items[Math.floor(Math.random() * items.length)];

const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};

const getRandomBoolean = () => getRandomInteger(0, 1) === 1;

const createRandomIntegerFromRangeGenerator = (min, max) => {
  const previousValues = [];

  return () => {
    let currentValue = getRandomInteger(min, max);
    if (previousValues.length >= (max - min + 1)) {
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
};

const createdIdGenerator = () => {
  let i = 0;

  return () => {
    i += 1;
    return i;
  };
};

const humanizeEventDueDate = (dueDate, format = DateTimeFormat.DATE_TIME_IN_ATRIBUT) => dueDate ? dayjs(dueDate).format(format) : '';

const isEscapeKey = (evt) => evt.key === 'Escape';

export {
  getRandomArrayElement,
  getRandomInteger,
  getRandomBoolean,
  createRandomIntegerFromRangeGenerator,
  createdIdGenerator,
  humanizeEventDueDate,
  DateTimeFormat,
  isEscapeKey,
};
