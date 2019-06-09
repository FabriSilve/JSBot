const http = require('http');
const router = require('node-simple-router')();

const mockLog = (strings) => {
  console.log('\n##########################################\n#');
  if (Array.isArray(strings)) strings.forEach(s => console.log(`# ${s}`));
  else console.log(`# ${strings}`);
  console.log('#\n##########################################\n');
}

router.post('/:botToken/getMe', async (req, res) => {
  mockLog('getMe');
  res.statusCode = 200;
  res.end();
});

router.post('/:botToken/setwebhook', async (req, res) => {
  mockLog('setWebhook');
  res.statusCode = 200;
  res.end();
});

router.post('/:botToken/sendMessage', async (req, res) => {
  const { chat_id, text } = req.body;
  mockLog([
    'sendMessage',
    `CHAT: ${chat_id}`,
    `TEXT: ${text}`,
  ]);
  res.statusCode = 200;
  res.end();
});

const server = http.createServer(router);
const port = process.env.PORT;
server.listen(port);
