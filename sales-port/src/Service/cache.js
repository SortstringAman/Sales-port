// utils/cache.js
const cache = {};

const Cache = {
  set: (key, value) => {
    cache[key] = value;
  },
  get: (key) => {
    return cache[key];
  },
  has: (key) => {
    return key in cache;
  },
  remove: (key) => {
    delete cache[key];
  },
  clear: () => {
    for (let key in cache) {
      delete cache[key];
    }
  }
};

export default Cache;
