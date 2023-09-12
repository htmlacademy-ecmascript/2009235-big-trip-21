import {render, replace, remove, RenderPosition} from '../framework/render.js';
import InfoView from '../view/info-view.js';

export default class EventPresenter {
  #infoContainer = null;
  #infoComponent = null;
  #eventsModel = null;
  #offersModel = null;
  #onBoardEventsChange = () => {};

  constructor({infoContainer, eventsModel, offersModel, onBoardEventsChange}) {
    this.#infoContainer = infoContainer;
    this.#eventsModel = eventsModel;
    this.#offersModel = offersModel;
    this.#onBoardEventsChange = onBoardEventsChange;

    this.#eventsModel.addObserver(this.#handleModelEvent);
  }

  get events() {
    //return this.#eventsModel.events; //может убрать eventsModel?
    return this.#onBoardEventsChange(); //можно ли импортировать import BoardPresenter from './presenter/board-presenter.js'?
  }

  init() {
    const prevInfoComponent = this.#infoComponent;

    this.#infoComponent = new InfoView({
      events: this.events,
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
    this.init();
  };
}
