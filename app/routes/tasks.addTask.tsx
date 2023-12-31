import { Form, useNavigate } from "@remix-run/react";
import { addNewTask } from "../data";
import { ActionFunctionArgs, redirect } from "@remix-run/node";

export const action = async ({ request }: ActionFunctionArgs) => {
  // Get the form data
  const formData = await request.formData();
  // Extract the task details from the form data
  const details = Object.fromEntries(formData);
  await addNewTask(details);
  return redirect(`/`);
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
          <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
            Add Task
          </button>
          <button
            onClick={() => navigate(-1)}
            className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded"
          >
            Cancel
          </button>
        </div>
      </Form>
    </div>
  );
}
