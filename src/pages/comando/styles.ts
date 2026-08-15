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
    textButton: {
        fontSize: 24,
        color: '#fff',
        fontWeight: 'bold'
    }
})