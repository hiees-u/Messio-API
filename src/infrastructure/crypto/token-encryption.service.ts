// token-encryption.service.ts
import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export class TokenEncryptionService {
  private readonly algorithm = 'aes-256-gcm';

  // 32 bytes key
  private readonly key = crypto
    .createHash('sha256')
    .update(process.env.ENCRYPTION_KEY || 'default_secret')
    .digest();

  encrypt(text: string): string {
    const iv = crypto.randomBytes(16);

    const cipher = crypto.createCipheriv(this.algorithm, this.key, iv);

    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    const authTag = cipher.getAuthTag();

    return [iv.toString('hex'), authTag.toString('hex'), encrypted].join(':');
  }

  decrypt(payload: string): string {
    const [ivHex, authTagHex, encrypted] = payload.split(':');

    const decipher = crypto.createDecipheriv(
      this.algorithm,
      this.key,
      Buffer.from(ivHex, 'hex'),
    );

    decipher.setAuthTag(Buffer.from(authTagHex, 'hex'));

    let decrypted = decipher.update(encrypted, 'hex', 'utf8');

    decrypted += decipher.final('utf8');

    return decrypted;
  }
}
