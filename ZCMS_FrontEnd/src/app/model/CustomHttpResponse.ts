export interface CustomHttpResponse{
  timestamp: Date;
  path?: String;
  status: number;
  error: string;
  message: string;
  requestId?: string;
}
