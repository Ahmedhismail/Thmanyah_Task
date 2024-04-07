const awsLambdaFastify = require("@fastify/aws-lambda"); // import fastify lambda lib
const init = require("./index"); // import my app
const proxy = awsLambdaFastify(init()); // create a wrapper function around my app that give it correct config to be an lambda handler

exports.handler = proxy;
