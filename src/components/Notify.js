import { toast } from "react-toastify";

export default (text) =>
  toast.info(text, {
    position: "bottom-center",
    autoClose: 1000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
