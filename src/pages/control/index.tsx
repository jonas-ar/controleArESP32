import React, { useEffect, useState } from "react";
import { Modal, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { MqttClient } from "mqtt";
import Header from "../../components/header";
import { style } from "../login/styles";

type ControlProps = {
  client: MqttClient;
  onDisconnect: () => void;
};

export default function Control({ client, onDisconnect }: ControlProps) {
  const [subscribeTopic, setSubscribeTopic] = useState("esp32/led/status");
  const [lastResponse, setLastResponse] = useState("Aguardando mensagens.");
  const [logs, setLogs] = useState<string[]>([]);
  const [logModalVisible, setLogModalVisible] = useState(false);

  const log = (message: string) => {
    const time = new Date().toLocaleTimeString("pt-BR");
    setLogs((current) => [`[${time}] ${message}`, ...current].slice(0, 40));
  };

  const subscribe = (topic: string) => {
    if (!topic || !client.connected) return;
    client.subscribe(topic, { qos: 0 }, (error) => log(error ? `Erro ao inscrever: ${error.message}` : `Inscrito em ${topic}`));
  };

  const publish = (command: "ligar" | "desligar" | "piscar") => {
    if (!client.connected) return log("O MQTT está desconectado.");
    client.publish("esp32/led/comando", command, { qos: 0 }, (error) => {
      log(error ? `Erro ao publicar: ${error.message}` : `Comando enviado: ${command}`);
    });
  };

  useEffect(() => {
    const handleMessage = (topic: string, payload: Buffer) => {
      const response = payload.toString();
      setLastResponse(response);
      log(`${topic}: ${response}`);
    };
    const handleClose = () => onDisconnect();

    client.on("message", handleMessage);
    client.on("close", handleClose);
    subscribe(subscribeTopic);

    return () => {
      client.off("message", handleMessage);
      client.off("close", handleClose);
    };
  }, []);

  const disconnect = () => {
    client.end(true, onDisconnect);
  };

  return (
    <View style={style.container}>
      <ScrollView contentContainerStyle={[style.content, style.controlContent]} keyboardShouldPersistTaps="handled">
        <Header title="Controle do LED" onBack={disconnect} withTopSpacing />
        <View style={style.commandArea}>
          <Text style={style.lastResponse}>Último retorno do ESP32: {lastResponse}</Text>
          <Text style={style.cardTitle}>Comandos</Text>
          <View style={style.commandButtons}>
            <TouchableOpacity style={[style.commandButton, style.onButton]} onPress={() => publish("ligar")}><Text style={style.commandButtonText}>Ligar</Text></TouchableOpacity>
            <TouchableOpacity style={[style.commandButton, style.offButton]} onPress={() => publish("desligar")}><Text style={style.commandButtonText}>Desligar</Text></TouchableOpacity>
            <TouchableOpacity style={style.commandButton} onPress={() => publish("piscar")}><Text style={style.commandButtonText}>Piscar</Text></TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity style={style.button} onPress={() => setLogModalVisible(true)}><Text style={style.textButton}>Ver log</Text></TouchableOpacity>
      </ScrollView>

      <Modal visible={logModalVisible} transparent animationType="slide" onRequestClose={() => setLogModalVisible(false)}>
        <View style={style.modalOverlay}>
          <View style={style.modalContent}>
            <Text style={style.cardTitle}>Inscrições</Text>
            <Text style={style.titleInput}>Tópico para receber mensagens</Text>
            <TextInput style={style.input} value={subscribeTopic} onChangeText={setSubscribeTopic} autoCapitalize="none" autoCorrect={false} />
            <TouchableOpacity style={style.button} onPress={() => subscribe(subscribeTopic.trim())}><Text style={style.textButton}>Inscrever-se</Text></TouchableOpacity>
            <Text style={style.cardTitle}>Mensagens</Text>
            <ScrollView style={style.logBox} nestedScrollEnabled>
              {logs.length === 0 ? <Text style={style.logText}>Nenhuma mensagem.</Text> : logs.map((item, index) => <Text key={`${item}-${index}`} style={style.logText}>{item}</Text>)}
            </ScrollView>
            <TouchableOpacity style={[style.button, style.disconnectButton]} onPress={() => setLogModalVisible(false)}><Text style={style.textButton}>Fechar</Text></TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
