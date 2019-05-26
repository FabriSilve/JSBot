const server = require('./server');

const port = process.env.PORT || '6200';
server.listen(port);
