import { useForm } from "react-hook-form";
import { TextAreaField } from "../form/text_area.field";
import { authFetch } from "@/helpers/authFetch";

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

  const onFormSubmit = async (data: NewCommentFormData) => {
    if (props.onSubmit) props.onSubmit(data.content);

    authFetch("/comment/auth", {
      method: "POST",
      body: JSON.stringify({
        content: data.content,
      }),
    });
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)}>
      <TextAreaField<NewCommentFormData>
        name="content"
        register={register}
        placeholder="New comment"
        className="w-[600px] h-[300px]"
        required="Comment is required"
        error={errors.content}
      ></TextAreaField>
      <div className="w-full flex justify-end mt-2">
        <button type="submit" className="bg-(--highlight-button)">
          <p>Send</p>
        </button>
      </div>
    </form>
  );
};
