import {DateTimeFormat, MSEC_IN_HOUR} from '../const.js';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration.js';
dayjs.extend(duration);
import he from 'he';

const humanizeEventDueDate = (dueDate, format = DateTimeFormat.DATE_TIME_IN_ATRIBUT) => dueDate ? dayjs(dueDate).format(format) : '';

const isEventFuture = (dueDateFrom) => dueDateFrom && dayjs(dueDateFrom).isAfter(dayjs(), 'D');
const isEventPresent = (dueDateFrom, dueDateTo) => {
  if (!dueDateFrom && !dueDateTo) {
    return false;
  }

  const isDateFromBeforeToday = dayjs(dueDateFrom).isSame(dayjs(), 'D') || dayjs(dueDateFrom).isBefore(dayjs(), 'D');
  const isDateToAfterToday = dayjs(dueDateTo).isSame(dayjs(), 'D') || dayjs(dueDateTo).isAfter(dayjs(), 'D');
  return isDateFromBeforeToday && isDateToAfterToday;
};
const isEventPast = (dueDateTo) => dueDateTo && dayjs(dueDateTo).isBefore(dayjs(), 'D');

const getDateDifference = (dateA, dateB) => dayjs(dateA).diff(dayjs(dateB));

const getEventDuration = (dateA, dateB) => {
  const eventDurationInMillisecond = Math.abs(getDateDifference(dateA, dateB));
  const allDaysCount = dayjs.duration(eventDurationInMillisecond).asDays();

  switch (true) {
    case(allDaysCount >= 1):
      return `${Math.trunc(allDaysCount).toString().padStart(2, '0')}D ${dayjs.duration(eventDurationInMillisecond).format(DateTimeFormat.HOUR_MIN)}`;
    case(eventDurationInMillisecond >= MSEC_IN_HOUR):
      return dayjs.duration(eventDurationInMillisecond).format(DateTimeFormat.HOUR_MIN);
    case(eventDurationInMillisecond < MSEC_IN_HOUR):
      return dayjs.duration(eventDurationInMillisecond).format(DateTimeFormat.MIN);
    default:
      return '00M';
  }
};

const getInfoDatesTemplate = (firstDate, lastDate) => {
  if (dayjs(firstDate).month() === dayjs(lastDate).month() && dayjs(firstDate).year() === dayjs(lastDate).year()) {
    return `${dayjs(firstDate).format(DateTimeFormat.DATE)} — ${dayjs(lastDate).format(DateTimeFormat.DAY)}`;
  }

  return `${dayjs(firstDate).format(DateTimeFormat.DATE)} — ${dayjs(lastDate).format(DateTimeFormat.DATE)}`;
};

const areDatesEqual = (dateA, dateB) => (dateA === null && dateB === null) || dayjs(dateA).isSame(dateB);

const heEncode = (value) => he.encode(value);

export {
  humanizeEventDueDate,
  isEventFuture,
  isEventPresent,
  isEventPast,
  getDateDifference,
  getEventDuration,
  getInfoDatesTemplate,
  areDatesEqual,
  heEncode,
};
