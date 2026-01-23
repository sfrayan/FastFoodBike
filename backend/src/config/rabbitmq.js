import amqp from 'amqplib';
import logger from './logger.js';

let connection;
let channel;

export const initRabbitMQ = async () => {
  try {
    const rabbitUrl = process.env.RABBITMQ_URL || 'amqp://guest:guest@localhost:5672';
    
    connection = await amqp.connect(rabbitUrl);
    channel = await connection.createChannel();

    // Set prefetch
    await channel.prefetch(1);

    // Handle connection errors
    connection.on('error', (error) => {
      logger.error(`RabbitMQ connection error: ${error.message}`);
    });

    connection.on('close', () => {
      logger.warn('RabbitMQ connection closed');
    });

    logger.info('RabbitMQ connected');
    return { connection, channel };
  } catch (error) {
    logger.error(`RabbitMQ initialization error: ${error.message}`);
    throw error;
  }
};

export const getChannel = () => {
  if (!channel) {
    throw new Error('RabbitMQ channel not initialized');
  }
  return channel;
};

export const closeRabbitMQ = async () => {
  try {
    if (channel) {
      await channel.close();
    }
    if (connection) {
      await connection.close();
    }
    logger.info('RabbitMQ connections closed');
  } catch (error) {
    logger.error(`Error closing RabbitMQ: ${error.message}`);
  }
};

export default { connection, channel };
