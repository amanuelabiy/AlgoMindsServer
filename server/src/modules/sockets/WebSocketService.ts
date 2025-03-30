// src/services/WebSocketService.ts
import { Server as HTTPServer } from "http";
import { Server, Socket } from "socket.io";
import { config } from "../../config/app.config";

export class WebSocketService {
  private io: Server;

  constructor(server: HTTPServer) {
    this.io = new Server(server, {
      cors: {
        origin: config.APP_ORIGIN,
        methods: ["GET", "POST"],
        credentials: true,
      },
    });

    this.setupListeners();
  }

  private setupListeners(): void {
    this.io.on("connection", (socket: Socket) => {
      // You can use socket.join(`solo_${userId}`) here if needed
      socket.on("disconnect", () => {
        console.log(`Client disconnected: ${socket.id}`);
      });

      // Add more socket listeners here if needed
    });
  }

  public emitToSocket(socketId: string, event: string, payload: any): void {
    this.io.to(socketId).emit(event, payload);
  }

  public emitToRoom(roomId: string, event: string, payload: any): void {
    this.io.to(roomId).emit(event, payload);
  }

  public getIO(): Server {
    return this.io;
  }
}
