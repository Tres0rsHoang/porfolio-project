"use client";

import AnimateSection from "@/components/animate_section";
import { InputField } from "@/components/form/input.field";
import SelectionField from "@/components/form/selection.field";
import { LoadingButton } from "@/components/loading/loading_button";
import { Loading } from "@/components/loading/loading_full";
import useUpdateUser from "@/hooks/useUpdateUser";
import { useUser } from "@/hooks/useUser";
import { useAuthStore } from "@/store/auth.store";
import { useUserStore } from "@/store/user.store";
import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { Fragment, useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";

export interface UserInformationData {
  name: string;
  email: string;
  company: string;
  gender: string;
}

export default function ProfilePage() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<UserInformationData>();
  const { data: userData, isLoading: userLoading, refetch } = useUser();

  const { setUser } = useUserStore();
  const { accessToken } = useAuthStore();
  const sendUserQuery = useUpdateUser();
  const router = useRouter();

  const initFormValue = useCallback(() => {
    if (!userData) return;
    setValue("name", userData.name);
    setValue("gender", userData.gender ? "male" : "female");
    setValue("email", userData.email);
    setValue("company", userData.company);
  }, [setValue, userData]);

  useEffect(() => {
    if (!accessToken) router.push("/");
    if (userData != undefined) {
      setUser({
        id: userData.id,
        company: userData.company,
        role: userData.roles[0],
        gender: userData.gender,
        name: userData.name,
      });
      initFormValue();
    }
  }, [userData, router, initFormValue, setUser, accessToken]);

  const onEditUserInfor = (data: UserInformationData) => {
    sendUserQuery.mutate({
      data: data,
      onSuccess: () => {
        refetch();
      },
    });
  };

  return (
    <Fragment>
      <AnimatePresence>
        <AnimateSection>
          <div className="px-8 border-3 border-black border-r-0 pb-5 rounded-(--border-radius) rounded-r-none bg-(--green)">
            <h2>Your Information</h2>
            <form onSubmit={handleSubmit(onEditUserInfor)}>
              <InputField<UserInformationData>
                register={register}
                name="name"
                placeholder="Your name"
                required="Your name can't not empty"
                label="Name"
                error={errors.name}
              ></InputField>
              <InputField<UserInformationData>
                register={register}
                name="company"
                placeholder="Your Company"
                label="Company"
                error={errors.company}
              ></InputField>
              <InputField<UserInformationData>
                register={register}
                name="email"
                type="email"
                placeholder="Your email"
                required="Your email can't not empty"
                label="Email"
                error={errors.email}
              ></InputField>
              <h3 className="text-black mt-2">Gender</h3>
              <SelectionField<UserInformationData>
                register={register}
                name="gender"
                required="Gender is required"
                options={[
                  { value: "male", label: "male" },
                  { value: "female", label: "female" },
                ]}
                className="mt-0"
              ></SelectionField>
              <div className="flex flex-row justify-end mt-2">
                <button type="button" className="mr-2" onClick={initFormValue}>
                  <h3>Reset</h3>
                </button>
                <LoadingButton
                  type="submit"
                  isLoading={sendUserQuery.isPending}
                  label={"Save"}
                  className="bg-(--red)"
                />
              </div>
            </form>
            <Loading isShow={userLoading} />
          </div>
        </AnimateSection>
      </AnimatePresence>
    </Fragment>
  );
}
