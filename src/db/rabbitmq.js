import amqp from 'amqplib';

const connectRabbitMQ = async () => {
  try {
    const connection = await amqp.connect(process.env.RABBITMQ_URL);
    const channel = await connection.createChannel();
    console.log('🐰 RabbitMQ Connected');
    return channel;
  } catch (error) {
    console.error('❌ RabbitMQ Connection Failed:', error);
  }
};

export default connectRabbitMQ;
