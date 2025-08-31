export enum Role {
  ADMIN = "admin",
  USER = "user",
}
export type User = {
  id?: number;
  role?: Role;
  name: string;
  gender: boolean;
  company?: string;
};
