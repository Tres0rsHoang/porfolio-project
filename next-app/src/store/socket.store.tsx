import { io, Socket } from "socket.io-client";
import { create } from "zustand";

interface SocketState {
  socket: Socket | null;
  connect: () => void;
  disconnect: () => void;
}
export const useSocket = create<SocketState>((set, get) => ({
  socket: null,
  connect: () => {
    const currentSocket = get().socket;
    if (currentSocket) return;
    const socket = io(process.env.NEXT_PUBLIC_SERVER_URL, {
      autoConnect: true,
    });
    socket.on("connect", () => {
      console.log("Connected:", socket.id);
    });
    socket.on("disconnect", () => {
      console.log("Disconnected");
    });
    set({ socket });
  },
  disconnect: () => {
    const socket = get().socket;
    if (!socket || !socket.connected) return;
    socket.disconnect();
    set({ socket: null });
  },
}));
