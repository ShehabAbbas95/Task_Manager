import { Link } from "@remix-run/react";

const Index: React.FC = () => (
  <div className="mt-6 ">
    <h1 className="font-bold text-center text-3xl">Task Manager</h1>
    <nav>
      <ul className="flex flex-row justify-center gap-5 mt-6">
        <li>
          <Link
            to={`/tasks/add-task`}
            className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
          >
            Add New Task
          </Link>
        </li>
        <li>
          <Link
            to={`/tasks/view-tasks`}
            className="bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-green-500 rounded"
          >
            View All Tasks
          </Link>
        </li>
      </ul>
    </nav>
  </div>
);

export default Index;
