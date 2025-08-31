import { authFetch } from "@/helpers/authFetch";
import { Role } from "@/models/user.model";
import { useQuery } from "@tanstack/react-query";

export interface UserData {
  id: number;
  name: string;
  company: string;
  gender: boolean;
  email: string;
  roles: Role[];
}

const fetchUser = async () => {
  const res = await authFetch("/auth");
  if (!res.ok) throw new Error("Fail to fetch user");
  const rawData = await res.json();
  const data: UserData = {
    id: rawData.id,
    name: rawData.name,
    gender: rawData.gender,
    email: rawData.email,
    company: rawData.company,
    roles: rawData.roles.map((value: string) => value as Role),
  };
  return data;
};

export function useUser() {
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["user"],
    queryFn: fetchUser,
  });

  return {
    data,
    error,
    isLoading,
    refetch,
  };
}
