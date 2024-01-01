import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import { LinksFunction, LoaderFunctionArgs, json } from "@remix-run/node";
import stylesheet from "./tailwind.css";
import toast, { Toaster } from "react-hot-toast";
import { getToast } from "remix-toast";
import { useEffect } from "react";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const toastData = await getToast(request);
  return json(toastData.toast);
};
export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
];

export default function App() {
  const toastData = useLoaderData<typeof loader>();
  useEffect(() => {
    // Check if toastData is not null and not undefined
    if (toastData) {
      switch (toastData.type) {
        case "success":
          toast.success(toastData.message);
          return;
        case "error":
          toast.error(toastData.message);
          break;
        default:
          break;
      }
    }
  }, [toastData]);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Toaster />
        <div className="mt-6 ">
          <h1 className="font-bold text-center text-3xl">Task Manager</h1>
          <nav>
            <ul className="flex flex-row justify-center gap-5 mt-6">
              <li>
                <Link
                  to={`/tasks/addTask`}
                  className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
                >
                  Add New Task
                </Link>
              </li>
              <li>
                <Link
                  to={`/tasks/viewTasks`}
                  className="bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-green-500 rounded"
                >
                  View All Tasks
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <div id="detail">
          <Outlet />
        </div>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
