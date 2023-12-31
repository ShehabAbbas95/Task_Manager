import { Link } from "@remix-run/react";
import { TaskRecord } from "../../lib/data";

interface CardProps {
  task: TaskRecord;
}
function Card({ task }: CardProps) {
  return (
    <div className="max-w-40 min-w-40 p-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 pl-4">
      <h5 className="mb-2 overflow-hidden  text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {task.title}
      </h5>
      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 overflow-hidden min-h-12 max-h-12 ">
        {task.description}
      </p>
      <Link
        to={`/tasks/${task.id}`}
        className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Read more
        <svg
          className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 10"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M1 5h12m0 0L9 1m4 4L9 9"
          />
        </svg>
      </Link>
    </div>
  );
}

export default Card;
