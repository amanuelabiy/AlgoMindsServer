import { Server as HTTPServer } from "http";
import { WebSocketService } from "./WebSocketService";

export const initializeSocket = (server: HTTPServer): WebSocketService => {
  return new WebSocketService(server);
};
