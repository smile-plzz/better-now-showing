import fetch from 'node-fetch';

export default async function handler(req, res) {
    // Set CORS headers for Vercel
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Handle preflight request
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method === 'POST') {
        const { url } = req.body;

        if (!url) {
            return res.status(400).json({ error: 'URL is required' });
        }

        try {
            const controller = new AbortController();
            const timeout = setTimeout(() => controller.abort(), 5000); // Reduced timeout for Vercel

            let response;
            try {
                response = await fetch(url, {
                    method: 'HEAD',
                    headers: {
                        'User-Agent': 'Mozilla/5.0 (compatible; NowShowing/1.0)'
                    },
                    signal: controller.signal
                });
            } catch (headErr) {
                // Many providers block HEAD; fall back to GET with small range to minimize bandwidth
                response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'User-Agent': 'Mozilla/5.0 (compatible; NowShowing/1.0)',
                        'Range': 'bytes=0-0'
                    },
                    signal: controller.signal
                });
            } finally {
                clearTimeout(timeout);
            }

            const available = response.ok || (response.status >= 200 && response.status < 400);

            // Set cache headers for Vercel
            res.setHeader('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=600');
            res.status(200).json({ url, available });
        } catch (error) {
            console.error(`[checkVideoAvailability] Error during fetch for ${url}: ${error.message}`);
            
            // Set cache headers even for errors (short cache for errors)
            res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=120');
            res.status(200).json({ url, available: false, error: `Network error: ${error.message}` });
        }
    } else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}