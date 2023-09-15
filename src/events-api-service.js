import ApiService from './framework/api-service.js';

const Method = {
  GET: 'GET',
  PUT: 'PUT',
};

const Path = {
  EVENTS: 'points',
  DESTINATIONS: 'destinations',
  OFFERS: 'offers',
};

export default class EventsApiService extends ApiService {
  get events() {
    return this._load({url: Path.EVENTS})
      .then(ApiService.parseResponse);
  }

  async updateEvent(event) {
    const response = await this._load({
      url: `${Path.EVENTS}/${event.id}`,
      method: Method.PUT,
      body: JSON.stringify(event),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  }
}
