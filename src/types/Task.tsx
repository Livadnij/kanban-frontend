export interface Task {
  id: string;
  title: string;
  description: string;
}

export type ItemState = "to_do" | "in_progress" | "done";
