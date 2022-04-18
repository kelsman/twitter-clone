export const environment = {
  production: false,
  name: 'Auth_Service',
  Port: process.env.PORT,
  Database: {
    DB_URL: process.env.MONGO_URL,
  },
  JWT_SECRET: process.env.JWT_SECRET_KEY,
  JWT_ACCESS_EXPIRES_IN: process.env.ACCESS_TOKEN_EXPIRATION,
  JWT_REFRESH_EXPIRES_IN: process.env.REFRESH_TOKEN_EXPIRATION,
  Rabbitmq: {
    RabbitMq_URL: process.env.AMQP_URL,
  },
};
