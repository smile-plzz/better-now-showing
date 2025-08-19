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

    const apiKey = process.env.GNEWS_API_KEY;
    const { page } = req.query; // GNews API free tier doesn't support pagination, so this is unused but kept for consistency.

    if (!apiKey) {
        console.error('GNews API key is not configured.');
        // Set cache headers for missing API key (longer cache since this won't change quickly)
        res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=7200');
        return res.status(500).json({ error: 'The server has not been configured to fetch news.' });
    }

    // Note: GNews free tier has a limit of 10 articles per request and no pagination.
    const url = `https://gnews.io/api/v4/search?q=movie%20OR%20television&lang=en&max=10&token=${apiKey}`;

    try {
        const response = await fetch(url, {
            headers: {
                'User-Agent': 'NowShowing/1.0'
            }
        });
        
        if (!response.ok) {
            const errorData = await response.json();
            console.error('Error from GNews API:', errorData);
            
            // Set cache headers for API errors (shorter cache for errors)
            res.setHeader('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=600');
            return res.status(response.status).json({ error: `Failed to fetch data from GNews API: ${errorData.errors.join(', ')}` });
        }
        
        const data = await response.json();

        // Adapt the GNews response to the format the frontend expects (originally from NewsAPI)
        const adaptedArticles = data.articles.map(article => ({
            ...article,
            urlToImage: article.image, // Map 'image' to 'urlToImage'
            source: article.source, // Source format is compatible
        }));

        // Set cache headers for Vercel - news can be cached longer
        res.setHeader('Cache-Control', 'public, s-maxage=1800, stale-while-revalidate=3600');
        res.status(200).json({
            articles: adaptedArticles,
            totalResults: data.totalArticles, // Pass the total results count
        });

    } catch (error) {
        console.error('Internal server error:', error);
        
        // Set cache headers for internal errors (shorter cache for errors)
        res.setHeader('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=600');
        res.status(500).json({ error: 'An internal server error occurred while fetching news.' });
    }
}