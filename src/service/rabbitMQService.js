import amqplib from 'amqplib';

const RABBITMQ_URL = process.env.RABBITMQ_URL || 'amqp://localhost';

export const sendToQueue = async (queueName, message) => {
  try {
    // Membuat koneksi ke RabbitMQ
    const connection = await amqplib.connect(RABBITMQ_URL);
    const channel = await connection.createChannel();
    
    // Pastikan queue ada
    await channel.assertQueue(queueName, { durable: true });
    
    // Mengirim pesan ke queue
    channel.sendToQueue(queueName, Buffer.from(JSON.stringify(message)), { persistent: true });
    console.log(`Message sent to queue ${queueName}:`, message);
    
    // Tutup channel dan koneksi setelah pengiriman pesan
    setTimeout(() => {
      channel.close();
      connection.close();
    }, 500);
  } catch (error) {
    console.error('Error sending message to RabbitMQ:', error);
  }
};
