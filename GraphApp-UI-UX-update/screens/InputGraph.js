import React, { useState, useEffect, useCallback } from 'react';
import {
    Text,
    View,
    Image,
    ImageBackground,
    TouchableOpacity,
    Button,
    ScrollView,
    Pressable,
    Modal,
} from 'react-native'
import Swiper from 'react-native-swiper';
import { StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import image from '../constants/image';
import color from '../constants/color';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

import Animated, { ReduceMotion, cancelAnimation, useAnimatedStyle, useSharedValue,Easing, withDelay, withSpring, withTiming } from "react-native-reanimated"


const AnimatedPressable = Animated.createAnimatedComponent(Pressable);



function InputGraph({ navigation }) {

    const [showModal, setShowModal] = useState(false);
    const [showButton1, setShowButton1] = useState(false);
    const [showButton2, setShowButton2] = useState(false);

    const [showWeight, setShowWeight] = useState(false);

    const handleModalClose = useCallback(() => {
        setShowModal(false);
    }, []);

    const handleModalOpen = useCallback(() => {
        setShowModal(true);
    }, []);

    const [typeOfGraph, setTypeOfGraph] = useState('empty');

 
    

    function handleTypeOfInput(input) {
        setTypeOfInput(input);
        
    }

    function handleTypeOfGraph(graph) {
        setTypeOfGraph(graph);
    }
  

    const handleShowWeightGraph = () => {
        setShowWeight(!showWeight);
    }

    // ANIMATION

    const offset1 = useSharedValue(0);
    const offset2 = useSharedValue(0);
    const offset3 = useSharedValue(0);

    const offset4 = useSharedValue(0);
    const offset5 = useSharedValue(0);
    const offset6 = useSharedValue(0);

    const opacity = useSharedValue(0);

    const opacity1 = useSharedValue(0);

    const animated1 = useAnimatedStyle(() => ({
        transform: [{translateY: offset1.value}],
        opacity: opacity.value
    }))

    const animated2 = useAnimatedStyle(() => ({
        transform: [{translateY: offset2.value}],
        opacity: opacity.value
    }))
    
    const animated3 = useAnimatedStyle(() => ({
        transform: [{translateY: offset3.value}],
        opacity: opacity.value
    }))


    const animated4 = useAnimatedStyle(() => ({
        transform: [{translateY: offset4.value}],
        opacity: opacity1.value
    }))

    const animated5 = useAnimatedStyle(() => ({
        transform: [{translateY: offset5.value}],
        opacity: opacity1.value
    }))
    
    const animated6 = useAnimatedStyle(() => ({
        transform: [{translateY: offset6.value}],
        opacity: opacity1.value
    }))

    const handlePress1 = () => {
        
        if (showButton2) handlePress2();
        setShowButton1(!showButton1);
      
        
        offset1.value = withSpring(showButton1 ? 0 : 5)
        offset2.value = withDelay(100, withSpring(showButton1 ? 0 : 5))
        offset3.value = withDelay(200, withSpring(showButton1 ? 0 : 5))

        opacity.value = withTiming(showButton1 ? 0 : 1, {duration: 400})
    }

    const handlePress2 = () => {
        
        if (showButton1) handlePress1();
        setShowButton2(!showButton2);
        
        
        offset4.value = withSpring(showButton2 ? 0 : 5)
        offset5.value = withDelay(100, withSpring(showButton2 ? 0 : 5))
        offset6.value = withDelay(200, withSpring(showButton2 ? 0 : 5))

        opacity1.value = withTiming(showButton2 ? 0 : 1, {duration: 400})
    }

    const offsetX = useSharedValue(-200);
    const opacity3 = useSharedValue(0);

    const offsetX1 = useSharedValue(-200);

    const animatedX = useAnimatedStyle(() => {
        return {
            transform: [{translateX: offsetX.value}],
            opacity: opacity3.value
        }
    })

    const animatedX1 = useAnimatedStyle(() => {
        return {
            transform: [{translateX: offsetX1.value}],
            opacity: opacity3.value
        }
    })

    useEffect(() => {
        offsetX.value = withTiming(0, {
            duration: 500,
            easing: Easing.inOut(Easing.quad),
            reduceMotion: ReduceMotion.System
        })

        offsetX1.value = withDelay(20, withTiming(0, {
            duration: 500,
            easing: Easing.inOut(Easing.quad),
            reduceMotion: ReduceMotion.System
        }))

        opacity3.value = withTiming(1, {
            duration: 600,
            easing: Easing.inOut(Easing.quad),
            reduceMotion: ReduceMotion.System
        });
    }, [])



    return (
        <View style={styles.container}>
            <Modal
                animationType='fade'
                visible={showModal}
                transparent={true}
                onRequestClose={() => {
                    setShowModal(false);
                }}
            >
                <View
                    style={styles.overlayModal}
                >
                    <View
                        style={styles.modalContent}
                    >
                        <View style={styles.modalText}>
                            <Pressable
                                style={({ pressed }) => [pressed && { opacity: 0.8 }]}
                                onPress={() => handleModalClose()}
                            >
                                <View style={styles.modalCloseButton}>
                                    <FontAwesomeIcon icon="fa-xmark" size={26} color={color.modalPrimary} />
                                </View>

                            </Pressable>

                            <Text style={styles.modalTitle}>
                                Cách khởi tạo
                            </Text>
                            <Text style={styles.modalDescription}>
                                Chọn cách bạn muốn khởi tạo đồ thị
                            </Text>
                        </View>

                        <Pressable 
                            style ={styles.checkBoxButton}
                            onPress={() => handleShowWeightGraph()}
                        >
                            <View style={[styles.checkBoxIcon, {backgroundColor: showWeight === false ? 'white' : color.greenButton}]}>
                                <FontAwesomeIcon icon="fa-check" size={20} color='black' />
                                
                            </View>
                            <Text style ={[styles.checkBoxText, {color: showWeight === false ? 'white' : color.greenButton}]}>Đồ thị có trọng số</Text>
                        </Pressable>

                        <Pressable
                            style={({ pressed }) => [
                                styles.modalButton,
                                pressed && { opacity: 0.8 },

                            ]}
                            onPress={() => {
                                handleModalClose();
                                navigation.navigate('DrawGraph', { typeOfGraph: typeOfGraph, typeOfInput: 'random', showWeight: showWeight })
                            }}

                        >
                            <View style={styles.modalImage}>
                                <FontAwesomeIcon icon="fa-dice" size={40} color='black' />
                            </View>
                            <View style={styles.modalButtonText}>

                                <Text style={styles.modalButtonTitle}>
                                   Ngẫu nhiên
                                </Text>
                                <Text style={styles.modalButtonDescription}>
                                    Khởi tạo ngẫu nhiên với số đỉnh và cung 
                                </Text>
                            </View>
                            
                        </Pressable>

                        <Pressable
                            onPress={() => {
                                handleModalClose();
                                navigation.navigate('DrawGraph', { typeOfGraph: typeOfGraph, typeOfInput: 'create', showWeight: showWeight})
                            }}
                            style={({ pressed }) => [
                                styles.modalButton,
                                pressed && { opacity: 0.9 },

                            ]}

                        >

                            <View style={styles.modalImage}>
                                <FontAwesomeIcon icon="fa-paintbrush" size={40} color='black' />
                            </View>
                            <View style={styles.modalButtonText}>

                                <Text style={styles.modalButtonTitle}>
                                    Tự khởi tạo
                                </Text>
                                <Text style={styles.modalButtonDescription}>
                                    Tự thêm đỉnh và cung để tạo đồ thị
                                </Text>
                            </View>
                        </Pressable>
                        
                    </View>

                </View>
            </Modal>


            <View
                style={styles.headerLayout}
            >
                <Pressable style={{
                    position: 'absolute',
                    top: 20,
                    left: 20,
                    width: 40,
                    height: 40,
                    borderRadius: 40,
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 2
                }} onPress={() => navigation.goBack()}>
                    <FontAwesomeIcon icon="fa-solid fa-arrow-left" size={24} color="white" />
                </Pressable>
                <ImageBackground
                    style={styles.headerBackground}
                    source={image.inputBackground}
                >
                    <View style={styles.overlay}>
                        <Image
                            style={styles.logo}
                            source={image.whiteLogo} />
                        <Text style={styles.headerText}>Hãy chọn</Text>
                        <Text style={styles.headerHighlightText}>loại đồ thị</Text>
                    </View>
                </ImageBackground>
            </View>

            <ScrollView style={styles.buttonLayout}>

                <View
                    
                >
                    <View >
                        <AnimatedPressable
                            style={[
                                styles.bigButton,
                                styles.blueButton,
                                animatedX
                            ]}
                            onPress={handlePress1}

                        >
                            <View style = {styles.bigButtonImage}>
                                <Image
                                    style = {{
                                        height: 60,
                                        width: 60,
                                    }}
                                    source = {image.undiLogo}
                                />
                            </View>
                            <View style ={styles.bigButtonText}>
                                <Text style = {styles.bigButtonTitle}>Vô hướng</Text>
                                <Text style = {styles.bigButtonDescription}>Mỗi cạnh là một quan hệ hai chiều</Text>
                            </View>

                        </AnimatedPressable>
                        {
                            showButton1 && (
                                <View>
                                    <AnimatedPressable
                                        style={[styles.mediumButton, styles.darkBlueButton,
                                            animated1
                                        ]}
                                        onPress={() => {
                                            handleTypeOfGraph("UndirectedSimpleGraph")
                                            handleModalOpen();
                                        }}
                                    >
                                        <Text style={styles.mediumButtonText}>Đơn đồ thị vô hướng</Text>
                                    </AnimatedPressable>


                                    <AnimatedPressable
                                        style={ [styles.mediumButton, styles.darkBlueButton,
                                            animated2
                                        ]}
                                        onPress={() => {
                                            handleTypeOfGraph("UndirectedMultiGraph")
                                            handleModalOpen();
                                        }
                                        }
                                    >
                                        <Text style={styles.mediumButtonText}>Đa đồ thị vô hướng</Text>
                                    </AnimatedPressable>
                                    <AnimatedPressable
                                        style={[styles.mediumButton, styles.darkBlueButton,
                                            animated3
                                            
                                        ]}
                                        onPress={() => {
                                            handleModalOpen();
                                            handleTypeOfGraph("PseudoGraph")
                                        }
                                        }
                                    >
                                        <Text style={styles.mediumButtonText}>Giả đồ thị</Text>
                                    </AnimatedPressable>
                                </View>
                            )
                        }
                        <AnimatedPressable
                            style={[
                                styles.bigButton,
                                styles.cyanButton,
                                animatedX1
                            ]}
                            onPress={handlePress2}
                        >
                            <View style={styles.bigButtonImage}>
                            <Image
                                    style = {{
                                        height: 60,
                                        width: 60,
                                    }}
                                    source = {image.diLogo}
                                />
                            </View>
                            <View style ={styles.bigButtonText}>
                                <Text style={styles.bigButtonTitle}>Có hướng</Text>
                                <Text style={styles.bigButtonDescription}>Mỗi cạnh là một quan hệ một chiều</Text>
                            </View>
                        </AnimatedPressable>
                        {
                            showButton2 && (
                                <View>
                                    <AnimatedPressable
                                        style={[styles.mediumButton, styles.darkCyanButton
                                            ,animated4
                                        ]}
                                        onPress={() => {
                                            handleModalOpen();
                                            handleTypeOfGraph("DirectedSimpleGraph")
                                        }
                                        }
                                    >
                                        <Text style={styles.mediumButtonText}>Đơn đồ thị có hướng</Text>
                                    </AnimatedPressable>
                                    <AnimatedPressable
                                        style={[styles.mediumButton, styles.darkCyanButton
                                            ,animated5
                                        ]}
                                        onPress={() => {
                                            handleModalOpen();
                                            handleTypeOfGraph("DirectedMultiNoLoopGraph")
                                        }
                                        }
                                    >
                                        <Text style={styles.mediumButtonText}>Đa đồ thị có hướng (không khuyên)</Text>
                                    </AnimatedPressable>
                                    <AnimatedPressable
                                        style={[styles.mediumButton, styles.darkCyanButton
                                            , animated6
                                        ]}
                                        onPress={() => {
                                            handleModalOpen();
                                            handleTypeOfGraph("DirectedMultiLoopGraph")
                                        }
                                        }
                                    >
                                        <Text style={styles.mediumButtonText}>Đa đồ thị có hướng (có khuyên)</Text>
                                    </AnimatedPressable>
                                </View>
                            )
                        }
                    </View>
                </View>
            </ScrollView>



        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.primaryBackground
    },
    headerLayout: {
        
        height: '20%',
        borderBottomRightRadius: 100,
        overflow: 'hidden'
    },
    buttonLayout: {
        height: '80%',
        
    },
    headerBackground: {
        flex: 1,
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 39, 0.4)',
        padding: 20,
        justifyContent: 'flex-end'
    },
    logo: {
        width: 40,
        height: 40,

        position: 'absolute',
        top: 20,
        right: 20
    },
    headerText: {
        fontSize: 24,
        fontFamily: 'Montserrat-Regular',

        color: 'white'
    },
    headerHighlightText: {
        fontSize: 26,
        fontFamily: 'Montserrat-Black',
        textTransform: 'uppercase',
        color: 'white'
    },


    // Button big
    bigButton: {
        width: '90%',
        height: 'auto',
        padding: 16,
        borderRadius: 20,

        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 18
    },

    cyanButton: {
        backgroundColor: color.cyanButton
    },

    blueButton: {
        backgroundColor: color.blueButton
    },


    bigButtonImage: {
        width: `30%`,
        aspectRatio: 1.5,
        borderRadius: 10,
        marginRight: 20,

        backgroundColor: color.yellowButton,
        paddingTop: 6,
        alignItems: 'center'
    },

    bigButtonText: {
        width: '50%'
    },
    bigButtonTitle: {
        fontSize: 18,
        fontFamily: 'Montserrat-Black',
        color: 'white',
    },
    bigButtonDescription: {
        fontSize: 14,
        fontFamily: 'Poppins-Regular',
        color: 'white',
    },

    // Button medium

    mediumButton: {
        width: '90%',
        height: 'auto',
        padding: 10,
        borderRadius: 20,

        alignSelf: 'center',
        marginTop: 6,
        marginBottom: 6
    },
    mediumButtonText: {
        color: 'white',
        fontSize: 14,
        textAlign: 'center',
        fontFamily: 'Montserrat-Regular'
    },

    darkBlueButton: {
        backgroundColor: color.darkBlueButton
    },
    darkCyanButton: {
        backgroundColor: color.darkCyanButton
    },

    button: {
        padding: 10,
        margin: 5,
        borderRadius: 5,
        backgroundColor: "blue"
    },
    
    //button:
    checkBoxButton: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',

        padding: 18
    },
    checkBoxIcon: {
        height: 30,
        width: 30,
        borderRadius: 30,
        backgroundColor: 'white',

        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    checkBoxText: {
        color: 'white',
        fontFamily: 'Poppins-Regular',
        marginLeft: 10,
        fontSize: 16
    },

    // Modal
    modal: {
        flex: 1,
    },
    overlayModal: {
        backgroundColor: 'rgba(0, 0, 39, 0.5)',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
    modalContent: {
        width: '90%',
        height: 'auto',
        backgroundColor: 'black',
        padding: 5,
        borderColor: color.modalPrimary,
        borderWidth: 1,
        zIndex: 2,
    },
    modalButtonTitle: {
        fontSize: 16,
        color: 'white',
        fontFamily: 'Montserrat-Black',
    },
    modalButtonDescription: {
        fontSize: 12,
        color: 'white',
        fontFamily: 'Poppins-Regular',
    },
    modalButton: {
        width: '90%',
        backgroundColor: '#001E6A',
        borderRadius: 30,

        alignSelf: 'center',
        marginVertical: 10,
        padding: 15,

        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    modalCloseButton: {
        padding: 8,
        zIndex: 3,

        position: 'absolute',
        top: 10,
        right: 10,

        margin: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalImage: {
        width: '26%',

        aspectRatio: 1,

        backgroundColor: 'white',
        borderRadius: 60,
        marginRight: 20,

        justifyContent: 'center',
        alignItems: 'center'
    },
    modalButtonText: {
        width: '60%'
    },
    modalText: {
        marginVertical: 10
    },
    modalTitle: {
        fontSize: 18,
        fontFamily: 'Montserrat-Black',
        color: 'white',
        marginLeft: '5%',
        marginVertical: 10
    },
    modalDescription: {
        fontSize: 12,
        fontFamily: 'Poppins-Regular',
        color: 'white',
        marginLeft: '5%',
    }
})

export default InputGraph;