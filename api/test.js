export default function handler(req, res) {
    // Set CORS headers for Vercel
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Handle preflight request
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    // Set cache headers for Vercel - test endpoint can be cached briefly
    res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=120');
    
    res.status(200).json({ 
        message: 'Server is working!', 
        timestamp: new Date().toISOString(),
        status: 'ok',
        environment: process.env.NODE_ENV || 'development'
    });
}
