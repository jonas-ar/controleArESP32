import React, { useEffect, useState } from "react";
import { Modal, ScrollView, Text, View, TouchableOpacity } from "react-native";
import { style } from "./styles";
import { MqttClient } from "mqtt";

type ComandoProps = {
    client: MqttClient | null;
    topico: string;
    onBack: () => void;
}

export default function Comando({client, topico, onBack}: ComandoProps) {
    const topicoStatus = "esp32/ar/status";
    const [modalVisivel, setModalVisivel] = useState(false);
    const [mensagensStatus, setMensagensStatus] = useState<string[]>([]);

    useEffect(() => {
        if (!client) return;

        const receberMensagem = (topicoRecebido: string, payload: Buffer) => {
            if (topicoRecebido !== topicoStatus) return;

            const mensagem = payload.toString();
            console.log(`Status recebido: ${mensagem}`);
            setMensagensStatus((mensagens) => [mensagem, ...mensagens]);
        };

        client.on("message", receberMensagem);
        client.subscribe(topicoStatus, (error) => {
            if (error) {
                console.log("Erro ao inscrever no tópico de status:", error);
            }
        });

        return () => {
            client.off("message", receberMensagem);
            client.unsubscribe(topicoStatus);
        };
    }, [client]);

    function enviarLigar() {
        client?.publish(topico, 'ligar', {qos: 0, retain: false}, (error) => {
            if (error) {
                console.log(error);
            }
        })
    }

    function enviarDesligar() {
        client?.publish(topico, 'desligar', {qos: 0, retain: false}, (error) => {
            if (error) {
                console.log(error);
            }
        })
    }

    function voltar() {
        if (!client) {
            onBack();
            return;
        }

        client.end(false, onBack);
    }

    return (
        <View style={style.container}>
            <View style={style.boxComando}>
                <TouchableOpacity style={style.buttonLigar} onPress={enviarLigar}>
                    <Text style={style.textButton}>Ligar</Text>
                </TouchableOpacity>

                <TouchableOpacity style={style.buttonDesligar} onPress={enviarDesligar}>
                    <Text style={style.textButton}>Desligar</Text>
                </TouchableOpacity>

                <TouchableOpacity style={style.buttonDesconectar} onPress={voltar}>
                    <Text style={style.textButton}>Desconectar-se</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={style.buttonStatus} onPress={() => setModalVisivel(true)}>
                <Text style={style.textButton}>Ver status</Text>
            </TouchableOpacity>

            <Modal
                visible={modalVisivel}
                transparent
                animationType="slide"
                onRequestClose={() => setModalVisivel(false)}
            >
                <View style={style.modalFundo}>
                    <View style={style.modalConteudo}>
                        <Text style={style.modalTitulo}>Status do ESP32</Text>
                        <Text style={style.modalTopico}>{topicoStatus}</Text>

                        <ScrollView style={style.listaStatus}>
                            {mensagensStatus.length === 0 ? (
                                <Text style={style.mensagemStatus}>Nenhum status recebido.</Text>
                            ) : (
                                mensagensStatus.map((mensagem, indice) => (
                                    <Text key={`${mensagem}-${indice}`} style={style.mensagemStatus}>
                                        {mensagem}
                                    </Text>
                                ))
                            )}
                        </ScrollView>

                        <TouchableOpacity style={style.buttonFechar} onPress={() => setModalVisivel(false)}>
                            <Text style={style.textButton}>Fechar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    )
}
