"use client";

import { useUserStore } from "@/store/user.store";
import styles from "./login_info.module.css";
import { DialogFrame } from "../dialog/dialog_frame";
import { useAuthStore } from "@/store/auth.store";
import LoginForm from "./login.form";
import { useState } from "react";
import { useLogout } from "@/hooks/useLogout";
import { LoadingButton } from "../loading/loading_button";
import { I18nextProvider, useTranslation } from "react-i18next";
import i18n from "@/helpers/i18n";
import { useWindowSize } from "@/hooks/useWindowSize";
import Image from "next/image";

export default function LoginInfo() {
  const { commented } = useUserStore();
  const { accessToken } = useAuthStore();
  const { mutate: logout, isPending } = useLogout();
  const { width } = useWindowSize();
  const [isShowLogin, setShowLogin] = useState<boolean>(false);
  const { t } = useTranslation("common");

  return (
    <I18nextProvider i18n={i18n}>
      <div className="absolute top-5 right-5">
        {!accessToken ? (
          <div className="flex flex-col items-end">
            <button
              onClick={() => {
                setShowLogin(true);
              }}
              className={`bg-(--highlight-button) ${styles.detailButton}`}
            >
              {width && width < 1230 ? (
                <Image
                  src="/images/LoginIcon.png"
                  alt="LoginIcon"
                  height={30}
                  width={30}
                  className="my-1"
                ></Image>
              ) : (
                <h3>{commented ? t("Manage your comment") : t("Login")}</h3>
              )}
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
        title={t("Login")}
        isOpen={isShowLogin}
        onClose={() => setShowLogin(false)}
        closeOnBackgroundClick={width && width < 1230 ? false : true}
      >
        <LoginForm
          linkAccount={commented}
          closeDialog={() => setShowLogin(false)}
        />
      </DialogFrame>
    </I18nextProvider>
  );
}
