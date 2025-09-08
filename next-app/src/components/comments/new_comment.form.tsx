import { useForm } from "react-hook-form";
import { TextAreaField } from "../form/text_area.field";
import { useTranslation } from "react-i18next";
import { useSendAuthNewComment } from "@/hooks/useSendNewComment";

interface NewCommentFormData {
  content: string;
}

interface NewCommentFormProps {
  onSubmit?: () => void;
}

export const NewCommentForm = (props: NewCommentFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewCommentFormData>();

  const sendAuthCommentQuery = useSendAuthNewComment();

  const onFormSubmit = (data: NewCommentFormData) => {
    sendAuthCommentQuery.mutate(data.content, {
      onSuccess: props.onSubmit,
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
