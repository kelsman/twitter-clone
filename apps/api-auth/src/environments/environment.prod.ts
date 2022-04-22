export const environment = {
  production: false,
  name: 'Auth_Service',
  Port: process.env.PORT,
  Database: {
    DB_URL: process.env.MONGO_URL,
  },
  CLIENT_URL: process.env.CLIENT_URL,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_ACCESS_EXPIRES_IN: process.env.JWT_ACCESS_EXPIRES_IN,
  JWT_REFRESH_EXPIRES_IN: process.env.JWT_REFRESH_EXPIRES_IN,
  Rabbitmq: {
    RabbitMq_URL: process.env.AMQP_URL,
  },
};
