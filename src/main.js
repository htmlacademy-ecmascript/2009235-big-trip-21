import BoardPresenter from './presenter/board-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import InfoPresenter from './presenter/info-presenter.js';

import EventsModel from './model/event-model.js';
import DestinationsModel from './model/destinations-model.js';
import OffersModel from './model/offers-model.js';
import FilterModel from './model/filters-model.js';

import EventsApiService from './events-api-service.js';

const AUTHORIZATION = 'Basic hjdfksjdbfjhs2j';
const BASE_URL = 'https://21.objects.pages.academy/big-trip';

const siteHeaderElement = document.querySelector('.page-header');
const tripMainElement = siteHeaderElement.querySelector('.trip-main');
const tripFiltersElement = siteHeaderElement.querySelector('.trip-controls__filters');
const addEventButtonElement = siteHeaderElement.querySelector('.trip-main__event-add-btn');

const siteMainElement = document.querySelector('.page-main');
const tripEventsElement = siteMainElement.querySelector('.trip-events');

addEventButtonElement.disabled = true;

const eventsModel = new EventsModel({eventsApiService: new EventsApiService(BASE_URL, AUTHORIZATION)});
const destinationsModel = new DestinationsModel({eventsApiService: new EventsApiService(BASE_URL, AUTHORIZATION)});
const offersModel = new OffersModel({eventsApiService: new EventsApiService(BASE_URL, AUTHORIZATION)});

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
  destinationsModel,
  offersModel,
});

addEventButtonElement.addEventListener('click', handleNewEventButtonClick);

function handleNewEventFormClose() {
  boardPresenter.showNoEventsMessage();
  addEventButtonElement.disabled = false;
}

function handleNewEventButtonClick() {
  boardPresenter.createEvent();
  addEventButtonElement.disabled = true;
}

filterPresenter.init();
boardPresenter.init();
infoPresenter.init();

Promise.all([offersModel.init(), destinationsModel.init()])
  .then(() => eventsModel.init())
  .then(() => {
    addEventButtonElement.disabled = false;
  })
  .catch(() => boardPresenter.renderFailedToLoad());
