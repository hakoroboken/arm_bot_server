import { useState, useEffect, useRef } from 'react';

const WS_URL = 'ws://192.168.11.12:64201';

function WebSocketConnection({ controller_input }) {
  const wsRef = useRef(null);
  const reconnectTimer = useRef(null);

  const inputRef = useRef(controller_input);

  const [connected, setConnected] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0, r: 0 });

  // =========================
  // Publish（ROSの代替）
  // =========================
  const Publish = (x, y, rot) => {
    if (!connected || !wsRef.current) return;

    const msg = {
      type: "cmd_vel",
      linear: {
        x: x,
        y: y,
        z: 0.0
      },
      angular: {
        x: 0.0,
        y: 0.0,
        z: rot
      }
    };

    wsRef.current.send(JSON.stringify(msg));
  };

  // controller_input更新
  useEffect(() => {
    inputRef.current = controller_input;
  }, [controller_input]);

  // =========================
  // WebSocket接続
  // =========================
  useEffect(() => {
    const connect = () => {
      const ws = new WebSocket(WS_URL);
      wsRef.current = ws;

      ws.onopen = () => {
        setConnected(true);
        console.log("WebSocket connected");
      };

      ws.onmessage = (event) => {
        try {
          const msg = JSON.parse(event.data);

          // フィードバック（ROSのsubscribe代替）
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
      };

      ws.onclose = () => {
        console.warn("WebSocket disconnected");
        setConnected(false);

        reconnectTimer.current = setTimeout(connect, 3000);
      };
    };

    connect();

    return () => {
      if (wsRef.current) wsRef.current.close();
      if (reconnectTimer.current) clearTimeout(reconnectTimer.current);
    };
  }, []);

  // =========================
  // 送信ループ（10ms）
  // =========================
  useEffect(() => {
    if (!connected) return;

    const id = setInterval(() => {
      const { lx, ly, rx } = inputRef.current;

      Publish(lx, ly, rx);
    }, 10);

    return () => clearInterval(id);
  }, [connected]);

  return {
    position,
    connected,
  };
}

export default WebSocketConnection;