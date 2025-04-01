import amqplib from 'amqplib';

const RABBITMQ_URL = process.env.RABBITMQ_URL || 'amqp://localhost';
const QUEUE_NAME = 'payment_queue';

const startWorker = async () => {
  try {
    const connection = await amqplib.connect(RABBITMQ_URL);
    const channel = await connection.createChannel();
    await channel.assertQueue(QUEUE_NAME, { durable: true });
    console.log(`Worker is waiting for messages in ${QUEUE_NAME}...`);

    channel.consume(QUEUE_NAME, (msg) => {
      if (msg !== null) {
        const messageContent = JSON.parse(msg.content.toString());
        console.log('Received message:', messageContent);
        // Lakukan proses yang dibutuhkan, misal update status pembayaran
        // ...

        // Acknowledge pesan setelah selesai diproses
        channel.ack(msg);
      }
    });
  } catch (error) {
    console.error('Error in worker:', error);
  }
};

startWorker();
