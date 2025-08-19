import fetch from 'node-fetch';

export default async function handler(req, res) {
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

    const { imdbID, title, type, s, page, seasonNumber, plot, y } = req.query;
    const OMDB_API_KEY = process.env.OMDB_API_KEY;

    if (!OMDB_API_KEY) {
        // Set cache headers for missing API key (longer cache since this won't change quickly)
        res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=7200');
        return res.status(500).json({ error: 'OMDB_API_KEY is not set in environment variables.' });
    }

    let url = `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}`;

    if (imdbID) {
        url += `&i=${imdbID}`;
    } else if (title) {
        url += `&t=${title}`;
    } else if (s) {
        url += `&s=${s}`;
    }

    if (type) {
        url += `&type=${type}`;
    }
    if (page) {
        url += `&page=${page}`;
    }
    if (seasonNumber) {
        url += `&Season=${seasonNumber}`;
    }
    if (plot) {
        url += `&plot=${plot}`;
    }
    if (y) {
        url += `&y=${y}`;
    }

    try {
        const response = await fetch(url, {
            headers: {
                'User-Agent': 'NowShowing/1.0'
            }
        });
        
        if (!response.ok) {
            // Set cache headers for API errors (shorter cache for errors)
            res.setHeader('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=600');
            return res.status(response.status).json({ error: 'Failed to fetch data from OMDb API.' });
        }
        
        const data = await response.json();
        
        // Set cache headers for Vercel - movie data can be cached longer
        res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=7200');
        res.status(response.status).json(data);
    } catch (error) {
        console.error('Error proxying OMDb API request:', error);
        
        // Set cache headers for internal errors (shorter cache for errors)
        res.setHeader('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=600');
        res.status(500).json({ error: 'Failed to fetch data from OMDb API.' });
    }
}
