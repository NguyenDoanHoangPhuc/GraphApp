
import {View, Text, StyleSheet} from 'react-native';

function Test(){
    return <View style={styles.container}>
        <Text style={styles.text}>Test</Text>
    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black'
    }

})

export default Test;