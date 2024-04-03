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
  ret = await searchHandler(request.query.RSP);
  reply.status(200);
  reply.send({ response: "worked!" });
  // console.log(`\n ${request.query.RSP} \n`);

  console.log(await ret.json());
});

async function searchHandler(searchQeury) {
  const resp = await fetch(
    `https://itunes.apple.com/search?term=${searchQeury}&limit=5` // dont forget to modify limit when finalizing
  );

  return resp;
}

fastify.listen({ port: 3000 }, function (err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  console.log("now listening at http://localhost:3000/");
});
