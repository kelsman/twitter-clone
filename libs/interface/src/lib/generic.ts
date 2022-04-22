export interface Message {
  message: string;
}

export interface ApiResponse<T> {
  status: number;
  message: string;
  data?: T;
}

export interface MailOptions {
  from: string;
  to: string;
  subject: string;
  html: string;
}
