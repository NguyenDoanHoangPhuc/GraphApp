import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import Swiper from 'react-native-swiper';

const image = require('../assets/picture/akhil-lincoln-dSeQCOh_q7o-unsplash.jpg');

function Welcome({ navigation }) {
    return (
        <Swiper showsButtons={true}>
            {/* Màn hình số 1 */}
            <View style={styles.slide}>
                <ImageBackground source={image} resizeMode='cover' style={styles.image}>
                    <View style={
                        styles.darkScreen
                    }>
                        <Text style={styles.header}>Chào mừng</Text>
                        <Text style={styles.description}>Chào mừng bạn đến với ứng dụng vẽ đồ thị của chúng tôi - một công cụ mạnh mẽ giúp bạn tạo và phân tích đồ thị một cách trực quan và hiệu quả.</Text>
                        <Text style={styles.description}>Với ứng dụng này, bạn có thể dễ dàng vẽ đồ thị, định nghĩa các đỉnh, cạnh và khám phá các thuật toán đồ thị phức tạp thông qua một giao diện thân thiện và dễ sử dụng.</Text>

                    </View>
                </ImageBackground>

            </View>

            {/* Màn hình số 2 */}
            <View style={styles.slide}>
                <ImageBackground source={image} resizeMode='cover' style={styles.image}>
                    <View style={
                        styles.darkScreen
                    }>
                        <Text style={styles.header}>Hãy bắt đầu</Text>
                        <Text style={styles.description}>Chúc bạn có những trải nghiệm thú vị và hữu ích với ứng dụng vẽ đồ thị của chúng tôi!</Text>
                        <TouchableOpacity style={styles.button}
                            onPress={() => navigation.navigate("InputGraph")}
                        >

                            <Text style={styles.buttonText}>Tới việc vẽ đồ thị</Text>
                        </TouchableOpacity>

                        
                    </View>
                </ImageBackground>

            </View>
        </Swiper>
    );
}

const styles = StyleSheet.create({
    slide: {
        flex: 1,
    },
    image: {
        flex: 1,
        justifyContent: 'center',

    },
    darkScreen: {
        backgroundColor: 'rgba(0,0,0,0.3)',
        flex: 1,
        justifyContent: 'center'
    },
    header: {
        fontSize: 36,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
        color: "white",
        textTransform: 'uppercase'
    },
    description: {
        fontSize: 16,
        marginTop: 20,
        marginBottom: 10,
        marginLeft: 40,
        marginRight: 40,
        lineHeight: 32,
        textAlign: 'justify',
        color: "white"
    },
    button: {
        marginTop: 20,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderWidth: 2,
        borderColor: 'white',
        alignSelf: 'center',
        borderRadius: 5,
        width: '50%',
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default Welcome;
