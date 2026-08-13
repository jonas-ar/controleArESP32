import React from "react";
import { Text, TextInput, View, KeyboardAvoidingView, Platform } from "react-native";
import { style } from "./styles";

export default function Login() {
    return (
        <KeyboardAvoidingView
        style={style.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <View style={style.boxTop}>
                {/* 
                    <Text style={style.titulo}>
                    Controle de Ar-Condicionado usando ESP32
                    </Text>
                */}
            </View>

            <View style={style.boxMid}>

                <Text style={style.titulo}>Conexão</Text>
                    <Text style={style.titleInput}>URL WebSocket TLS</Text>
                
                <View style={style.boxInput}>
                    <TextInput style={style.input} />
                </View>
                
                <Text style={style.titleInput}>Usuário MQTT</Text>
                    <View style={style.boxInput}>
                        <TextInput style={style.input} />
                    </View>

                <Text style={style.titleInput}>Senha MQTT</Text>
                    <View style={style.boxInput}>
                        <TextInput style={style.input} />
                    </View>

            </View>

                <View style={style.boxBottom}>
                    
                </View>

        </KeyboardAvoidingView>
    )
}