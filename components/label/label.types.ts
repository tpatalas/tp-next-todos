import { OBJECT_ID } from "@constAssertions/data";
import { TypesMongoDB } from "@lib/types";

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
