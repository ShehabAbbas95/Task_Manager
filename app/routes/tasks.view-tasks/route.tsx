import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import Card from "~/routes/tasks.view-tasks/card";
import { getTasks } from "~/lib/data";

export const loader = async () => {
  const tasks = await getTasks();
  return json({ tasks });
};

function ViewTasks() {
  const { tasks } = useLoaderData<typeof loader>();

  return (
    <div className="flex flex-row p-8 gap-4">
      {tasks.length ? (
        tasks.map((task) => (
          <Card key={task.id} task={task} />
        ))
      ) :
        (<p>You didn't add any tasks yet </p>)
      }
    </div>
  );
}

export default ViewTasks;
