export interface GoogleLogin {
  access_token: string;
}

export interface GoogleLoginUser {
  id: string;
  email: string;
  name: string;
  picture: string;
}

export interface GoogleLoginGender {
  genders:
    | Array<{
        value: string;
        formattedValue: string;
      }>
    | undefined;
}
