import { ReactNode } from "react";

export interface ITab {
  tabName: string | ReactNode;
  children: ReactNode;
}
