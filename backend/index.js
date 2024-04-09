const fastify = require("fastify");
const searchHandler = require("./searchHandler");
const cors = require("@fastify/cors");
const { DynamoDBClient, PutItemCommand } = require("@aws-sdk/client-dynamodb");

function init() {
  const dynamoDBClient = new DynamoDBClient({
    region: "us-east-2",
  });

  const app = fastify({ logger: true });
  // make fastify instance

  app.register(cors, {
    origin: "*",
  });

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
                  id: { type: "string" },
                  logoSrc: { type: "string" },
                  link: { type: "string" },
                },
              },
            },
          },
        },
      },
    },
  };

  app.get("/search", getOptions, async (request, reply) => {
    // make our route
    try {
      const results = await searchHandler(request.query.search); // call search handler using request query string
      reply.send({ results }); // send back result object
    } catch (error) {
      if (error.message == "Failed to fetch data from iTunes Search API") {
        reply.status(502).send(error); // expexted error if search handler does not work for some reason we return 502
      }
      reply.status(500).send(); // incase sending failed for some reason we return 500
    }

    const item = results[0];
    const input = {
      Item: {
        podcastID: {
          S: item.id,
        },
        author: {
          S: item.author,
        },
        name: {
          S: item.name,
        },
        logoSrc: {
          S: item.logoSrc,
        },
        link: {
          S: item.link,
        },
      },
      TableName: "thmanyahTable",
    };
    await dynamoDBClient.send(new PutItemCommand(input));
  });

  return app;
}

if (require.main === module) {
  // if our app was ran directly using "node" command (for local testing)
  init().listen({ port: 5000 }, function (err, address) {
    if (err) {
      console.log(err);
      process.exit(1);
    }
    console.log("now listening at http://localhost:5000/");
  });
} else {
  // else it was executed on aws lambda
  module.exports = init;
}
