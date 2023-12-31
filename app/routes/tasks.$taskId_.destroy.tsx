import { ActionFunctionArgs, redirect } from "@remix-run/node";
import invariant from "tiny-invariant";
import { deleteTask } from "../lib/data";

export const action = async ({ params }: ActionFunctionArgs) => {
  invariant(params.taskId, "Missing taskId param");
  await deleteTask(params.taskId);
  return redirect(`/`);
};
