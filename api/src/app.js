const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT;
const TOKEN = process.env.TOKEN;

const URL = 'https://api.telegram.org/bot';

app.use(bodyParser.json());

app.get('/', (req, res) => {
  console.log('GET: /');
  res.json({});
});

app.post('/', async (req, res) => {
  const chatId = req.body.message.chat.id;
  const sentMessage = req.body.message.text;
  // Regex for hello
  if (sentMessage.match(/hello/gi)) {
    const { data } = await axios.post(`${URL}${TOKEN}/sendMessage`,
      {
        chat_id: chatId,
        text: 'hello back 👋'
      });
    console.log(data);
    res.json({});
  } else {
    // if no hello present, just respond with 200
    res.json({});
  }
});

app.listen(PORT, () => {
     console.log(`Listening on port ${PORT}`);
});
