import { HttpErrorResponse } from "@angular/common/http";

interface ApiErrorResponse extends HttpErrorResponse {
  error: string;
  status: number;
  message: string;
  path: string;
  timestamp: number
}

export { ApiErrorResponse };
