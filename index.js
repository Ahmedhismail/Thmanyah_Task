const fastify = require("fastify");
const searchHandler = require("./searchHandler");

function init() {
  const app = fastify({ logger: true });

  const getOptions = {
    schema: {
      // schema validation
      querystring: {
        // checking that the query string matches what we want
        type: "object",
        properties: {
          search: { type: "string" },
        },
        required: ["search"],
        additionalProperties: false,
      },
      response: {
        // checking that our response has the codes and schema formatted in the way we want it
        200: {
          type: "object",
          properties: {
            results: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  name: { type: "string" },
                  author: { type: "string" },
                  logoSrc: { type: "string" },
                },
              },
            },
          },
        },
      },
    },
  };

  app.get("/Thmanyah", getOptions, async (request, reply) => {
    try {
      const results = await searchHandler(request.query.search);
      reply.send({ results });
    } catch (error) {
      if (error.message == "Failed to fetch data from iTunes Search API") {
        reply.status(502).send(error); // expexted error if search handler does not work for some reason we return 502
      }
      reply.status(500); // incase sending failed for some reason we return 500
    }
  });

  return app;
}

if (require.main === module) {
  // called directly i.e. "node app"
  init().listen({ port: 3000 }, function (err, address) {
    if (err) {
      fastify.log.error(err);
      process.exit(1);
    }
    console.log("now listening at http://localhost:3000/");
  });
} else {
  // executed on aws lambda
  module.exports = init;
}
