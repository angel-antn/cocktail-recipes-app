import { toast } from "react-toastify";

export const successNotifiication = (msg: string) =>
  toast.success(msg, { draggable: true });
