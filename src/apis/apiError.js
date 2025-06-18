export default class ApiError extends Error {
  constructor(errorCode, reason, data = null, originalError = null) {
    super(reason);
    this.name = 'ApiError';
    this.errorCode = errorCode;
    this.reason = reason;
    this.data = data;
    this.originalError = originalError;
    this.timestamp = new Date().toISOString();
    this.stack = originalError?.stack ?? this.stack;
  }

  toString() {
    return `[${this.name}] ${this.errorCode}: ${this.reason}${this.data ? `\nData: ${JSON.stringify(this.data)}` : ''}${this.originalError ? `\nOriginal Error: ${this.originalError}` : ''}`;
  }
}
