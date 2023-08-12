import TripFiltersView from './view/trip-filters-view.js';
import TripInfoView from './view/trip-info-view.js';

import {render, RenderPosition} from './render.js';
import BoardPresenter from './presenter/board-presenter.js';

const siteHeaderElement = document.querySelector('.page-header');
const tripMainElement = siteHeaderElement.querySelector('.trip-main');
const tripFiltersElement = siteHeaderElement.querySelector('.trip-controls__filters');


const siteMainElement = document.querySelector('.page-main');
const tripEventsElement = siteMainElement.querySelector('.trip-events');

const boardPresenter = new BoardPresenter({boardContainer: tripEventsElement});


render(new TripFiltersView(), tripFiltersElement);
render(new TripInfoView(), tripMainElement, RenderPosition.AFTERBEGIN);

boardPresenter.init();
