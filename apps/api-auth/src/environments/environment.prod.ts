export const environment = {
  production: true,
  name: 'Auth_Service',
  Database: {
    DB_URL: process.env.MONGO_URL,
  },
  JWT_SECRET: process.env.SECRET_KEY,
  JWT_ACCESS_EXPIRES_IN: process.env.ACCESS_EXPIRES_IN,
  JWT_REFRESH_EXPIRES_IN: process.env.REFRESH_EXPIRES_IN,
  Rabbitmq: {
    RabbitMq_URL: process.env.AMQP_URL,
  },
};
