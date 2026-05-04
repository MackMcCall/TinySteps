"use strict";
const axios = require('axios');

// GET /news - fetch baby-related news from NewsAPI
async function fetchBabyNews(req, res) {
    const apiKey = process.env.NEWS_API_KEY;

    if (!apiKey) {
        return res.status(500).send("News API key is not configured");
    }

    try {
        const response = await axios.get('https://newsapi.org/v2/everything', {
            params: {
                q: 'baby milestones OR infant development OR toddler',
                language: 'en',
                sortBy: 'publishedAt',
                pageSize: 5,
                apiKey: apiKey
            }
        });

        // Just grab the articles array from the response
        const articles = response.data.articles;
        res.json(articles);
    } catch (err) {
        console.error("News API error:", err.message);
        res.status(500).send("Couldn't fetch news articles");
    }
}

module.exports = { fetchBabyNews };
