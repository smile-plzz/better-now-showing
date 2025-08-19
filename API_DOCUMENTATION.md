# API Documentation - NowShowing

Complete documentation for all API endpoints and serverless functions used in the NowShowing application.

## 📋 Overview

The NowShowing application uses serverless functions to handle API requests securely. All API keys are kept server-side to prevent client-side exposure.

## 🔗 Base URL

**Production:** `https://your-domain.vercel.app/api/`
**Development:** `http://localhost:3000/api/`

## 📡 API Endpoints

### 1. Movie/TV Show Data (`/api/omdb-proxy`)

**Purpose:** Proxy requests to OMDb API to protect API keys and add caching.

#### GET `/api/omdb-proxy`

**Parameters:**
- `title` (string, optional): Movie/TV show title for search
- `imdbID` (string, optional): IMDb ID for detailed information
- `s` (string, optional): Search query
- `type` (string, optional): Content type (`movie`, `series`, `episode`)
- `plot` (string, optional): Plot length (`short`, `full`)
- `seasonNumber` (number, optional): Season number for TV shows
- `page` (number, optional): Page number for search results

**Example Requests:**

```javascript
// Search by title
fetch('/api/omdb-proxy?title=Inception&type=movie')

// Get details by IMDb ID
fetch('/api/omdb-proxy?imdbID=tt1375666&plot=full')

// Search multiple results
fetch('/api/omdb-proxy?s=Avengers&type=movie&page=1')

// Get TV show season
fetch('/api/omdb-proxy?imdbID=tt0944947&seasonNumber=1')
```

**Response Format:**
```json
{
  "Response": "True",
  "Title": "Inception",
  "Year": "2010",
  "Rated": "PG-13",
  "Released": "16 Jul 2010",
  "Runtime": "148 min",
  "Genre": "Action, Adventure, Sci-Fi",
  "Director": "Christopher Nolan",
  "Writer": "Christopher Nolan",
  "Actors": "Leonardo DiCaprio, Joseph Gordon-Levitt, Elliot Page",
  "Plot": "A thief who steals corporate secrets...",
  "Poster": "https://m.media-amazon.com/images/M/...",
  "Ratings": [
    {
      "Source": "Internet Movie Database",
      "Value": "8.8/10"
    }
  ],
  "Metascore": "74",
  "imdbRating": "8.8",
  "imdbVotes": "2,123,456",
  "imdbID": "tt1375666",
  "Type": "movie",
  "DVD": "07 Dec 2010",
  "BoxOffice": "$292,576,195",
  "Production": "Warner Bros. Pictures",
  "Website": "N/A"
}
```

**Error Response:**
```json
{
  "Response": "False",
  "Error": "Movie not found!"
}
```

**Headers:**
- `Cache-Control: public, s-maxage=3600, stale-while-revalidate=7200`
- `Access-Control-Allow-Origin: *`

---

### 2. News Data (`/api/fetch-news`)

**Purpose:** Fetch entertainment news from GNews API with caching.

#### GET `/api/fetch-news`

**Parameters:**
- `page` (number, optional): Page number for pagination (default: 1)

**Example Request:**
```javascript
fetch('/api/fetch-news?page=1')
```

**Response Format:**
```json
{
  "totalResults": 1000,
  "articles": [
    {
      "source": {
        "id": "entertainment-weekly",
        "name": "Entertainment Weekly"
      },
      "author": "John Doe",
      "title": "New Movie Release Announced",
      "description": "Exciting news about upcoming releases...",
      "url": "https://example.com/article",
      "urlToImage": "https://example.com/image.jpg",
      "publishedAt": "2024-01-15T10:30:00Z",
      "content": "Full article content..."
    }
  ]
}
```

**Error Response:**
```json
{
  "error": "Failed to fetch news",
  "details": "API key missing or invalid"
}
```

**Headers:**
- `Cache-Control: public, s-maxage=1800, stale-while-revalidate=3600`
- `Access-Control-Allow-Origin: *`

---

### 3. Video Availability Check (`/api/check-video`)

**Purpose:** Check if a video source is available before loading.

#### POST `/api/check-video`

**Request Body:**
```json
{
  "url": "https://vidsrc.to/embed/movie/tt1375666"
}
```

**Example Request:**
```javascript
fetch('/api/check-video', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    url: 'https://vidsrc.to/embed/movie/tt1375666'
  })
})
```

**Response Format:**
```json
{
  "available": true,
  "url": "https://vidsrc.to/embed/movie/tt1375666",
  "responseTime": 1250
}
```

**Error Response:**
```json
{
  "available": false,
  "error": "Timeout or connection failed",
  "url": "https://vidsrc.to/embed/movie/tt1375666"
}
```

**Headers:**
- `Cache-Control: public, s-maxage=300, stale-while-revalidate=600`
- `Access-Control-Allow-Origin: *`

---

### 4. Health Check (`/api/test`)

**Purpose:** Simple health check endpoint for monitoring.

