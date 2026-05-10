import { Request } from 'express';

import { PayloadTokenDto } from '../dto/payload.token.dto';

export interface RequestWithUser extends Request {
  user: PayloadTokenDto;
}
