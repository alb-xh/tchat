import jwt from 'jsonwebtoken';

export class Token {
  constructor (private readonly secret: string) {}

  generate (userId: number): Promise<string> {
    return new Promise((resolve, reject) => {
      jwt.sign(userId.toString(), this.secret, { expiresIn: '1w' }, (err, token) => {
        if (err) { return reject(err); }
        resolve(token)
      });
    });
  }

  verify (token): Promise<number> {
    return new Promise((resolve, reject) => {
      jwt.verify(token, this.secret, (err, userId) => {
        if (err) { return reject(err); }
        resolve(Number(userId));
      });
    });
  }
}