import { useForm } from "react-hook-form";
import { TextAreaField } from "../form/text_area.field";
import { useTranslation } from "react-i18next";
import { Comment } from "@/models/comment.model";

export interface EditCommentFormData {
  newContent: string;
}

interface EditCommentFormProps {
  comment: Comment;
  onEditComment: (data: EditCommentFormData) => void;
}

export const EditCommentForm = (props: EditCommentFormProps) => {
  const {
    register: editRegister,
    handleSubmit,
    formState: { errors: editErrors },
  } = useForm<EditCommentFormData>({
    defaultValues: {
      newContent: props.comment.content,
    },
  });

  const { t } = useTranslation(["home", "common"]);

  return (
    <form onSubmit={handleSubmit(props.onEditComment)}>
      <TextAreaField<EditCommentFormData>
        register={editRegister}
        name="newContent"
        placeholder={t("Input new content")}
        error={editErrors.newContent}
        required={t("New content is required")}
        className="lg:w-[800px] h-[500px]"
      ></TextAreaField>
      <div className="flex flex-row justify-end">
        <button type="submit" className="bg-(--highlight-button) mt-2">
          {t("Send", { ns: "common" })}
        </button>
      </div>
    </form>
  );
};
