export interface Message {
  message: string;
}

export interface ApiResponseType<T> {
  status: number;
  message?: string;
  data?: T;
}

export interface MailOptions {
  from: string;
  to: string;
  subject: string;
  html: string;
}
