import { ColumnDef } from "@tanstack/react-table";

export type UserRole =
  | "Administrator"
  | "Sales Manager"
  | "Sales Representative";

export interface User {
  id: string;
  fullName: string;
  email: string;
  role: UserRole;
  password: string;
}

export type UserDialogType = "edit" | "new";
