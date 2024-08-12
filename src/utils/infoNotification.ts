import { toast } from "react-toastify";

export const infoNotifiication = (msg: string) =>
  toast.info(msg, { position: "bottom-right", draggable: true });
