const LRU = require('lru-cache');
const { CACHE_TTL } = require('./config');

const playlistCache = new LRU({
    max: 100,
    ttl: CACHE_TTL
});

module.exports = playlistCache;
