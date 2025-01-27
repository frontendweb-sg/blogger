import JWT, { SignOptions, JwtPayload } from "jsonwebtoken";
import { AuthError } from "./errors";

const DEFAULT_OPTION: SignOptions = {
  expiresIn: "1h",
};

export class Jwt {
  static token(payload: JwtPayload, option: SignOptions = DEFAULT_OPTION) {
    return JWT.sign(payload, process.env.AUTH_SECRET!, option);
  }

  static verify(token: string) {
    return JWT.verify(token, process.env.AUTH_SECRET!, (err, decoded) => {
      if (err) {
        return new AuthError(err.message || "Invalid token");
      }
      return decoded;
    });
  }
}
