type Task = {
  id: string;
  title: string;
  description: string;
};

type Board = {
  _id: string;
  name: string;
  to_do: Task[];
  in_progress: Task[];
  done: Task[];
};

type Item = {
  origin: ItemStatus;
  destination: ItemStatus;
  id: string;
};


type CreatedBoardResponse = {
  id: string;
};

type ItemStatus = "to_do" | "in_progress" | "done";