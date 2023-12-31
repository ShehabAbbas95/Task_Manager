import { Form, useNavigate } from "@remix-run/react";
import { addNewTask } from "../lib/data";
import { ActionFunctionArgs, redirect } from "@remix-run/node";
import Button from "../Components/UI/Button";

export const action = async ({ request }: ActionFunctionArgs) => {
  // Get the form data
  const formData = await request.formData();
  // Extract the task details from the form data
  const details = Object.fromEntries(formData);
  await addNewTask(details);
  return redirect(`/tasks/viewTasks`);
};
export const inputsStyle =
  "text-white mb-5 bg-gray-100 border border-gray-300  text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500 ";

export default function AddTask() {
  const navigate = useNavigate();
  return (
    <div className="flex justify-center">
      <Form className="my-4" id="contact-form" method="post">
        <p>Title</p>

        <input
          type="text"
          aria-label="Title"
          name="title"
          className={inputsStyle}
        />
        <p>Description</p>
        <p>
          <textarea className={inputsStyle} name="description" rows={6} />
        </p>
        <div className="px-2 flex gap-4">
          <Button type="submit" color="blue">
            Add Task
          </Button>
          <Button type="button" color="red" onClick={() => navigate("/")}>
            Cancel
          </Button>
        </div>
      </Form>
    </div>
  );
}
