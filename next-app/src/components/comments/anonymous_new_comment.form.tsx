import { useForm } from "react-hook-form";
import { InputField } from "../form/input.field";
import SelectionField from "../form/selection.field";
import { TextAreaField } from "../form/text_area.field";
import { Fragment } from "react";
import { NewComment } from "./comments_section";
import { User } from "@/models/user.model";

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
        <h3>Your information</h3>
        <InputField<NewCommentData>
          name="name"
          placeholder="Your name"
          register={register}
          required="Name is required"
          error={errors.name}
          autoFocus={true}
        ></InputField>
        <InputField<NewCommentData>
          name="company"
          placeholder="Your company (optional)"
          register={register}
          error={errors.company}
        ></InputField>
        <SelectionField<NewCommentData>
          name="gender"
          label="Gender"
          register={register}
          className="flex flex-row justify-between mt-2"
          options={[
            {
              label: "Male",
              value: "male",
            },
            {
              label: "Female",
              value: "female",
            },
          ]}
        ></SelectionField>
        <h3>Comment</h3>
        <TextAreaField<NewCommentData>
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
    </Fragment>
  );
}
