module.exports = {
    PORT: process.env.PORT || 3000,
    ALLOWED_DOMAINS: ['*'], 
    CACHE_TTL: 1000 * 60 * 5,
    TIMEOUT: 30000,
    
    DOMAIN_TEMPLATES: {
        // Anime & Movie Streaming
        'megacloud.tv': { 'origin': 'https://megacloud.tv', 'referer': 'https://megacloud.tv/' },
        'rabbitstream.net': { 'origin': 'https://rabbitstream.net', 'referer': 'https://rabbitstream.net/' },
        'vizcloud.online': { 'origin': 'https://vizcloud.online', 'referer': 'https://vizcloud.online/' },
        'vizcloud2.online': { 'origin': 'https://vizcloud2.online', 'referer': 'https://vizcloud2.online/' },
        'vidcloud.pro': { 'origin': 'https://vidcloud.pro', 'referer': 'https://vidcloud.pro/' },
        'vidsrc.me': { 'origin': 'https://vidsrc.me', 'referer': 'https://vidsrc.me/' },
        '2embed.me': { 'origin': 'https://2embed.me', 'referer': 'https://2embed.me/' },
        
        // File Hosting & CDNs
        'kwik.si': { 'origin': 'https://kwik.si', 'referer': 'https://kwik.si/' },
        'kwikie.ru': { 'origin': 'https://kwik.si', 'referer': 'https://kwik.si/' },
        'filemoon.sx': { 'origin': 'https://filemoon.sx', 'referer': 'https://filemoon.sx/' },
        'streamwish.to': { 'origin': 'https://streamwish.to', 'referer': 'https://streamwish.to/' },
        'dood.wf': { 'origin': 'https://dood.wf', 'referer': 'https://dood.wf/' },
        'dood.pm': { 'origin': 'https://dood.pm', 'referer': 'https://dood.pm/' },
        'dood.re': { 'origin': 'https://dood.re', 'referer': 'https://dood.re/' },
        'mixdrop.co': { 'origin': 'https://mixdrop.co', 'referer': 'https://mixdrop.co/' },
        'upstream.to': { 'origin': 'https://upstream.to', 'referer': 'https://upstream.to/' },
        'voe.sx': { 'origin': 'https://voe.sx', 'referer': 'https://voe.sx/' },
        'gogocdn.net': { 'origin': 'https://gogoanime.lu', 'referer': 'https://gogoanime.lu/' },
        'goload.io': { 'origin': 'https://goload.io', 'referer': 'https://goload.io/' },
        'streamtape.com': { 'origin': 'https://streamtape.com', 'referer': 'https://streamtape.com/' }
    }
};
