import { useEffect } from "react";

const ShowToast = ({ message, duration = 3000, isSuccess, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div className="toast toast-top toast-center">
      <div className={`alert ${isSuccess ? "alert-info" : "alert-error"}`}>
        <span>{message}</span>
      </div>
    </div>
  );
};

export default ShowToast;
