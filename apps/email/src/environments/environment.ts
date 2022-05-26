export const environment = {
  production: false,
  name: 'Email_Service',
  Port: process.env.PORT,
  Database: {
    DB_URL: process.env.MONGO_URL,
  },
  JWT_SECRET: process.env.SECRET_KEY,
  JWT_ACCESS_EXPIRES_IN: process.env.ACCESS_EXPIRES_IN,
  JWT_REFRESH_EXPIRES_IN: process.env.REFRESH_EXPIRES_IN,
  Rabbitmq: {
    RabbitMq_URL: process.env.AMQP_URL,
  },

  EMAIL_HOST: process.env.EMAIL_SERVICE,
  EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,
  EMAIL_USERNAME: process.env.EMAIL_USER,
};
