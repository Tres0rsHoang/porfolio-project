export interface PublicUser {
  id: number;
  name: string;
  email: string | null;
  gender: boolean;
  company: string | null;
  roles: string[];
}
