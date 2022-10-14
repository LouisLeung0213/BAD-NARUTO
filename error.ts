export class HTTPError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
}
