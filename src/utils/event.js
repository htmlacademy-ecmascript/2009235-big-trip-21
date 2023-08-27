import dayjs from 'dayjs';
import {DateTimeFormat} from '../const.js';


const humanizeEventDueDate = (dueDate, format = DateTimeFormat.DATE_TIME_IN_ATRIBUT) => dueDate ? dayjs(dueDate).format(format) : '';

const isEventFuture = (dueDateFrom) => dueDateFrom && dayjs(dueDateFrom).isAfter(dayjs(), 'D');
const isEventPresent = (dueDateFrom, dueDateTo) => dueDateFrom && dueDateTo && dayjs(dueDateFrom).isSame(dayjs(), 'D') && dayjs(dueDateTo).isAfter(dayjs(), 'D');
const isEventPast = (dueDateTo) => dueDateTo && dayjs(dueDateTo).isBefore(dayjs(), 'D');

export {
  humanizeEventDueDate,
  isEventFuture,
  isEventPresent,
  isEventPast,
};
