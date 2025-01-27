export interface ActionState {
  message: string;
  status?: "idle" | "warning" | "success" | "error";
  errors?: {
    [key: string]: string;
  };
  data?: null | object;
}
