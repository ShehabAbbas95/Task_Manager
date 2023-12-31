import { LoaderFunctionArgs, json } from "@remix-run/node";
import invariant from "tiny-invariant";
import { getTask } from "../lib/data";
import { Form, Link, useLoaderData } from "@remix-run/react";
import { inputsStyle } from "./tasks.addTask";
import Button from "~/Components/UI/Button";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  invariant(params.taskId, "Missing contactId param");
  const task = await getTask(params.taskId);
  if (!task) {
    throw new Response("Not Found", { status: 404 });
  }
  return json({ task });
};

export default function TaskDetails() {
  const { task } = useLoaderData<typeof loader>();

  return (
    <div className="mt-5 max-w-lg mx-auto">
      <p className="font-bold text-2xl">Task</p>
      <input
        type="text"
        aria-label="Task Name"
        className={inputsStyle}
        value={task.title}
        disabled
      />
      <p className="font-bold text-2xl">Description</p>
      <textarea
        className={inputsStyle}
        name="description"
        rows={6}
        disabled
        value={task.description}
      />
      <p className="flex font-bold text-2xl gap-6">
        Status: <span>{task.createdAt}</span>
      </p>
      <p className="flex font-bold text-2xl gap-6 mb-4">
        Created At: <span>{task.createdAt}</span>
      </p>
      <div className="flex gap-6 justify-center">
        <Link
          to={`/tasks/${task.id}/edit`}
          className="bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-green-500 rounded"
        >
          Edit
        </Link>
        <Form
          action="destroy"
          method="post"
          onSubmit={(event) => {
            const response = confirm(
              "Please confirm you want to delete this record."
            );
            if (!response) {
              event.preventDefault();
            }
          }}
        >
          <Button type="submit" color="red">
            Delete
          </Button>
        </Form>
      </div>
    </div>
  );
}
