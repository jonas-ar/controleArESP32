import {StyleSheet} from "react-native";
import { themes } from "../../global/themes";

export const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: themes.colors.bgScreen
    },
    boxComando: {
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        height: 'auto',
        backgroundColor: themes.colors.secondary,
        borderRadius: 5,
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)',
        padding: 10,
        width: '100%',
    },
    buttonLigar: {
        width: '100%',
        height: 70,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'green',
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7,
    },
    buttonDesligar: {
        width: '100%',
        height: 70,
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'red',
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7,
    },
    buttonDesconectar: {
        width: '100%',
        height: 70,
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'grey',
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7,
    },
    buttonStatus: {
        position: 'absolute',
        bottom: 32,
        width: '90%',
        height: 56,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: themes.colors.primary,
        borderRadius: 20,
        elevation: 7,
    },
    modalFundo: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: 'rgba(0, 0, 0, 0.55)',
    },
    modalConteudo: {
        maxHeight: '70%',
        padding: 20,
        borderRadius: 16,
        backgroundColor: themes.colors.secondary,
    },
    modalTitulo: {
        fontSize: 22,
        fontWeight: 'bold',
    },
    modalTopico: {
        marginTop: 4,
        marginBottom: 14,
        color: '#666',
    },
    listaStatus: {
        maxHeight: 300,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 10,
    },
    mensagemStatus: {
        marginBottom: 8,
        fontSize: 16,
    },
    buttonFechar: {
        height: 52,
        marginTop: 16,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        backgroundColor: 'grey',
    },
    textButton: {
        fontSize: 24,
        color: '#fff',
        fontWeight: 'bold'
    }
})
