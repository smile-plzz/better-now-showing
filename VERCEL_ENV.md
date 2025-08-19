# Vercel Environment Variables Setup

## Required Environment Variables

Set these in your Vercel dashboard under Project Settings > Environment Variables:

### API Keys
```
OMDB_API_KEY=your_omdb_api_key_here
GNEWS_API_KEY=your_gnews_api_key_here
```

### Environment
```
NODE_ENV=production
```

## How to Set in Vercel Dashboard

1. Go to your Vercel project dashboard
2. Click on "Settings" tab
3. Go to "Environment Variables" section
4. Add each variable:
   - **Name**: `OMDB_API_KEY`
   - **Value**: Your actual OMDb API key
   - **Environment**: Production, Preview, Development
5. Repeat for `GNEWS_API_KEY`
6. Click "Save"

## Local Development

Create a `.env.local` file in your project root:
```bash
OMDB_API_KEY=your_omdb_api_key_here
GNEWS_API_KEY=your_gnews_api_key_here
NODE_ENV=development
```

## API Key Sources

- **OMDb API**: Get free key from https://www.omdbapi.com/
- **GNews API**: Get free key from https://gnews.io/

## Security Notes

- Never commit API keys to Git
- Use Vercel's built-in environment variable encryption
- Rotate keys regularly
- Monitor API usage limits
