"use client";

import { useUserStore } from "@/store/user.store";
import styles from "./login_info.module.css";
import { DialogFrame } from "../dialog/dialog_frame";
import { useAuthStore } from "@/store/auth.store";
import LoginForm from "./login.form";
import { Fragment, useEffect, useState } from "react";
import { useLogout } from "@/hooks/useLogout";
import { LoadingButton } from "../loading/loading_button";

export default function LoginInfo() {
  const { commented } = useUserStore();
  const { accessToken, ensureToken } = useAuthStore();
  const { mutate: logout, isPending } = useLogout();

  const [isShowLogin, setShowLogin] = useState<boolean>(false);

  useEffect(() => {
    ensureToken();
  }, [ensureToken]);

  return (
    <Fragment>
      <div className="absolute top-5 right-5">
        {!accessToken ? (
          <div className="flex flex-col items-end">
            <button
              onClick={() => {
                setShowLogin(true);
              }}
              className={`bg-(--highlight-button) ${styles.detailButton}`}
            >
              <h3>{commented ? "Link your comment" : "Login"}</h3>
            </button>
          </div>
        ) : (
          <div className="flex flex-row">
            <LoadingButton
              isLoading={isPending}
              label={"Logout"}
              onClick={() => logout()}
            ></LoadingButton>
          </div>
        )}
      </div>
      <DialogFrame
        title="Login"
        isOpen={isShowLogin}
        onClose={() => setShowLogin(false)}
      >
        <LoginForm
          linkAccount={commented}
          closeDialog={() => setShowLogin(false)}
        />
      </DialogFrame>
    </Fragment>
  );
}
