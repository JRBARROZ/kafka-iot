const { json } = require("body-parser");
const { TOPICS } = require("./config/constants");
const { kafka } = require("./config/kafka_instance");
const producer = kafka.producer();

let roomIsEmpty = false
setInterval(() => {
  roomIsEmpty = Math.floor(Math.random() * (2 - 0) + 0) === 0 ? false : true
}, 10 * 1000)

// ARDUINO
const unoReferenceVoltage = 5;
setInterval(() => {
  const fullVoltage = Math.floor(Math.random() * 220);
  let data = (fullVoltage * unoReferenceVoltage) / 1023;

  if (!roomIsEmpty) {
    data = data * 1.1  // 10% de aumento no consumo se tiver gente na sala.
  }

  produce("rooms", data.toString());
}, 1000);

 
async function produce(topic, message) {
  if (!TOPICS[topic]) {
    throw new Error(`Topic "${topic}" doesn't exists.`);
  }
  console.log(`[PRODUCER] Producing '${message}, room_is_empty: ${roomIsEmpty}' on topic '${topic}'`);
  await producer.connect();

  await producer.send({
    topic: TOPICS[topic],
    messages: [
      {
        key: 'room1',
        value: JSON.stringify({ value: message, room_is_empty: roomIsEmpty })
      }
    ],
  });

  await producer.disconnect();

  return producer;
}

module.exports = {
  produce,
};
