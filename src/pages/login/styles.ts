import {Dimensions, StyleSheet} from "react-native";
import { themes } from "../../global/themes";

export const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: themes.colors.bgScreen
    },
    boxTop: {
        height: Dimensions.get('window').height/4,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    boxMid: {
        height: Dimensions.get('window').height/2.7,
        backgroundColor: themes.colors.secondary,
        borderRadius: 20,
        borderBlockColor: 'red',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)',
        padding: 10,
        width: '85%',
    },
    boxBottom: {
        height: Dimensions.get('window').height/4,
        width: '100%',
    },
    titulo: {
        fontSize: 24,
        textAlign: 'center',
        marginBottom: 5,
        fontWeight: 'bold'
    },
    titleInput: {
        fontSize: 16,
    },
    boxInput: {
        width: '100%',
        height: 40,
        borderWidth: 1,
        borderRadius: 10,
        marginTop: 10,
        marginBottom: 10
    },
    input: {
        borderRadius: 40,
        marginLeft: 5,
        marginRight: 5,
        height: '100%',
        width: '95%'
    }
})