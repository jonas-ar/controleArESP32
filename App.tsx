import { useState } from "react";
import { MqttClient } from "mqtt";
import Control from "./src/pages/control";
import Login from "./src/pages/login";

export default function App() {
  const [client, setClient] = useState<MqttClient | null>(null);

  return client ? (
    <Control client={client} onDisconnect={() => setClient(null)} />
  ) : (
    <Login onConnected={setClient} />
  );
}
