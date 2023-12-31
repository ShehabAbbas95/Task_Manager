import { Form, useNavigate } from "@remix-run/react";
import { createEmptyContact } from "../data";

export const action = async () => {
  const contact = await createEmptyContact();
  // return redirect(`/contacts/${contact.id}/edit`);
};

export default function AddTask() {
  const navigate = useNavigate();
  return (
    <div className="flex justify-center">
      <Form className="my-4" id="contact-form" method="post">
        <p>Title</p>
        <input
          className="border-2"
          aria-label="Title"
          name="title"
          type="text"
          placeholder="title"
        />

        <p>Description</p>
        <p>
          <textarea className="border-2" name="desc" rows={6} />
        </p>
        <div className="px-2 flex gap-4">
          <button
            className="bg-blue-600 border-2 px-2 rounded-lg"
            type="submit"
          >
            Add Task
          </button>
          <button
            className="bg-red-600 border-2 px-4 rounded-lg"
            type="button"
            onClick={() => navigate(-1)}
          >
            Cancel
          </button>
        </div>
      </Form>
    </div>
  );
}
