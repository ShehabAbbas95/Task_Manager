import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  json,
  redirect,
} from "@remix-run/node";
import invariant from "tiny-invariant";
import { getTask, updateTask } from "../lib/data";
import { Form, useLoaderData, useNavigate } from "@remix-run/react";
import { inputsStyle } from "./tasks.add-task";
import Button from "../Components/UI/Button";
import { useState } from "react";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  invariant(params.taskId, "Missing contactId param");

  const task = await getTask(params.taskId);
  if (!task) {
    throw new Response("Not Found", { status: 404 });
  }

  return json({ task });
};

export const action = async ({ params, request }: ActionFunctionArgs) => {
  invariant(params.taskId, "Missing taskId param");

  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  await updateTask(params.taskId, updates);

  return redirect(`/tasks/${params.taskId}`);
};

export default function TaskEdit() {
  const { task } = useLoaderData<typeof loader>();

  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);

  const navigate = useNavigate();

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  return (
    <div className="mt-5 my-4">
      <Form className="max-w-lg mx-auto" method="post">
        <p className="font-bold text-2xl">Task</p>
        <input
          type="text"
          name="title"
          aria-label="Task Name"
          className={inputsStyle}
          value={title}
          onChange={handleTitleChange}
        />
        <p className="font-bold text-2xl">Description</p>
        <textarea
          className={inputsStyle}
          name="description"
          rows={6}
          value={description}
          onChange={handleDescriptionChange}
        />
        <p className="flex font-bold text-2xl gap-6">
          Status: <span>{task.createdAt}</span>
        </p>
        <div className="flex gap-4 justify-center mt-6">
          <Button type="submit" color="green">
            Save
          </Button>

          <Button onClick={() => navigate(-1)} type="button" color="red">
            Cancel
          </Button>
        </div>
      </Form>
    </div>
  );
}
