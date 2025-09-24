# NowShowing - A Minimalistic Movie Browser

A sleek and fast web application for browsing movies, built with Vue.js and Quasar.

## Features

- **Fast Search**: Find movies quickly with a responsive search-as-you-type interface.
- **Popular Movies**: See a list of popular movies on the homepage.
- **Minimalistic UI**: A clean and simple interface, designed to be mobile-friendly.

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Local Development

1.  **Clone the repository**
    ```bash
    git clone <repository-url>
    cd better-now-showing
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Set up environment variables**
    Create a `.env` file in the root directory and add your OMDb API key:
    ```env
    OMDB_API_KEY=your_omdb_api_key_here
    ```
    You can get a free API key from [OMDb API](http://www.omdbapi.com/apikey.aspx).

4.  **Start the development server**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:3000` (or another port if 3000 is in use).

## Deployment

This application is designed to be easily deployed on Vercel.

1.  **Install Vercel CLI**
    ```bash
    npm i -g vercel
    ```

2.  **Deploy to Vercel**
    ```bash
    vercel
    ```

3.  **Set environment variables in Vercel dashboard**
    - `OMDB_API_KEY`

