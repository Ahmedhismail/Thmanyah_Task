const fastify = require("fastify")({ logger: true });

const getOptions = {
  schema: {
    querystring: {
      RSP: { type: "string" },
    },
    response: {
      200: {
        type: "object",
        properties: {
          response: { type: "string" },
        },
      },
    },
  },
};

fastify.get("/search", getOptions, async (request, reply) => {
  reply.status(200);
  reply.send({ hello: "world" });
  // console.log(`\n ${request.query.RSP} \n`);

  console.log(
    `\n ${JSON.stringify(await searchHandler(request.query.RSP), null, 2)} \n`
  );
});

async function searchHandler(searchQeury) {
  const resp = await fetch(
    `https://itunes.apple.com/search?term=${searchQeury}&limit=2` // dont forget to modify limit when finalizing
  );
  return await resp.json();
}

fastify.listen({ port: 3000 }, function (err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  console.log("now listening at http://localhost:3000/");
  // Server is now listening on ${address}
});
