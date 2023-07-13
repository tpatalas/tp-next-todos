import { OBJECT_ID } from '@constAssertions/data';
import { PRIORITY_LEVEL } from '@constAssertions/misc';
import { Labels } from '@label/label.types';
import { TypesMongoDB } from '@lib/types';
import { ReactNode } from 'react';

export interface TypesTodo {
  todoItem: TypesTodos;
  todo: TypesTodoIds;
  index: number;
}

export interface TypesTodosEditors {
  title: string;
  note: string;
}

export interface TypesTodoIds {
  _id?: OBJECT_ID;
  completed?: boolean;
  priorityLevel?: PRIORITY_LEVEL | null;
  priorityRankScore?: number;
  completedDate?: Date | null;
  deleted?: boolean | TypesMongoDB['notEqual'];
  update?: number | TypesMongoDB['greaterThan'];
}

export interface TypesTodos extends TypesTodosEditors, TypesTodoIds {
  createdDate: Date;
  dueDate: Date | null;
  completedDate: Date | null;
  labelItem: Labels[];
  title_id?: OBJECT_ID;
  user_id?: OBJECT_ID;
}

export type PropsTodo = Pick<TypesTodo, 'todo'> & Partial<Pick<TypesTodo, 'index'>>;

export type PropsTodoItemFocuser = Pick<TypesTodo, 'todo' | 'index'> & { children: ReactNode };
