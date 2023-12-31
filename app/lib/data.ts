////////////////////////////////////////////////////////////////////////////////
// 🛑 Nothing in here has anything to do with Remix, it's just a fake database
////////////////////////////////////////////////////////////////////////////////

import { matchSorter } from "match-sorter";
// @ts-expect-error - no types, but it's a tiny function
import sortBy from "sort-by";
import invariant from "tiny-invariant";

export type TaskDetails = {
  title?: string;
  description?: string;
  status?: "Inprogress" | "Completed" | "Postponed";
};

export type TaskRecord = TaskDetails & {
  id: string;
  createdAt: string;
};

////////////////////////////////////////////////////////////////////////////////
// This is just a fake DB table. In a real app you'd be talking to a real db or
// fetching from an existing API.
const fakeTasks = {
  records: {} as Record<string, TaskRecord>,

  async getAll(): Promise<TaskRecord[]> {
    return Object.keys(fakeTasks.records)
      .map((key) => fakeTasks.records[key])
      .sort(sortBy("-createdAt", "last"));
  },

  async get(id: string): Promise<TaskRecord | null> {
    return fakeTasks.records[id] || null;
  },

  async create(values: TaskDetails): Promise<TaskRecord> {
    const id = Math.random().toString(36).substring(2, 9);
    const createdAt = new Date().toISOString();
    const newTask = { id, createdAt, ...values };
    fakeTasks.records[id] = newTask;
    return newTask;
  },

  async set(id: string, values: TaskDetails): Promise<TaskRecord> {
    const task = await fakeTasks.get(id);
    invariant(task, `No task found for ${id}`);
    const updatedTask = { ...task, ...values };
    fakeTasks.records[id] = updatedTask;
    return updatedTask;
  },

  destroy(id: string): null {
    delete fakeTasks.records[id];
    return null;
  },
};

////////////////////////////////////////////////////////////////////////////////
// Handful of helper functions to be called from route loaders and actions
export async function getTasks(query?: string | null) {
  // await new Promise((resolve) => setTimeout(resolve, 500));
  let contacts = await fakeTasks.getAll();
  if (query) {
    contacts = matchSorter(contacts, query, {
      keys: ["first", "last"],
    });
  }
  return contacts.sort(sortBy("last", "createdAt"));
}

export async function addNewTask(taskDetails: TaskDetails) {
  const contact = await fakeTasks.create(taskDetails);
  return contact;
}

export async function getTask(id: string) {
  return fakeTasks.get(id);
}

export async function updateTask(id: string, updates: TaskDetails) {
  const task = await fakeTasks.get(id);
  if (!task) {
    throw new Error(`No task found for ${id}`);
  }
  await fakeTasks.set(id, { ...task, ...updates });
  return task;
}

export async function deleteTask(id: string) {
  fakeTasks.destroy(id);
}

[
  {
    id: 1,
    title: "asydgyias",
    description: "auisdiasiudg",
  },
];
// .forEach((contact) => {
//   fakeContacts.create({
//     ...contact,
//     id: `${contact.first.toLowerCase()}-${contact.last.toLocaleLowerCase()}`,
//   });
// });
