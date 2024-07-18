export class WsResponse {
  public code: number;
  public message: string;
  public payload: Record<string, unknown>;

  constructor (code: number, message: string, payload: Record<string, unknown>) {
    this.code = code;
    this.message = message;
    this.payload = payload;
  }
}

export class Ok extends WsResponse { constructor (payload: Record<string, unknown>) { super(200, 'OK', payload); } }
export class BadRequest extends WsResponse { constructor () { super(400, 'BadRequest', {}) } }
export class Unauthorized extends WsResponse { constructor () { super(401, 'Unauthorized', {}); } }
export class NotFound extends WsResponse { constructor () { super(404, 'Not Found', {}); } }
export class Conflict extends WsResponse { constructor () { super(409, 'Conflict', {}); } }
