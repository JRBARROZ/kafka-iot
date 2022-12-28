const { TOPICS } = require("./config/constants");
const { kafka } = require("./config/kafka_instance");
const producer = kafka.producer();

async function publish(topic, message) {
  
  if (!TOPICS[topic]) {
    throw new Error(`Topic "${topic}" doesn't exists.`);
  }

  await producer.connect();

  await producer.send({
    topic: TOPICS[topic],
    messages: [{ value: message }],
  });

  await producer.disconnect();

  return producer;
}

module.exports = {
  publish,
};
