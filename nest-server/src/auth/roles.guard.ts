import {
  CanActivate,
  ExecutionContext,
  Injectable,
  SetMetadata,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Role } from './entity/role.entity';
import { Request } from 'express';
import { PublicUser } from './entity/public-user.entity';

const ROLES_KEY = 'roles';
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles: Role[] = this.reflector.getAllAndOverride<Role[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!requiredRoles) return true;

    const request: Request = context.switchToHttp().getRequest();
    if (!request.user) return false;
    const reqUser = request.user as {
      sub: number;
      user: PublicUser;
    };
    const publicUser = reqUser.user;
    const result = requiredRoles.some((value) =>
      publicUser.roles.includes(value),
    );
    return result;
  }
}
