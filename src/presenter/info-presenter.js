import {render, replace, remove, RenderPosition} from '../framework/render.js';
import InfoView from '../view/info-view.js';
import {startSort} from '../utils/sort.js';
import {SortType} from '../const.js';
export default class EventPresenter {
  #infoContainer = null;
  #infoComponent = null;
  #eventsModel = null;
  #destinationsModel = null;
  #offersModel = null;

  constructor({infoContainer, eventsModel, destinationsModel, offersModel}) {
    this.#infoContainer = infoContainer;
    this.#eventsModel = eventsModel;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;

    this.#eventsModel.addObserver(this.#handleModelEvent);
  }

  get events() {
    return startSort(this.#eventsModel.events, SortType.DAY);
  }

  init() {
    const prevInfoComponent = this.#infoComponent;

    this.#infoComponent = new InfoView({
      events: this.events,
      destinations: this.#destinationsModel.destinations,
      offers: this.#offersModel.offers,
    });

    if (prevInfoComponent === null) {
      render(this.#infoComponent, this.#infoContainer, RenderPosition.AFTERBEGIN);
      return;
    }

    replace(this.#infoComponent, prevInfoComponent);
    remove(prevInfoComponent);
  }

  #handleModelEvent = () => {
    if (this.events.length > 0) {
      this.init();
    } else {
      remove(this.#infoComponent);
      this.#infoComponent = null;
    }
  };
}
