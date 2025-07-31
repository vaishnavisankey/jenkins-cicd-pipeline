const http = require('http');

const PORT = process.env.PORT || 3000;
const VERSION = process.env.VERSION || 'v1';

const server = http.createServer((req, res) => {
  res.writeHead(200);
  res.end(`Hello from version ${VERSION}`);
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
