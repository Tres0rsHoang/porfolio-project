import { useForm } from "react-hook-form";
import { InputField } from "../form/input.field";
import SelectionField from "../form/selection.field";
import { TextAreaField } from "../form/text_area.field";
import { Fragment } from "react";
import { User } from "@/models/user.model";
import { NewComment } from "@/hooks/useSendNewComment";
import { useTranslation } from "react-i18next";

interface NewCommentData {
  name: string;
  gender: string;
  company: string;
  content: string;
}

interface AnonymousNewCommentFormProps {
  onSubmit: (data: NewComment) => void;
  user: User | null;
}

export default function AnonymousNewCommentForm(
  props: AnonymousNewCommentFormProps,
) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewCommentData>({
    defaultValues: {
      name: props.user?.name,
      company: props.user?.company,
      gender: props.user != null && !props.user.gender ? "female" : "male",
    },
  });
  const { t } = useTranslation("common");

  const onFormSubmit = (data: NewCommentData) => {
    props.onSubmit({
      user: {
        name: data.name,
        gender: data.gender == "male" ? true : false,
        company: data.company,
      },
      content: data.content,
    });
  };

  return (
    <Fragment>
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <h3>{t("Your information")}</h3>
        <InputField<NewCommentData>
          name="name"
          placeholder={t("Your name")}
          register={register}
          required={t("Name is required")}
          error={errors.name}
          autoFocus={true}
        ></InputField>
        <InputField<NewCommentData>
          name="company"
          placeholder={t("Your company (optional)")}
          register={register}
          error={errors.company}
        ></InputField>
        <SelectionField<NewCommentData>
          name="gender"
          label={t("Gender")}
          register={register}
          className="flex flex-row space-x-5 mt-2"
          options={[
            {
              label: t("Male"),
              value: "male",
            },
            {
              label: t("Female"),
              value: "female",
            },
          ]}
        ></SelectionField>
        <h3>{t("Comment")}</h3>
        <TextAreaField<NewCommentData>
          name="content"
          register={register}
          placeholder={t("New comment")}
          className="sm:w-[600px] sm:h-[300px] h-48"
          required={t("Comment is required")}
          error={errors.content}
        ></TextAreaField>
        <div className="w-full flex justify-end mt-2">
          <button type="submit" className="bg-(--highlight-button)">
            <p>{t("Send")}</p>
          </button>
        </div>
      </form>
    </Fragment>
  );
}
