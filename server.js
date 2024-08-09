const express = require('express');
const axios = require('axios');
const app = express();

app.get('/api/entries', async (req, res) => {
    try {
        const { category, limit } = req.query;
        const response = await axios.get('https://api.publicapis.org/entries');

        let entries = response.data.entries;
        if (category) {
            entries = entries.filter(entry => entry.Category.toLowerCase() === category.toLowerCase());
        }

        if (limit) {
            entries = entries.slice(0, Number(limit));
        }

        res.json(entries);
    } catch (error) {
        console.error('Error fetching data from public API:', error.message);
        res.status(500).json({ error: `Failed to fetch data from public API: ${error.message}` });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
