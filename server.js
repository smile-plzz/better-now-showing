import express from 'express';
import bodyParser from 'body-parser';
import fetch from 'node-fetch';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(bodyParser.json());
app.use(express.static('.'));

// Test endpoint
app.get('/api/test', (req, res) => {
    res.json({ 
        message: 'Server is working!', 
        timestamp: new Date().toISOString(),
        status: 'ok'
    });
});

// Check video endpoint
app.post('/api/check-video', async (req, res) => {
    const { url } = req.body;

    if (!url) {
        return res.status(400).json({ error: 'URL is required' });
    }

    try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 6000);

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
        res.json({ url, available });
    } catch (error) {
        console.error(`Error checking video: ${error.message}`);
        res.json({ url, available: false, error: `Network error: ${error.message}` });
    }
});

// Fetch news endpoint (mock data for testing)
app.get('/api/fetch-news', (req, res) => {
    const mockNews = {
        articles: [
            {
                title: "Test Movie News",
                description: "This is a test news article for the NowShowing app.",
                url: "https://example.com",
                urlToImage: "https://via.placeholder.com/300x200",
                source: { name: "Test Source" },
                publishedAt: new Date().toISOString()
            }
        ],
        totalResults: 1
    };
    
    res.json(mockNews);
});

// OMDb proxy endpoint (mock data for testing)
app.get('/api/omdb-proxy', (req, res) => {
    const mockMovie = {
        Title: "Test Movie",
        Year: "2024",
        Plot: "This is a test movie for the NowShowing app.",
        Poster: "https://via.placeholder.com/300x450",
        imdbID: "tt1234567"
    };
    
    res.json(mockMovie);
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log('Test endpoints:');
    console.log(`  GET  /api/test`);
    console.log(`  POST /api/check-video`);
    console.log(`  GET  /api/fetch-news`);
    console.log(`  GET  /api/omdb-proxy`);
});
