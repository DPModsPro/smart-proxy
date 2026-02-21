const { ALLOWED_DOMAINS } = require('./config');

module.exports = {
    isValidUrl: (target) => {
        if (ALLOWED_DOMAINS.includes('*')) return true;
        try {
            const url = new URL(target);
            return ALLOWED_DOMAINS.some(d => url.hostname.includes(d));
        } catch { return false; }
    }
};
