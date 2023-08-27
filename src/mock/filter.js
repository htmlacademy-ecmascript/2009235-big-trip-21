import {filter} from '../utils/filter.js';

function generateFilter() {
  return Object.keys(filter).map(
    (filterType) => ({
      type: filterType,
    }),
  );
}

export {generateFilter};
