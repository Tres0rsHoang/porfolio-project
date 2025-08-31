export enum Role {
  ADMIN = 'admin',
  USER = 'user',
}

export function toRole(value: string): Role | undefined {
  if (Object.values(Role).includes(value as Role)) {
    return value as Role;
  }
  return undefined;
}
