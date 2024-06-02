import { rename, unlink } from "fs/promises";
import path from "path";

export enum GENDER {
  MALE = "male",
  FEMALE = "female",
}

export enum BLOOD_GROUP {
  "A+" = "A+",
  "B+" = "B+",
  "A-" = "A-",
  "B-" = "B-",
  "AB+" = "AB+",
  "O+" = "O+",
  "O-" = "O-",
}

export enum MARITAL_STATUS {
  MARRIED = "married",
  UNMARRIED = "unmarried",
  DIVORCED = "divorced",
}

export const COMPLEXION = {
  Ivory: '#ffe5c4',
  Beige: '#ffc37d',
  Limestone: '#fbc191',
  Sand: '#ffda96',
  Umber: '#ca6740',
  Sienna: '#e79e7b',
  Almond: '#a35f30',
  Bisque: '#ffe4c4',
  Teak: '#db9d58',
  Brown: '#c48a47',
  DarkBrown: '#a66a2e',
  Espresso: '#6b2e02',
  Chocolate: '#2a1001',
  Black: '#311400',
}
export const LOGIN_DURATION = 3_600_000 * 4;
