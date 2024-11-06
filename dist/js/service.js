const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());

const API_BASE_URL = 'http://apis.juhe.cn/fapig/football/query';
const API_KEY = '04403d6f5753fac7c29e327576133028';

app.get('/api/football', async (req, res) => {
  try {
    const type = req.query.type || 'xijia';
    const response = await axios.get(`${API_BASE_URL}?type=${type}&key=${API_KEY}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching data' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));