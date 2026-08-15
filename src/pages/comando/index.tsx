import React, { useState } from "react";
import { Text, TextInput, View, TouchableOpacity} from "react-native";
import { style } from "./styles";
import { MqttClient } from "mqtt";

type ComandoProps = {
    client: MqttClient | null;
    topico: string;
    onBack: () => void;
}

export default function Comando({client, topico, onBack}: ComandoProps) {

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
        client?.end(true);
        onBack();
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
        </View>
    )
}