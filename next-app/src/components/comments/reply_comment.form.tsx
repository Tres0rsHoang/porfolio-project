import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { TextAreaField } from "../form/text_area.field";

export interface ReplyCommentFormData {
  content: string;
}

interface ReplyCommentFormProps {
  onSubmit: (data: ReplyCommentFormData) => void;
}

export const ReplyCommentForm = (props: ReplyCommentFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ReplyCommentFormData>();

  const { t } = useTranslation(["home", "common"]);

  return (
    <form onSubmit={handleSubmit(props.onSubmit)}>
      <TextAreaField
        name="content"
        placeholder={t("Input new content")}
        register={register}
        required={t("New content is required")}
        error={errors.content}
        className="w-[800px] h-[500px]"
      ></TextAreaField>
      <div className="flex flex-row justify-end">
        <button type="submit" className="bg-(--highlight-button) mt-2">
          {t("Send", { ns: "common" })}
        </button>
      </div>
    </form>
  );
};
