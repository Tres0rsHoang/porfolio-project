"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { InputField } from "../form/input.field";
import SelectionField from "../form/selection.field";
import styles from "./login_info.module.css";
import { NotificationType, useNotication } from "@/store/notification.store";
import { useState } from "react";
import { LoadingButton } from "../loading/loading_button";

export interface RegisterFormData {
  name: string;
  gender: string;
  company: string;
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

interface RegisterFormProps {
  closeDialog?: () => void;
  onRegisterSuccess?: (data: RegisterFormData, userId: number) => void;
  name?: string;
  gender?: boolean;
  email?: string;
  company?: string;
}

export default function RegisterForm(props: RegisterFormProps) {
  const {
    register: registerRegister,
    handleSubmit: handleRegisterSubmit,
    formState: { errors: registerErrors },
    setError: setRegisterError,
  } = useForm<RegisterFormData>({
    defaultValues: {
      name: props.name,
      company: props.company,
      gender: props.gender != null && !props.gender ? "female" : "male",
      email: props.email,
    },
  });

  const { addNotification } = useNotication();
  const [isSubmit, setIsSubmit] = useState<boolean>(false);

  const onRegisterFormSubmit: SubmitHandler<RegisterFormData> = async (
    data: RegisterFormData,
  ) => {
    setIsSubmit(true);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          company: data.company,
          gender: data.gender == "male",
          email: data.email,
          username: data.username,
          password: data.password,
        }),
      },
    );
    setIsSubmit(false);

    if (res.status != 201) {
      addNotification(
        "Got error when create new account",
        NotificationType.ERROR,
      );

      const resData = await res.json();
      const resMessage = resData["response"];
      if (!resMessage["errorField"]) return;
      setRegisterError(resMessage["errorField"], {
        type: "manual",
        message: resMessage["message"],
      });
      return;
    }
    const resData = await res.json();
    addNotification("Register successfully", NotificationType.SUCCESS);
    if (props.closeDialog) props.closeDialog();
    if (props.onRegisterSuccess) props.onRegisterSuccess(data, resData.userId);
  };

  return (
    <form onSubmit={handleRegisterSubmit(onRegisterFormSubmit)}>
      <h3>Your Information</h3>
      <InputField<RegisterFormData>
        name="name"
        required="Name is required"
        placeholder="Your name"
        className="mt-0"
        register={registerRegister}
        error={registerErrors.name}
        autoFocus={true}
      ></InputField>
      <InputField<RegisterFormData>
        name="company"
        placeholder="Your company (optional)"
        register={registerRegister}
      ></InputField>
      <InputField<RegisterFormData>
        name="email"
        type="email"
        placeholder="Your email"
        register={registerRegister}
        error={registerErrors.email}
        pattern={{
          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
          message: "Invalid email format",
        }}
        required="Email is required"
      ></InputField>
      <SelectionField<RegisterFormData>
        name="gender"
        className={`flex flex-row justify-between ${styles.genderField} mt-2`}
        label="Gender"
        required="Gender is required"
        options={[
          {
            label: "Male",
            value: "male",
          },
          {
            label: "Female",
            value: "female",
          },
        ]}
        register={registerRegister}
        error={registerErrors.gender}
      ></SelectionField>
      <h3 className="mt-2">Authentication</h3>
      <InputField<RegisterFormData>
        name="username"
        className="mt-0"
        required="Username is required"
        placeholder="Username"
        register={registerRegister}
        error={registerErrors.username}
        validate={(value, formValues) => {
          void formValues;
          if (value.includes(" "))
            return "Don't push whitespace in your username";
          return true;
        }}
      ></InputField>
      <InputField<RegisterFormData>
        name="password"
        type="password"
        required="Password is required"
        placeholder="Password"
        register={registerRegister}
        error={registerErrors.password}
        validate={(value: string, formValues: RegisterFormData) => {
          void formValues;
          if (value.length < 8) {
            return "Password is required minimum eight characters";
          }
          if (!/[a-z]/.test(value)) {
            return "Password is required at least one lowercase letter";
          }
          if (!/[A-Z]/.test(value)) {
            return "Password is required at least one uppercase letter";
          }
          if (!/[0-9]/.test(value)) {
            return "Password is required at least one number";
          }
          if (!/[!@#$%^&*(),.?":{}|<>_\-\\[\]]/.test(value)) {
            return "Password is required at least one special character";
          }
          return true;
        }}
      ></InputField>
      <InputField<RegisterFormData>
        name="confirmPassword"
        required="Confirm password is required"
        placeholder="Confirm password"
        register={registerRegister}
        type="password"
        error={registerErrors.confirmPassword}
        validate={(value: string, formValues: RegisterFormData) => {
          return value == formValues.password || "Password do not match";
        }}
      ></InputField>
      <div className="w-full flex justify-center">
        <LoadingButton
          isLoading={isSubmit}
          label="Register"
          className="mt-3 bg-(--highlight)"
        />
      </div>
    </form>
  );
}
