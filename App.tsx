import { useRef, useState } from "react";
import { MqttClient } from "mqtt";
import Login from "./src/pages/login";
import Comando from "./src/pages/comando";

export default function App() {
  const [page, setPage] = useState<"login" | "comando">("login");
  const clientRef = useRef<MqttClient | null>(null);
  const [topico, setTopico] = useState("");

  if (page === "login") {
    return (
      <Login
        onConnected={(client, topicoConectado) => {
          clientRef.current = client;
          setTopico(topicoConectado);
          setPage("comando");
        }}
      />
    );
  }

  return (
    <Comando
      client={clientRef.current}
      topico={topico}
      onBack={() => setPage("login")}
    />
  );
}