import {render} from '../framework/render.js';
import FiltersView from '../view/filters-view.js';
import {generateFilter} from '../utils/filter.js';

export default class EventPresenter {
  #filterContainer = null;
  #filters = [];

  constructor({filterContainer}) {
    this.#filterContainer = filterContainer;
    this.#filters = generateFilter();
  }

  init() {
    render(new FiltersView({
      filters: this.#filters,
      onFilterTypeChange: () => {},
    }), this.#filterContainer);
  }
}
