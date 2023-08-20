const eventDestinations = [
  {
    id: '1cfe416cq-10xa-ye10-8077-2fs9a01edcab',
    description: 'Chamonix-Mont-Blanc (usually shortened to Chamonix) is a resort area near the junction of France, Switzerland and Italy. At the base of Mont Blanc, the highest summit in the Alps, its renowned for its skiing.',
    name: 'Chamonix',
    pictures: [
      {
        src: 'img/photos/1.jpg',
        description: 'text 1'
      },{
        src: 'img/photos/2.jpg',
        description: 'text 2'
      }
    ]
  }, {
    id: '2cfe416cq-10xa-ye10-8077-2fs9a01edcab',
    description: 'Geneva, is a beautiful city, a true asian pearl, with crowded streets.',
    name: 'Geneva',
    pictures: [
      {
        src: 'img/photos/3.jpg',
        description: 'text 3'
      },{
        src: 'img/photos/4.jpg',
        description: 'text 4'
      }, {
        src: 'img/photos/5.jpg',
        description: 'text 5'
      }
    ]
  }, {
    id: '3cfe416cq-10xa-ye10-8077-2fs9a01edcab',
    description: 'In rutrum ac purus sit amet tempus.',
    name: 'Paris',
    pictures: [
      {
        src: 'https://w.forfun.com/fetch/90/90ce93f8acc729abeb63e515e4869f3a.jpeg',
        description: 'Paris buildings'
      }
    ]
  }, {
    id: '4cfe416cq-10xa-ye10-8077-2fs9a01edcab',
    description: 'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis.',
    name: 'Amsterdam',
    pictures: []
  }, {
    id: '5cfe416cq-10xa-ye10-8077-2fs9a01edcab',
    description: 'Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus.',
    name: 'Balashikha',
    pictures: [
      {
        src: 'https://sun9-79.userapi.com/impg/r6yxrBao6WYh41vwep1e204EPRzjJEnup-bz6Q/5zOypAJEDK8.jpg?size=480x320&quality=95&sign=e8b4680159e9a014ecf8b7d4b3a65b9f&type=album',
        description: 'Balashikha buildings'
      }
    ]
  }
];

const getDestinationsData = () => eventDestinations;

export {getDestinationsData, eventDestinations};
