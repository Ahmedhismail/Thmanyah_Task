const fastify = require("fastify")({ logger: true });
const searchHandler = require("./searchHandler");

const getOptions = {
  schema: {
    querystring: {
      search: { type: "string" },
    },
    response: {
      200: {
        type: "object",
        properties: {
          results: {
            type: "array",
            items: {
              type: "object",
              properties: {
                author: { type: "string" },
                name: { type: "string" },
                logoSrc: { type: "string" },
              },
            },
          },
        },
      },
    },
  },
};

fastify.get("/search", getOptions, async (request, reply) => {
  const results = await searchHandler(request.query.search);

  reply.status(200);
  reply.send({ results });
});

fastify.listen({ port: 3000 }, function (err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  console.log("now listening at http://localhost:3000/");
});
