import { useState, useEffect, useRef } from 'react';

const WS_URL = 'ws://192.168.11.12:64201';

function WebSocketConnection({ controller_input }) {
  const wsRef = useRef(null);
  const reconnectTimer = useRef(null);
  const intervalRef = useRef(null);

  const inputRef = useRef(controller_input);

  const [connected, setConnected] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0, r: 0 });

  // 最新入力を保持
  useEffect(() => {
    inputRef.current = controller_input;
  }, [controller_input]);

  useEffect(() => {
    let isMounted = true;

    const connect = () => {
      console.log("connecting...");
      const ws = new WebSocket(WS_URL);
      wsRef.current = ws;

      ws.onopen = () => {
        if (!isMounted) return;

        console.log("WebSocket connected");
        setConnected(true);

        // 既存intervalがあれば止める
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }

        intervalRef.current = setInterval(() => {
          const socket = wsRef.current;

          if (!socket || socket.readyState !== WebSocket.OPEN) return;

          const { lx, ly, rx } = inputRef.current;

          const msg = {
            x: lx, y: ly, rot: rx
          };

          socket.send(JSON.stringify(msg));
        }, 20);
      };

      ws.onmessage = (event) => {
        try {
          const msg = JSON.parse(event.data);

          if (msg.type === "position") {
            setPosition({
              x: msg.x,
              y: msg.y,
              r: msg.r
            });
          }
        } catch (e) {
          console.error("Invalid message", e);
        }
      };

      ws.onerror = (err) => {
        console.error("WebSocket error", err);
        ws.close(); // ← これ重要
      };

      ws.onclose = () => {
        console.warn("WebSocket disconnected");
        setConnected(false);

        // interval停止
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }

        // 再接続
        if (isMounted) {
          reconnectTimer.current = setTimeout(connect, 1000);
        }
      };
    };

    connect();

    return () => {
      isMounted = false;

      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }

      if (reconnectTimer.current) {
        clearTimeout(reconnectTimer.current);
      }

      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, []);

  return {
    position,
    connected,
  };
}

export default WebSocketConnection;