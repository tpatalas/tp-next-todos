import { OBJECT_ID } from '@constAssertions/data';
import { PRIORITY_LEVEL } from '@constAssertions/misc';
import { LabelIds, Labels } from '@label/label.types';

export type CollectTypesArrayObject = Todos & TypesTodo & Settings & TypesGlobals & TypesMongoDB;

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

//* Users Settings
export interface Settings extends SettingsIds {
  createdDate: Date;
  taskCapacityPerDay: number;
  userId?: OBJECT_ID;
}

export interface SettingsIds {
  _id?: OBJECT_ID;
}
