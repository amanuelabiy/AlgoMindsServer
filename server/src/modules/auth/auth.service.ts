import { RegisterDto } from "../../common/interface/auth.interface";

export class AuthService {
  public async register(registerData: RegisterDto): Promise<void> {
    const { name, email, password, userAgent } = registerData;

    // Check if the user already exists
  }
}
