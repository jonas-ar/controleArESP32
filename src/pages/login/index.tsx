import React, { useEffect, useRef, useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import * as SecureStore from "expo-secure-store";
import mqtt, { MqttClient } from "mqtt";
import Header from "../../components/header";
import { style } from "./styles";

type LoginProps = { onConnected: (client: MqttClient) => void };
type SavedCredentials = { url: string; user: string; password: string };

const CREDENTIALS_KEY = "mqtt-credentials";

export default function Login({ onConnected }: LoginProps) {
  const clientRef = useRef<MqttClient | null>(null);
  const [url, setUrl] = useState("");
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("Desconectado");
  const [error, setError] = useState("");
  const [rememberCredentials, setRememberCredentials] = useState(false);

  useEffect(() => {
    const loadCredentials = async () => {
      if (Platform.OS === "web") return;

      const savedValue = await SecureStore.getItemAsync(CREDENTIALS_KEY);
      if (!savedValue) return;

      const savedCredentials: SavedCredentials = JSON.parse(savedValue);
      setUrl(savedCredentials.url);
      setUser(savedCredentials.user);
      setPassword(savedCredentials.password);
      setRememberCredentials(true);
    };

    loadCredentials().catch(() => setError("Não foi possível carregar os dados salvos."));
  }, []);

  const saveCredentials = async () => {
    if (Platform.OS === "web") return;

    if (rememberCredentials) {
      await SecureStore.setItemAsync(CREDENTIALS_KEY, JSON.stringify({ url, user, password }));
      return;
    }

    await SecureStore.deleteItemAsync(CREDENTIALS_KEY);
  };

  const connect = async () => {
    const brokerUrl = url.trim();
    if (!brokerUrl.startsWith("wss://")) {
      setError("Use uma URL segura iniciando com wss://");
      return;
    }

    clientRef.current?.end(true);
    setError("");
    setStatus("Conectando...");

    try {
      await saveCredentials();
    } catch {
      setError("Não foi possível salvar os dados.");
    }

    const client = mqtt.connect(brokerUrl, {
      clientId: `app-esp32-${Date.now().toString(16)}`,
      username: user.trim() || undefined,
      password: password || undefined,
      reconnectPeriod: 3000,
      connectTimeout: 10_000,
    });
    clientRef.current = client;

    client.on("connect", () => {
      clientRef.current = null;
      onConnected(client);
    });
    client.on("error", (connectionError) => setError(`Erro: ${connectionError.message}`));
    client.on("close", () => setStatus("Desconectado"));
  };

  useEffect(() => () => { clientRef.current?.end(true); }, []);

  return (
    <KeyboardAvoidingView style={style.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <ScrollView contentContainerStyle={[style.content, style.loginContent]} keyboardShouldPersistTaps="handled">
        <View style={style.loginMain}>
          <Header title="Cliente MQTT ESP32" subtitle="Conecte-se ao broker MQTT" />
          {!!error && <Text style={style.error}>{error}</Text>}
          <View style={[style.card, style.loginCard]}>
            <Text style={style.cardTitle}>Conexão</Text>
            <Text style={style.titleInput}>URL WebSocket TLS</Text>
            <TextInput style={style.input} value={url} onChangeText={setUrl} placeholder="wss://seu-broker:8884/mqtt" placeholderTextColor="#9ca3af" autoCapitalize="none" autoCorrect={false} />
            <Text style={style.titleInput}>Usuário MQTT</Text>
            <TextInput style={style.input} value={user} onChangeText={setUser} autoCapitalize="none" autoCorrect={false} />
            <Text style={style.titleInput}>Senha MQTT</Text>
            <TextInput style={style.input} value={password} onChangeText={setPassword} secureTextEntry autoCapitalize="none" autoCorrect={false} />
            {Platform.OS !== "web" && (
              <TouchableOpacity style={style.rememberRow} onPress={() => setRememberCredentials((value) => !value)}>
                <View style={[style.checkbox, rememberCredentials && style.checkboxChecked]}>
                  {rememberCredentials && <Text style={style.checkmark}>✓</Text>}
                </View>
                <Text style={style.rememberText}>Lembrar URL, usuário e senha</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity style={style.button} onPress={connect} disabled={status === "Conectando..."}>
              <Text style={style.textButton}>Conectar</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Text style={[style.status, style.loginStatus]}>{status}</Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
