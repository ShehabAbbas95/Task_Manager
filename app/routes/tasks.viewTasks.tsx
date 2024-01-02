import { json } from "@remix-run/node";
import { getTasks } from "../lib/data";
import { useLoaderData } from "@remix-run/react";
import Card from "../Components/UI/Card";

export const loader = async () => {
  const tasks = await getTasks();
  return json({ tasks });
};

function ViewTasks() {
  const { tasks } = useLoaderData<typeof loader>();
  console.log(tasks);
  return (
    <div className="flex flex-row p-8 gap-4">
      {tasks.length ? (
        tasks.map((task) => (
         
          <Card key={task.id} task={task} />
        ))
      ) : (
        // eslint-disable-next-line react/no-unescaped-entities
        <p>You didn't add any tasks yet </p>
      )}
    </div>
  );
}

export default ViewTasks;
