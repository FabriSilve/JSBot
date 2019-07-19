const http = require('http');
const router = require('node-simple-router')();

const mockLog = (strings) => {
  console.log('\n##########################################\n#');
  if (Array.isArray(strings)) strings.forEach(s => console.log(`# ${s}`));
  else console.log(`# ${strings}`);
  console.log('#\n##########################################\n');
}

router.get('/:botToken/getMe', async (req, res) => {
  mockLog('getMe');
  res.statusCode = 200;
  res.end(JSON.stringify({
    ok:true,
    result: {
      id:751531277,
      is_bot:true,
      first_name:"JsBotMock",
      username:"JsBotMock"
    }
  }));
});

router.post('/:botToken/setwebhook', async (req, res) => {
  mockLog('setWebhook');
  res.statusCode = 200;
  res.end();
});

router.post('/:botToken/:endpoint', async (req, res) => {
  const { body } = req;
  const { endpoint } = req.params;
  mockLog([
    endpoint,
    JSON.stringify(body, null, 2),
  ]);
  res.statusCode = 200;
  res.end();
});

const server = http.createServer(router);
const port = process.env.PORT;
server.listen(port);
