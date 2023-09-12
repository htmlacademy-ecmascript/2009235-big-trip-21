import BoardPresenter from './presenter/board-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import InfoPresenter from './presenter/info-presenter.js';

import EventsModel from './model/event-model.js';
import DestinationsModel from './model/destinations-model.js';
import OffersModel from './model/offers-model.js';
import FilterModel from './model/filters-model.js';

const siteHeaderElement = document.querySelector('.page-header');
const tripMainElement = siteHeaderElement.querySelector('.trip-main');
const tripFiltersElement = siteHeaderElement.querySelector('.trip-controls__filters');
const addEventButtonElement = siteHeaderElement.querySelector('.trip-main__event-add-btn');

const siteMainElement = document.querySelector('.page-main');
const tripEventsElement = siteMainElement.querySelector('.trip-events');

const eventsModel = new EventsModel();
const destinationsModel = new DestinationsModel();
const offersModel = new OffersModel();
const filterModel = new FilterModel();

const boardPresenter = new BoardPresenter({
  boardContainer: tripEventsElement,
  eventsModel,
  destinationsModel,
  offersModel,
  filterModel,
  onNewEventDestroy: handleNewEventFormClose,
});

const filterPresenter = new FilterPresenter({
  filterContainer: tripFiltersElement,
  eventsModel,
  filterModel,
});

const infoPresenter = new InfoPresenter({
  infoContainer: tripMainElement,
  eventsModel,
  offersModel,
  onBoardEventsChange: getBoardEvents,
});

addEventButtonElement.addEventListener('click', handleNewEventButtonClick);

function handleNewEventFormClose() {
  addEventButtonElement.disabled = false;
}

function handleNewEventButtonClick() {
  boardPresenter.createEvent();
  addEventButtonElement.disabled = true;
}

function getBoardEvents () {
  return boardPresenter.events;
}

filterPresenter.init();
boardPresenter.init();
infoPresenter.init();
