import { useForm } from "react-hook-form";
import { TextAreaField } from "../form/text_area.field";
import { authFetch } from "@/helpers/authFetch";
import { useTranslation } from "react-i18next";

interface NewCommentFormData {
  content: string;
}

interface NewCommentFormProps {
  onSubmit?: (content: string) => void;
}

export const NewCommentForm = (props: NewCommentFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewCommentFormData>();

  const onFormSubmit = (data: NewCommentFormData) => {
    if (props.onSubmit) props.onSubmit(data.content);

    authFetch("/comment/auth", {
      method: "POST",
      body: JSON.stringify({
        content: data.content,
      }),
    });
  };

  const { t } = useTranslation("common");

  return (
    <form onSubmit={handleSubmit(onFormSubmit)}>
      <TextAreaField<NewCommentFormData>
        name="content"
        register={register}
        placeholder={t("New comment")}
        className="w-[600px] h-[300px]"
        required={t("Comment is required")}
        error={errors.content}
      ></TextAreaField>
      <div className="w-full flex justify-end mt-2">
        <button type="submit" className="bg-(--highlight-button)">
          <p>{t("Send")}</p>
        </button>
      </div>
    </form>
  );
};
