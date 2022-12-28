const { Kafka } = require("kafkajs");

const kafka = new Kafka({
  clientId: "my-app",
  brokers: ["localhost:9092", "localhost:9094"],
});

module.exports = {
  kafka,
};
