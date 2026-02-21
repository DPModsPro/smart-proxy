const { DOMAIN_TEMPLATES } = require('./config');

module.exports = (targetUrl, customReferer) => {
    const urlObj = new URL(targetUrl);
    let headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        'Accept': '*/*',
        'Accept-Language': 'en-US,en;q=0.9',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Site': 'cross-site',
        'Connection': 'keep-alive',
        'X-Requested-With': 'XMLHttpRequest'
    };

    // Auto-match Domain Templates
    for (const [domain, template] of Object.entries(DOMAIN_TEMPLATES)) {
        if (urlObj.hostname.includes(domain)) {
            headers = { ...headers, ...template };
        }
    }

    // Manual override if referer query is provided
    if (customReferer) headers['Referer'] = customReferer;
    
    return headers;
};
