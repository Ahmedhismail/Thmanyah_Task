const fastify = require("fastify")({ logger: true });

const getOptions = {
  schema: {
    querystring: {
      search: { type: "string" },
    },
    response: {
      200: {
        type: "object",
        properties: {
          author: { type: "string" },
          name: { type: "string" },
          logoSrc: { type: "string" },
        },
      },
    },
  },
};

fastify.get("/search", getOptions, async (request, reply) => {
  const ret = await searchHandler(request.query.search);
  const response = ret.results[0];
  reply.status(200);

  reply.send({
    author: response.artistName,
    name: response.trackName,
    logoSrc: response.artworkUrl600,
  });

  console.log(ret);
  console.log(response.artistName);
  console.log(response.trackName);
  console.log(response.artworkUrl600);
});

async function searchHandler(searchQeury) {
  const resp = await fetch(
    `https://itunes.apple.com/search?term=${searchQeury}&entity=podcast&limit=1` // dont forget to modify limit when finalizing
  );

  return await resp.json();
}

fastify.listen({ port: 3000 }, function (err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  console.log("now listening at http://localhost:3000/");
});
