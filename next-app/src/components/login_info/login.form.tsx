"use client";

import { authFetch } from "@/helpers/authFetch";
import { useAuthStore } from "@/store/auth.store";
import { useUserStore } from "@/store/user.store";
import { SubmitHandler, useForm } from "react-hook-form";
import { InputField } from "../form/input.field";
import Link from "next/link";
import RegisterForm, { RegisterFormData } from "./register.form";
import { DialogFrame } from "../dialog/dialog_frame";
import { Role, User } from "@/models/user.model";
import { NotificationType, useNotication } from "@/store/notification.store";
import { Fragment, useState } from "react";
import { LoadingButton } from "../loading/loading_button";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface LoginFormData {
  username: string;
  password: string;
}

interface LoginProps {
  closeDialog?: () => void;
  linkAccount: boolean;
}

export default function LoginForm(props: LoginProps) {
  const { setToken } = useAuthStore();
  const { user: currentUser, setUser } = useUserStore();
  const {
    register: registerLogin,
    handleSubmit: handleLoginSubmit,
    setError: setLoginError,
    reset: resetLogin,
    setValue: setLoginValue,
    formState: { errors: loginErrors },
  } = useForm<LoginFormData>();
  const { addNotification } = useNotication();
  const [isShowRegisterForm, setShowRegisterForm] = useState<boolean>(false);
  const [isSubmit, setIsSubmit] = useState<boolean>(false);

  const router = useRouter();

  const onLoginFormSubmit: SubmitHandler<LoginFormData> = async (
    data: LoginFormData,
  ) => {
    setIsSubmit(true);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/login`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
      },
    );
    setIsSubmit(false);
    if (res.status != 200) {
      const resData = await res.json();
      const message = resData.response.message;

      if (message == "Invalid password") {
        setLoginError("password", {
          type: "manual",
          message: "Incorrect password",
        });
      }

      if (message == "Invalid username or email") {
        setLoginError("username", {
          type: "manual",
          message: "Incorrect username",
        });
      }
      return;
    }

    const result = await res.json();
    setToken(result.accessToken);

    if (props.linkAccount && currentUser) {
      const res = await authFetch("/auth/link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: currentUser.id,
        }),
      });

      if (res.status == 200) {
        addNotification(
          "Link your comment to this account successfully!!!",
          NotificationType.SUCCESS,
        );
      } else {
        addNotification(
          "Got error when link these comments to your account, Please try again",
          NotificationType.ERROR,
        );
      }
    }
    const userRawRes = await authFetch("/auth");
    const userRes = await userRawRes.json();

    const user: User = {
      id: userRes.id ?? 0,
      company: userRes.company ?? "",
      name: userRes.name ?? "",
      gender: userRes.gender ?? "",
      role: userRes.roles[0] as Role,
    };

    setUser(user);
    resetLogin();

    if (props.closeDialog) props.closeDialog();

    const currentTime: Date = new Date();
    const hour = currentTime.getHours();
    let greeting = "Hi";

    if (6 <= hour && hour < 14) {
      greeting = "Good Morning";
    }
    if (14 <= hour && hour < 18) {
      greeting = "Good Afternoon";
    }
    if (18 <= hour && hour <= 24) {
      greeting = "Good Evening";
    }
    if (0 <= hour && hour < 6) {
      greeting = "Good Night";
    }

    addNotification("Login Successfully!!!", NotificationType.SUCCESS);
    addNotification(`${greeting}, ${user.name}`);
  };

  const onGoogleLogin = async () => {
    const redirectUri = encodeURIComponent(
      process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI ??
        "http://localhost:7110/api/auth/google-login",
    );
    const scopes = [
      "openid",
      "profile",
      "email",
      "https://www.googleapis.com/auth/user.gender.read",
    ];
    let state: string | null = null;
    if (currentUser != null && props.linkAccount) {
      state = encodeURIComponent(
        JSON.stringify({ link_account: currentUser.id }),
      );
    }
    const scopeParam = encodeURIComponent(scopes.join(" "));
    const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}&response_type=code&scope=${scopeParam}&redirect_uri=${redirectUri}${state != null ? "&state=" + state : ""}`;
    router.push(googleAuthUrl);
  };

  return (
    <Fragment>
      <form
        className="flex flex-col"
        onSubmit={handleLoginSubmit(onLoginFormSubmit)}
      >
        <InputField<LoginFormData>
          name="username"
          required="Username or Email is required"
          placeholder="Username or Email"
          className="mt-0"
          error={loginErrors.username}
          register={registerLogin}
          autoFocus={true}
        ></InputField>
        <InputField<LoginFormData>
          name="password"
          required="Password is required"
          placeholder="Password"
          type="password"
          register={registerLogin}
          error={loginErrors.password}
        ></InputField>
        <div className="flex flex-row-reverse justify-between">
          <Link
            tabIndex={-1}
            href="/"
            style={{
              fontSize: "1rem",
              textDecoration: "underline",
            }}
          >
            Forgot password?
          </Link>
        </div>
        <div className="w-full flex justify-center">
          <LoadingButton
            type="submit"
            isLoading={isSubmit}
            label="Login"
            className="mt-1 bg-(--highlight-button)"
          ></LoadingButton>
        </div>
        <p className="flex justify-center">Or</p>
      </form>
      <div className="w-full flex justify-center flex-col items-center">
        <button
          onClick={onGoogleLogin}
          className="flex flex-row items-center justify-center"
        >
          <Image
            src="/images/Google.png"
            alt="Google_logo"
            height={30}
            width={30}
          ></Image>
          <p className="ml-2">Continue with google</p>
        </button>
        <button
          className="mt-1"
          onClick={() => setShowRegisterForm(true)}
          style={{ border: "none" }}
        >
          <h4>
            <span>Are you new here? </span>
            <span className="text-(--blue)">Create an account</span>
          </h4>
        </button>
      </div>

      <DialogFrame
        title="Register"
        isOpen={isShowRegisterForm}
        onClose={() => setShowRegisterForm(false)}
        style={{
          minWidth: "500px",
          maxWidth: "500px",
        }}
      >
        <RegisterForm
          name={currentUser?.name}
          company={currentUser?.company}
          gender={currentUser?.gender}
          closeDialog={() => setShowRegisterForm(false)}
          onRegisterSuccess={(data: RegisterFormData) => {
            setLoginValue("username", data.username);
          }}
        />
      </DialogFrame>
    </Fragment>
  );
}
