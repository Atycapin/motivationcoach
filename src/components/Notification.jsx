import React, { useEffect } from "react";

const Notification = ({ message, onDismiss }) => {
  useEffect(() => {
    const timer = setTimeout(onDismiss, 5000);
    return () => clearTimeout(timer);
  }, [onDismiss]);

  return (
    <div className="fixed bottom-5 right-5 z-50 bg-gray-800 text-white p-4 rounded-lg shadow-2xl animate-slide-in-up max-w-sm">
      <p>{message}</p>
    </div>
  );
};

export default Notification;
