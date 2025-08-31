import { Role } from 'src/auth/entity/role.entity';

export interface UserDetail {
  name: string;
  id: number;
  gender: boolean;
  company: string | null;
  email: string | null;
  roles: Role[];
}
