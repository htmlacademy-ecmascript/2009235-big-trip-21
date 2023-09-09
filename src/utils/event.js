import {DateTimeFormat, MSEC_IN_HOUR} from '../const.js';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration.js';
dayjs.extend(duration);


const humanizeEventDueDate = (dueDate, format = DateTimeFormat.DATE_TIME_IN_ATRIBUT) => dueDate ? dayjs(dueDate).format(format) : '';

const isEventFuture = (dueDateFrom) => dueDateFrom && dayjs(dueDateFrom).isAfter(dayjs(), 'D');
const isEventPresent = (dueDateFrom, dueDateTo) => dueDateFrom && dueDateTo && dayjs(dueDateFrom).isSame(dayjs(), 'D') && dayjs(dueDateTo).isAfter(dayjs(), 'D');
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
      return 0;
  }
};

export {
  humanizeEventDueDate,
  isEventFuture,
  isEventPresent,
  isEventPast,
  getDateDifference,
  getEventDuration,
};
