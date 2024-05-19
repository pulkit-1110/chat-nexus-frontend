import { createContext, useMemo, useContext } from "react";
import io from "socket.io-client";
import { server } from "./constants/config";

const SocketContext = createContext();

const getSocket = () => useContext(SocketContext);

const SocketProvider = ({ children }) => {
  console.log(`Socket Site: ${server}`);
  const socket = useMemo(
    () =>
      io(server, {
        withCredentials: true,
        reconnection: true,
        transports: ["websocket", "polling"],
        reconnectionAttempts: 5,
      }),
    []
  );
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export { SocketProvider, getSocket };
