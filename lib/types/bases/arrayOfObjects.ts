import { OBJECT_ID } from '@constAssertions/data';
import { PRIORITY_LEVEL } from '@constAssertions/misc';

export type CollectTypesArrayObject = Todos & TypesTodo & Labels & TypesLabel & Settings & TypesGlobals & TypesMongoDB;

// GlobalTypes
export interface TypesGlobals {
  itemIds: TodoIds | LabelIds;
  data: unknown;
  matchingId: OBJECT_ID;
}

export interface TypesMongoDB {
  notEqual: { $ne: boolean };
  greaterThan: { $gt: number };
}

// Todos
export interface Todos extends TodosEditors, TodoIds {
  createdDate: Date;
  dueDate: Date | null;
  completedDate: Date | null;
  labelItem: Labels[];
  title_id?: OBJECT_ID;
  user_id?: OBJECT_ID;
}

export interface TodoIds {
  _id?: OBJECT_ID;
  completed?: boolean;
  priorityLevel?: PRIORITY_LEVEL | null;
  priorityRankScore?: number;
  completedDate?: Date | null;
  deleted?: boolean | TypesMongoDB['notEqual'];
  update?: number | TypesMongoDB['greaterThan'];
}

export interface TodosEditors {
  title: string;
  note: string;
}

export interface TypesTodo {
  todoItem: Todos;
  todo: TodoIds;
  index: number;
}

// Labels
export interface Labels extends LabelIds {
  parent_id?: OBJECT_ID;
  title_id?: OBJECT_ID[];
  user_id?: OBJECT_ID;
  name: string;
  color?: string;
}

export interface LabelIds {
  _id?: OBJECT_ID;
  deleted?: boolean | TypesMongoDB['notEqual'];
  update?: number | TypesMongoDB['greaterThan'];
}

export interface TypesLabel {
  label: Labels;
  selectedQueryLabels: Labels[];
}
// Users
export interface Users extends UsersIds {
  email: string;
  password: string;
}

export interface UsersIds {
  _id?: OBJECT_ID;
}

//* Users Settings
export interface Settings extends SettingsIds {
  createdDate: Date;
  taskCapacityPerDay: number;
  userId?: OBJECT_ID;
}

export interface SettingsIds {
  _id?: OBJECT_ID;
}
