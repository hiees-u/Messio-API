import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RequestWithUser } from '../dto/request-with-user.type';
import { UseUserRepository } from 'src/modules/users/repositories/useUser.repository';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly useUserRepository: UseUserRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<RequestWithUser>();

    const permissions = this.reflector.get<string[]>(
      'permissions',
      context.getHandler(),
    );

    if (permissions[0] === 'admin') {
      const userId: number = Number(request.user.id);

      const result = await this.useUserRepository.existUserFacebook(userId);
      return result;
    }

    return true;
  }
}
