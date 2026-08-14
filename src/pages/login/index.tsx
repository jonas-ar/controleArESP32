import React, { useState } from "react";
import mqtt from "mqtt";
import { Text, TextInput, View, KeyboardAvoidingView, Platform, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import { style } from "./styles";

export default function Login() {
    
    const [url, setUrl] = useState('');
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [topico, setTopico] = useState('');
    const [loading, setLoading] = useState(false);

    function getLogin() {
        if (!url || !user || !password || !topico) {
            Alert.alert("Atenção", "Todos os campos precisam ser preenchidos!");
            return;
        }
        setLoading(true);

        const clientId = `mqtt${Math.random().toString(16).slice(3)}`;

        let invalidUrl: URL;
        
        try {
            invalidUrl = new URL(url.trim());
        } catch {
            Alert.alert("Atenção", "URL não é válida");
            setLoading(false);
            return
        };
        
        if (invalidUrl.protocol !== "wss:") {
            Alert.alert("Atenção", "Procoto inválido");
            setLoading(false);
            return
        }

        const client = mqtt.connect(invalidUrl.toString(), {
            clientId,
            clean: true,
            connectTimeout: 4000,
            username: user,
            password,
            reconnectPeriod: 1000
        });

        client.on('error', (error) => {
            setLoading(false);
            Alert.alert("Conexão falhou", error.toString());
            client.end();
        });

        client.on('connect', () => {
            Alert.alert("Aviso", "Conexão realizada")
            setLoading(false);
            client.subscribe([topico], () => {
                console.log(`Inscrito no tópico '${topico}'`);
            });
        });
    }

    return (
        <KeyboardAvoidingView
        style={style.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <View style={style.boxTop} />
            
            <View style={style.boxMid}>

                <Text style={style.titulo}>Conexão</Text>
                    <Text style={style.titleInput}>URL WebSocket TLS</Text>
                
                <View style={style.boxInput}>
                    <TextInput style={style.input}
                        onChangeText={setUrl}
                    />
                </View>
                
                <Text style={style.titleInput}>Usuário MQTT</Text>
                    <View style={style.boxInput}>
                        <TextInput style={style.input} 
                            autoCorrect={false} 
                            autoCapitalize="none"
                            onChangeText={setUser}
                            />
                    </View>

                <Text style={style.titleInput}>Senha MQTT</Text>
                    <View style={style.boxInput}>
                        <TextInput 
                            autoCorrect={false} 
                            style={style.input} 
                            autoCapitalize="none"
                            textContentType="password"
                            secureTextEntry={true}
                            onChangeText={setPassword}
                             />
                    </View>

                <Text style={style.titleInput}>Tópico MQTT</Text>
                    <View style={style.boxInput}>
                        <TextInput style={style.input} 
                            autoCorrect={false}
                            autoCapitalize="none"
                            onChangeText={setTopico}
                            />
                    </View>
            </View>

                <View style={style.boxBottom}>
                    <TouchableOpacity style={style.button} onPress={getLogin} disabled={loading}>
                        {
                            loading?
                                <ActivityIndicator color={'#fff'} size={"small"}/>
                            :
                                <Text style={style.textButton}>Conectar</Text>
                        }
                    </TouchableOpacity>
                </View>

        </KeyboardAvoidingView>
    )
}
