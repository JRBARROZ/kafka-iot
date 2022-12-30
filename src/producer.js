const { TOPICS } = require("./config/constants");
const { kafka } = require("./config/kafka_instance");
const producer = kafka.producer();

async function produce(topic, message) {
  if (!TOPICS[topic]) {
    throw new Error(`Topic "${topic}" doesn't exists.`);
  }
  console.log(`[PRODUCER] Producing '${message}' on topic '${topic}'`);
  await producer.connect();

  await producer.send({
    topic: TOPICS[topic],
    messages: [{ value: message }],
  });

  await producer.disconnect();

  return producer;
}

// ARDUINO
const unoReferenceVoltage = 5;
setInterval(() => {
  const fullVoltage = Math.floor(Math.random() * 220);
  const data = (fullVoltage * unoReferenceVoltage) / 1023;
  produce("energy_measure", data.toString());
}, 1000);

module.exports = {
  produce,
};
