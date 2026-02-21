const fetch = require('node-fetch');

let proxyList = [];

async function refreshProxies() {
    try {
        // Fetching free proxies from a public API
        const response = await fetch('https://api.proxyscrape.com/v2/?request=displayproxies&protocol=http&timeout=10000&country=all&ssl=all&anonymity=all');
        const text = await response.text();
        proxyList = text.split('\r\n').filter(p => p.length > 0);
        console.log(`Updated Proxy Pool: ${proxyList.length} proxies loaded.`);
    } catch (e) {
        console.error("Failed to fetch proxies, using direct connection.");
    }
}

// Refresh every 15 minutes
setInterval(refreshProxies, 15 * 60 * 1000);
refreshProxies();

function getRandomProxy() {
    if (proxyList.length === 0) return null;
    const proxy = proxyList[Math.floor(Math.random() * proxyList.length)];
    return `http://${proxy}`;
}

module.exports = { getRandomProxy };
