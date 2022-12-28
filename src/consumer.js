const { TOPICS } = require("./config/constants");
const { kafka } = require("./config/kafka_instance");

async function consume(topic, onResult) {
  if (!TOPICS[topic]) {
    throw new Error(`Topic "${topic}" doesn't exists.`);
  }

  try {
    const consumer = kafka.consumer({ groupId: TOPICS[topic] });

    await consumer.connect();
    await consumer.subscribe({ topic: TOPICS[topic], fromBeginning: true });

    await consumer.run({
      eachMessage: async (props) => {
        onResult(props);
      },
      
    });
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  consume,
};
