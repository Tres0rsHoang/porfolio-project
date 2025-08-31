"use client";

import { nanoid } from "nanoid";
import { create } from "zustand";

export enum NotificationType {
  SUCCESS = "success",
  ERROR = "error",
  INFO = "info",
}

export interface Notification {
  id: string;
  message: string;
  type?: NotificationType;
  duration?: number;
}

interface NotificationState {
  notifications: Notification[];
  addNotification: (
    message: string,
    type?: NotificationType,
    duration?: number,
  ) => void;
  clearNotification: (id: string) => void;
}

export const useNotication = create<NotificationState>((set) => ({
  notifications: [],
  addNotification: (
    message: string,
    type = NotificationType.INFO,
    duration = 5000,
  ) => {
    const id = nanoid();
    set((state) => ({
      notifications: [
        ...state.notifications,
        { id: id, message, type, duration },
      ],
    }));

    setTimeout(() => {
      set((state) => ({
        notifications: state.notifications.filter((n) => n.id != id),
      }));
    }, duration);
  },
  clearNotification: (id: string) => {
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id != id),
    }));
  },
}));
