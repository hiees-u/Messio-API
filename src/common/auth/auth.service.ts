import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PayloadTokenDto } from './dto/payload.token.dto';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async generateToken(user: PayloadTokenDto): Promise<string> {
    const payload = {
      sub: user.sub,
      id: user.id,
      name: user.name,
    };

    return this.jwtService.signAsync(payload);
  }
}
