import jwt, { JwtPayload } from 'jsonwebtoken';

export class Token {
  constructor (private readonly secret: string) {}

  generate (userId: number): Promise<string> {
    return new Promise((resolve, reject) => {
      jwt.sign({ userId }, this.secret, { expiresIn: '7d' }, (err, token) => {
        if (err) { return reject(err); }
        resolve(token)
      });
    });
  }

  verify (token: string): Promise<number> {
    return new Promise((resolve, reject) => {
      jwt.verify(token, this.secret, (err, payload: JwtPayload) => {
        if (err) { return reject(err); }
        resolve(Number(payload.userId));
      });
    });
  }
}