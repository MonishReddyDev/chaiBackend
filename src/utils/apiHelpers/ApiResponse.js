//This class standardizes successful responses from your API.

class ApiResponse {
  constructor(statusCode, data, message = "Success") {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    this.success = statusCode < 400; // Any status below 400 indicates success
  }
}

export { ApiResponse };
