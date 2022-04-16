export interface CreateUser {
  _id?: string;
  email: string;
  password: string;
  name: string;
  username: string;
  bio?: string;
  profilePicture?: string;

}
