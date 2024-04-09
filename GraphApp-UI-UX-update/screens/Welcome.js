import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, ImageBackground, Pressable, Image } from 'react-native';
import Swiper from 'react-native-swiper';

import image from '../constants/image';
import color from '../constants/color';
import Animated from 'react-native-reanimated';



function Welcome({ navigation }) {
    return (
       <View style={styles.container}>

            <View style={styles.imageLayout}>


                <ImageBackground
                    source={image.welcomeBackground}
                    style={styles.image}
                    resizeMode='cover'
                >
                    <View style= {styles.overlayImage}>

                        <Image
                            source={image.whiteLogo}
                            style={styles.logo}
                        />
                        <Text style={styles.headerText}>Dễ dàng và</Text>
                        <Text style={styles.headerText}>Nhanh chóng</Text>
                        <Text style={styles.headerText}>Học về</Text>
                        <Text style={styles.highlighText}>Các thuật toán</Text>
                        <Text style={styles.highlighText}>Đồ thị ! </Text>
                    </View>
                </ImageBackground>
            </View>
       

        <View
            style={styles.footerLayout}
        >


            <Pressable 
            onPress = {() => navigation.navigate('InputGraph')}
            
            style ={({pressed}) => [styles.navigateButton, pressed && {opacity: 0.8}]}>
                <Text style= {styles.navigateText}
                   
                >Bắt đầu</Text>
            </Pressable>

        </View>
       </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.primaryBackground,
    },
    imageLayout: {
        width: '100%',
        height: '80%',
        overflow: 'hidden',
        backgroundColor: 'black',

        borderBottomRightRadius: 100,
       
        
    },
    footerLayout: {
        flex: 0.2,
        
    },
    image: {
        flex: 1,
        borderRadius: 100
    },
    overlayImage: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 39, 0.4)',

        justifyContent: 'flex-end',
        paddingLeft: 30,
        paddingBottom: 30
    },


    // Button
    navigateButton: {
        width: '60%',
        height: 50,
        borderRadius: 30,
        backgroundColor: color.darkCyanButton,

        justifyContent: 'center',
        alignItems: 'center',
        
        marginLeft: 30,
        marginTop: 30
    },
    navigateText: {
        fontSize: 18,
        fontFamily: 'Popins-Bold',
        color: 'white'
    },

    // Text
    headerText: {
        fontSize: 30,
        color: 'white',
        fontFamily: 'Montserrat-Black'
    },
    highlighText: {
        color: color.yellowButton,
        fontSize: 30,
        fontFamily: 'Montserrat-Black'
    },

    logo: {
        width: 60,
        height: 60,
        position: 'absolute',
        top: 20,
        right: 20
    }

});

export default Welcome;
