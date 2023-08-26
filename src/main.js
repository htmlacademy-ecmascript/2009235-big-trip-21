import {render, RenderPosition} from './framework/render.js';

import FiltersView from './view/filters-view.js';
import InfoView from './view/info-view.js';
import BoardPresenter from './presenter/board-presenter.js';

import EventsModel from './model/event-model.js';
import DestinationsModel from './model/destinations-model.js';
import OffersModel from './model/offers-model.js';

const siteHeaderElement = document.querySelector('.page-header');
const tripMainElement = siteHeaderElement.querySelector('.trip-main');
const tripFiltersElement = siteHeaderElement.querySelector('.trip-controls__filters');

const siteMainElement = document.querySelector('.page-main');
const tripEventsElement = siteMainElement.querySelector('.trip-events');

const eventsModel = new EventsModel();
const destinationsModel = new DestinationsModel();
const offersModel = new OffersModel();

const boardPresenter = new BoardPresenter({boardContainer: tripEventsElement, eventsModel, destinationsModel, offersModel});

render(new FiltersView(), tripFiltersElement);
render(new InfoView(), tripMainElement, RenderPosition.AFTERBEGIN);

boardPresenter.init();
