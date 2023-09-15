import {render, replace, remove} from '../framework/render.js';
import FiltersView from '../view/filters-view.js';
import {generateFilter} from '../utils/filter.js';
import {UpdateType} from '../const.js';

export default class EventPresenter {
  #filterContainer = null;
  #filterComponent = null;
  #eventsModel = null;
  #filterModel = null;

  constructor({filterContainer, eventsModel, filterModel}) {
    this.#filterContainer = filterContainer;
    this.#eventsModel = eventsModel;
    this.#filterModel = filterModel;

    this.#eventsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get filters() {
    return generateFilter(this.#eventsModel.events);
  }

  init() {
    const prevFilterComponent = this.#filterComponent;

    this.#filterComponent = new FiltersView({
      filters: this.filters,
      currentFilterType: this.#filterModel.filter,
      onFilterTypeChange: this.#handleFilterTypeChange,
    });

    if (prevFilterComponent === null) {
      render(this.#filterComponent, this.#filterContainer);
      return;
    }

    replace(this.#filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }

  #handleModelEvent = () => {
    this.init();
  };

  #handleFilterTypeChange = (filterType) => {
    if (this.#filterModel.filter === filterType) {
      return;
    }

    this.#filterModel.setFilter(UpdateType.MAJOR, filterType);
  };
}
