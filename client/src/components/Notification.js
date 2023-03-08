import { useSelector } from "react-redux";
import { Alert, AlertTitle } from "@mui/material";

const Notification = () => {
  const notification = useSelector((state) => state.notification);

  if (notification === null) {
    return null;
  }

  return (
    <>
      <Alert severity={notification.type === "error" ? "error" : "success"}>
        <AlertTitle>{notification.type === "error" ? `Error: ${notification.message}` : notification.message}</AlertTitle>
      </Alert>
    </>
  );
};

export default Notification;
