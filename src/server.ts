import fastify from 'fastify';

const app = fastify();

const port = 5000;

app.get('/', () => {
  return 'Weslley você é foda';
});

app.listen({ port }).then(() => {
  console.log(`HTTP server running on: http://127.0.0.1:${port}`);
});
