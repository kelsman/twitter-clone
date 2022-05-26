import { environment } from '../../environments/environment';

export default () => ({
  name: environment.name,
  port: environment.Port,
  email: {
    host: environment.EMAIL_HOST,
    password: environment.EMAIL_PASSWORD,
    username: environment.EMAIL_USERNAME,
  },
});
