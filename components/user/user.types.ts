import { OBJECT_ID } from '@constAssertions/data';

// Users
export interface Users extends UsersIds {
  email: string;
}

export interface UsersIds {
  _id?: OBJECT_ID;
}
