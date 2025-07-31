const http = require('http');
const port = 3000;

const requestHandler = (request, response) => {
  response.end('App deployed successfully!');
};

const server = http.createServer(requestHandler);

server.listen(port, (err) => {
  if (err) {
    return console.log('Error:', err);
  }
  console.log(`Server running on port ${port}`);
});
