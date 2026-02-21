const fetch = require('node-fetch');
const getHeaders = require('../lib/headers');
const { isValidUrl } = require('../lib/security');
const zlib = require('zlib');

module.exports = async (req, res) => {
    let targetUrl = req.query.url || req.params[0];

    // Support for Base64 URL format (Old Shrina Feature)
    if (req.path.includes('/base64/')) {
        try {
            const b64 = req.path.split('/base64/')[1];
            targetUrl = Buffer.from(b64, 'base64').toString('utf-8');
        } catch (e) { return res.status(400).send("Invalid Base64 Data"); }
    }

    if (!targetUrl || !isValidUrl(targetUrl)) return res.status(403).send("Domain Restricted");

    try {
        const response = await fetch(targetUrl, { 
            headers: getHeaders(targetUrl, req.query.referer),
            timeout: 30000 
        });

        // Full CORS Support
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Headers', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');

        let buffer = await response.buffer();

        // SHRINA FEATURE: Adaptive Decompression
        const encoding = response.headers.get('content-encoding');
        try {
            if (encoding === 'gzip' || (buffer[0] === 0x1f && buffer[1] === 0x8b)) {
                buffer = zlib.gunzipSync(buffer);
            } else if (encoding === 'deflate') {
                buffer = zlib.inflateSync(buffer);
            } else if (encoding === 'br') {
                buffer = zlib.brotliDecompressSync(buffer);
            }
        } catch (e) { console.error("Decompression failed, using raw buffer"); }

        // SHRINA FEATURE: Binary Signature Detection (MPEG-TS sync byte 0x47)
        const isTS = buffer[0] === 0x47 && (buffer.length > 188 ? buffer[188] === 0x47 : true);

        // M3U8, VTT, SRT Processing
        if (targetUrl.includes('.m3u8') || targetUrl.includes('.vtt') || targetUrl.includes('.srt')) {
            let content = buffer.toString();
            const urlObj = new URL(targetUrl);
            const baseUrl = urlObj.origin + urlObj.pathname.substring(0, urlObj.pathname.lastIndexOf('/'));

            const rewritten = content.split('\n').map(line => {
                const trimmed = line.trim();
                if (!trimmed || trimmed.startsWith('#')) return line;
                
                const absolute = trimmed.startsWith('http') ? trimmed : 
                                 trimmed.startsWith('/') ? urlObj.origin + trimmed : `${baseUrl}/${trimmed}`;
                
                return `${req.protocol}://${req.get('host')}/proxy/${absolute}`;
            }).join('\n');

            const mime = targetUrl.includes('.m3u8') ? 'application/vnd.apple.mpegurl' : 'text/vtt';
            res.setHeader('Content-Type', mime);
            return res.send(rewritten);
        }

        // Final Output with detection logic
        const contentType = isTS ? 'video/mp2t' : (response.headers.get('content-type') || 'application/octet-stream');
        res.setHeader('Content-Type', contentType);
        res.send(buffer);

    } catch (err) {
        res.status(500).send("Shrina Proxy Engine Error: " + err.message);
    }
};
