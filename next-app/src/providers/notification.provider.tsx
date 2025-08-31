"use client";

import {
  Notification,
  NotificationType,
  useNotication,
} from "@/store/notification.store";
import { useSocket } from "@/store/socket.store";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";

export const NotificaionProvider = () => {
  const { notifications, addNotification, clearNotification } = useNotication();
  const { socket, connect, disconnect } = useSocket();

  const handleNotificationClick = (notification: Notification) => {
    clearNotification(notification.id);
  };

  useEffect(() => {
    connect();
    socket?.on("newNotificaion", (msg: string) => {
      addNotification(msg);
    });
    return () => {
      disconnect();
    };
  }, [connect, disconnect, socket, addNotification]);

  return (
    <div className="fixed top-20 right-6 flex flex-col gap-3 z-50">
      <AnimatePresence>
        {notifications.map((n: Notification) => (
          <motion.div
            key={n.id}
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.3 }}
            className={`px-4 py-2 rounded-lg shadow-lg border-2 border-s-black max-w-sm ${
              n.type == NotificationType.SUCCESS
                ? "bg-green-400"
                : n.type == NotificationType.ERROR
                  ? "bg-red-400"
                  : "bg-(--semi-highlight)"
            }`}
            onClick={() => handleNotificationClick(n)}
          >
            <h3>{n.message}</h3>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
