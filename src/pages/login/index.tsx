import React, { useEffect, useState } from "react";
import mqtt, { MqttClient } from "mqtt";
import * as SecureStore from "expo-secure-store";
import { ActivityIndicator, Alert, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { style } from "./styles";

type LoginProps = {
  onConnected: (client: MqttClient, topico: string) => void;
};

const DADOS_CONEXAO_KEY = "dados-conexao-mqtt";

export default function Login({ onConnected }: LoginProps) {
  const [url, setUrl] = useState("");
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [topico, setTopico] = useState("");
  const [loading, setLoading] = useState(false);
  const [lembrarDados, setLembrarDados] = useState(false);

  useEffect(() => {
    async function carregarDadosSalvos() {
      const dadosSalvos = await SecureStore.getItemAsync(DADOS_CONEXAO_KEY);
      if (!dadosSalvos) return;

      const { urlSalva, usuarioSalvo, topicoSalvo } = JSON.parse(dadosSalvos);
      setUrl(urlSalva);
      setUser(usuarioSalvo);
      setTopico(topicoSalvo);
      setLembrarDados(true);
    }

    carregarDadosSalvos().catch(() => Alert.alert("Atenção", "Não foi possível carregar os dados salvos."));
  }, []);

  async function salvarDados() {
    if (!lembrarDados) return;

    await SecureStore.setItemAsync(DADOS_CONEXAO_KEY, JSON.stringify({
      urlSalva: url,
      usuarioSalvo: user,
      topicoSalvo: topico,
    }));
  }

  function alternarLembrarDados() {
    if (lembrarDados) SecureStore.deleteItemAsync(DADOS_CONEXAO_KEY);
    setLembrarDados(!lembrarDados);
  }

  async function getLogin() {
    if (!url || !user || !password || !topico) {
      Alert.alert("Atenção", "Todos os campos precisam ser preenchidos!");
      return;
    }

    setLoading(true);

    let brokerUrl: URL;
    try {
      brokerUrl = new URL(url.trim());
    } catch {
      setLoading(false);
      Alert.alert("Atenção", "URL não é válida.");
      return;
    }

    if (brokerUrl.protocol !== "wss:") {
      setLoading(false);
      Alert.alert("Atenção", "Use uma URL segura iniciando com wss://");
      return;
    }

    try {
      await salvarDados();
    } catch {
      setLoading(false);
      Alert.alert("Atenção", "Não foi possível salvar os dados.");
      return;
    }

    const client = mqtt.connect(brokerUrl.toString(), {
      clientId: `mqtt${Math.random().toString(16).slice(3)}`,
      clean: true,
      connectTimeout: 4000,
      username: user,
      password,
      reconnectPeriod: 1000,
    });

    const tratarErroDeConexao = (error: Error) => {
      setLoading(false);
      Alert.alert("Conexão falhou", error.toString());
      client.end();
    };

    client.on("error", tratarErroDeConexao);
    client.on("connect", () => {
      setLoading(false);
      client.off("error", tratarErroDeConexao);
      client.subscribe([topico], () => onConnected(client, topico));
    });
  }

  return (
    <KeyboardAvoidingView style={style.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <ScrollView contentContainerStyle={style.scrollContent} keyboardShouldPersistTaps="handled">
        <View style={style.content}>
          <Text style={style.appTitle}>Login</Text>
          <Text style={style.appSubtitle}>Faça a conexão com o broker MQTT</Text>

          <View style={style.formCard}>
            <Text style={style.formTitle}>Dados de conexão</Text>

            <Text style={style.label}>URL WebSocket TLS</Text>
            <TextInput style={style.input} value={url} onChangeText={setUrl} placeholder="wss://seu-broker:8884/mqtt" placeholderTextColor="#94a3b8" autoCapitalize="none" autoCorrect={false} />

            <Text style={style.label}>Usuário MQTT</Text>
            <TextInput style={style.input} value={user} onChangeText={setUser} autoCapitalize="none" autoCorrect={false} />

            <Text style={style.label}>Senha MQTT</Text>
            <TextInput style={style.input} value={password} onChangeText={setPassword} secureTextEntry autoCapitalize="none" autoCorrect={false} />

            <Text style={style.label}>Tópico de comandos</Text>
            <TextInput style={style.input} value={topico} onChangeText={setTopico} autoCapitalize="none" autoCorrect={false} />

            <TouchableOpacity style={style.rememberRow} onPress={alternarLembrarDados}>
              <View style={[style.checkbox, lembrarDados && style.checkboxChecked]}>
                {lembrarDados && <Text style={style.checkmark}>✓</Text>}
              </View>
              <Text style={style.rememberText}>Lembrar URL, usuário e tópico</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={[style.connectButton, loading && style.connectButtonDisabled]} onPress={getLogin} disabled={loading}>
            {loading ? <ActivityIndicator color="#fff" /> : <Text style={style.connectButtonText}>Conectar</Text>}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
