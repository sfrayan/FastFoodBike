import { Server } from 'socket.io';
import logger from './logger.js';

export const initSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: process.env.CORS_ORIGIN?.split(',') || 'http://localhost:3000',
      credentials: true,
      methods: ['GET', 'POST'],
    },
    transports: ['websocket', 'polling'],
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    reconnectionAttempts: 5,
  });

  // Connection handling
  io.on('connection', (socket) => {
    logger.info(`Client connected: ${socket.id}`);

    // Join room
    socket.on('join-room', (roomId) => {
      socket.join(roomId);
      logger.debug(`Socket ${socket.id} joined room ${roomId}`);
    });

    // Leave room
    socket.on('leave-room', (roomId) => {
      socket.leave(roomId);
      logger.debug(`Socket ${socket.id} left room ${roomId}`);
    });

    // Update location (for delivery tracking)
    socket.on('update-location', (data) => {
      io.to(data.roomId).emit('location-updated', {
        deliveryId: data.deliveryId,
        latitude: data.latitude,
        longitude: data.longitude,
        timestamp: new Date(),
      });
    });

    // Order status update
    socket.on('order-status', (data) => {
      io.to(data.orderId).emit('order-status-changed', {
        orderId: data.orderId,
        status: data.status,
        timestamp: new Date(),
      });
    });

    // Disconnect handling
    socket.on('disconnect', () => {
      logger.info(`Client disconnected: ${socket.id}`);
    });

    // Error handling
    socket.on('error', (error) => {
      logger.error(`Socket error for ${socket.id}: ${error}`);
    });
  });

  return io;
};

export default initSocket;
