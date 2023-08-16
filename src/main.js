import FiltersView from './view/filters-view.js';
import InfoView from './view/info-view.js';

import {render, RenderPosition} from './render.js';
import BoardPresenter from './presenter/board-presenter.js';

import {createEvent} from './mock/events.js';

const siteHeaderElement = document.querySelector('.page-header');
const tripMainElement = siteHeaderElement.querySelector('.trip-main');
const tripFiltersElement = siteHeaderElement.querySelector('.trip-controls__filters');

const siteMainElement = document.querySelector('.page-main');
const tripEventsElement = siteMainElement.querySelector('.trip-events');

const boardPresenter = new BoardPresenter({boardContainer: tripEventsElement});

render(new FiltersView(), tripFiltersElement);
render(new InfoView(), tripMainElement, RenderPosition.AFTERBEGIN);

boardPresenter.init();

console.log(createEvent());