#### GET `/api/test`

**Example Request:**
```javascript
fetch('/api/test')
```

**Response Format:**
```json
{
  "message": "Server is working!",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "status": "ok",
  "environment": "production"
}
```

**Headers:**
- `Cache-Control: public, s-maxage=60, stale-while-revalidate=120`
- `Access-Control-Allow-Origin: *`

---

## 🔧 Configuration

### Environment Variables

**Required:**
```env
OMDB_API_KEY=your_omdb_api_key_here
GNEWS_API_KEY=your_gnews_api_key_here
NODE_ENV=production
```

**Optional:**
```env
CACHE_DURATION=3600
REQUEST_TIMEOUT=5000
MAX_RETRIES=3
```

### Vercel Configuration

**vercel.json:**
```json
{
  "functions": {
    "api/check-video.js": { "maxDuration": 10 },
    "api/fetch-news.js": { "maxDuration": 10 },
    "api/omdb-proxy.js": { "maxDuration": 10 },
    "api/test.js": { "maxDuration": 5 }
  }
}
```

## 🚀 Usage Examples

### Frontend Integration

**Search Movies:**
```javascript
const searchMovies = async (query, page = 1) => {
  try {
    const response = await fetch(`/api/omdb-proxy?s=${encodeURIComponent(query)}&page=${page}`);
    const data = await response.json();
    
    if (data.Response === 'True') {
      return data.Search;
    } else {
      throw new Error(data.Error);
    }
  } catch (error) {
    console.error('Search failed:', error);
    return [];
  }
};
```

**Get Movie Details:**
```javascript
const getMovieDetails = async (imdbID) => {
  try {
    const response = await fetch(`/api/omdb-proxy?imdbID=${imdbID}&plot=full`);
    const data = await response.json();
    
    if (data.Response === 'True') {
      return data;
    } else {
      throw new Error(data.Error);
    }
  } catch (error) {
    console.error('Failed to get movie details:', error);
    return null;
  }
};
```

**Check Video Availability:**
```javascript
const checkVideoAvailability = async (url) => {
  try {
    const response = await fetch('/api/check-video', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url })
    });
    
    const data = await response.json();
    return data.available;
  } catch (error) {
    console.error('Video check failed:', error);
    return false;
  }
};
```

**Fetch News:**
```javascript
const fetchNews = async (page = 1) => {
  try {
    const response = await fetch(`/api/fetch-news?page=${page}`);
    const data = await response.json();
    
    if (data.articles) {
      return data;
    } else {
      throw new Error(data.error);
    }
  } catch (error) {
    console.error('News fetch failed:', error);
    return { articles: [], totalResults: 0 };
  }
};
```

## 🔒 Security

### CORS Configuration
All endpoints include CORS headers:
```javascript
res.setHeader('Access-Control-Allow-Origin', '*');
res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
```

### Rate Limiting
- OMDb API: 1,000 requests per day (free tier)
- GNews API: 100 requests per day (free tier)
- Video checks: No specific limit

### Error Handling
All endpoints include comprehensive error handling:
- Network timeouts
- API rate limits
- Invalid responses
- Missing parameters

## 📊 Caching Strategy

### Cache Headers
- **OMDb Proxy**: 1 hour cache, 2 hours stale-while-revalidate
- **News API**: 30 minutes cache, 1 hour stale-while-revalidate
- **Video Check**: 5 minutes cache, 10 minutes stale-while-revalidate
- **Health Check**: 1 minute cache, 2 minutes stale-while-revalidate

### Cache Invalidation
- Automatic cache invalidation based on TTL
- Manual cache clearing via service worker
- Cache busting for critical updates

## 🐛 Error Codes

### Common Error Responses

**400 Bad Request:**
```json
{
  "error": "Missing required parameter",
  "parameter": "title"
}
```

**404 Not Found:**
```json
{
  "error": "Movie not found!",
  "imdbID": "tt0000000"
}
```

**429 Too Many Requests:**
```json
{
  "error": "API rate limit exceeded",
  "retryAfter": 3600
}
```

**500 Internal Server Error:**
```json
{
  "error": "Internal server error",
  "requestId": "req_123456"
}
```

## 📈 Monitoring

### Health Checks
- `/api/test` endpoint for basic health monitoring
- Response time tracking
- Error rate monitoring
- API quota usage tracking

### Logging
- Request/response logging
- Error logging with stack traces
- Performance metrics
- API usage statistics

## 🔄 Versioning

### API Versioning
Current version: `v1`
- All endpoints are version 1
- Backward compatibility maintained
- Future versions will use `/api/v2/` prefix

### Changelog
- **v1.0.0**: Initial API release
- **v1.1.0**: Added caching headers
- **v1.2.0**: Enhanced error handling
- **v1.3.0**: Added health check endpoint

---

**For support and questions:** Create an issue on GitHub or check the [Troubleshooting Guide](TROUBLESHOOTING.md).
