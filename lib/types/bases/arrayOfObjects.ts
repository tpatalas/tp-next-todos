import { TypesTodoIds } from '@components/todos/todos.types';
import { OBJECT_ID } from '@constAssertions/data';
import { LabelIds } from '@label/label.types';

export type CollectTypesArrayObject = Settings & TypesGlobals & TypesMongoDB;

// GlobalTypes
export interface TypesGlobals {
  itemIds: TypesTodoIds | LabelIds;
  data: unknown;
  matchingId: OBJECT_ID;
}

export interface TypesMongoDB {
  notEqual: { $ne: boolean };
  greaterThan: { $gt: number };
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
