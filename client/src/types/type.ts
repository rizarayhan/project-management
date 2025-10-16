export interface Project {
  _id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: string;
  completed: string;
  tags: string[];
  collaborators: Collaborator[];
  owner: {
    _id: string;
    name: string;
    email: string;
  };
  totalJobsCount: number;
  completedJobsCount: number;
  percentageCompleted: number;
}

export interface Collaborator {
  _id: string;
  name: string;
  email: string;
}

export interface Invitations {
  _id: string;
  status: string;
  receiver: {
    email: string;
    name: string;
    _id: string;
  };
  sender: {
    name: string;
    email: string;
  };
  project: {
    title: string;
    description: string;
    dueDate: string;
  };
  createdAt: string;
}
