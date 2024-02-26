import React, { useState, useEffect } from 'react';
import {
    Text,
    View,
    Image,
    ImageBackground,
    TouchableOpacity,
    Button,
    ScrollView,
    Pressable
} from 'react-native'
import Swiper from 'react-native-swiper';
import { StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';




/*
    A1, B1 la nut cap 1
    A2, B2 la nut cap 2, con cua A1
    C2, D2 la nut cap 2, con cua B1

    A3, B3, C3 
*/




function InputGraph({ navigation }) {
    const [showsButtons, setShowButtons] = useState({ A1: false, B1: false });
    const [showMoreButtons, setShowMoreButtons] = useState({ A2: false, B2: false, C2: false, D2: false })
    const [isDisabled, setIsDisabled] = useState({
        A1: false,
        B1: false,
        A2: true,
        B2: true,
        C2: true,
        D2: true
    })
    const [isSelected, setIsSelected] = useState({
        A1: false,
        B1: false,
        A2: false,
        B2: false,
        C2: false,
        D2: false,
        A3: false,
        B3: false,
        C3: false
    })


    const child = {
        A1: ['A2', 'B2'],
        B1: ['C2', 'D2'],
        A2: ['A3', 'B3', 'C3'],
        B2: ['A3', 'B3', 'C3'],
        C2: ['A3', 'B3', 'C3'],
        D2: ['A3', 'B3', 'C3']
    }

    const parent = {
        A1: null,
        B1: null,
        A2: 'A1',
        B2: 'A1',
        C2: 'B1',
        D2: 'B1'
    }


    const [typeOfInput, setTypeOfInput] = useState('empty');
    const [typeOfGraph, setTypeOfGraph] = useState('empty');


    const handleSelected = (name) => {
        setIsSelected(prevState => ({ ...prevState, [name]: !prevState[name] }));
        if (Array.isArray(child[name])) {
            child[name].forEach((item) => {
                setIsSelected(prevState => ({ ...prevState, [item]: false }));
            })
        }
    }

    const handleIsSelectedSibling = (name) => {
        setIsSelected(prevState => ({ ...prevState, [name]: !prevState[name] }));
        ["A3", "B3", "C3"].filter(e => e !== name).forEach(item => {
            setIsSelected(prevState => ({...prevState, [item]: false}));
        })
    }

    function handleShowButtons(name) {
        setShowButtons(prevState => ({ ...prevState, [name]: !prevState[name] }));
        if (Array.isArray(child[name])) {
            child[name].forEach((item) => {
                setShowMoreButtons(prevState => ({ ...prevState, [item]: false }));
            })
        }
    }

    const handleShowMoreButtons = (name) => {
        setShowMoreButtons(prevState => ({ ...prevState, [name]: !prevState[name] }));
    };

    function handleOnlyEnable(name) {
        setIsDisabled(prevState => {

            const newState = Object.keys(prevState).reduce((state, key) => {
                state[key] = true;
                return state;
            }, {});

            newState[name] = false;

            return newState;
        });
    }

    function handleDisabledButtons(name) {
        if (!isSelected[name]) {
            handleOnlyEnable(name);

            if (Array.isArray(child[name])) {
                child[name].forEach((item) => {
                    setIsDisabled(prevState => ({ ...prevState, [item]: !prevState[item] }));
                });
            }

            if (parent[name] != null) setIsDisabled(prevState => ({ ...prevState, [parent[name]]: !prevState[parent[name]] }));
        }
        else {
            Object.keys(parent).forEach((item) => {
                if (parent[name] === parent[item]) {
                    setIsDisabled(prevState => ({ ...prevState, [item]: false }));
                }
            });
        }
    }

    function handleTypeOfInput(input) {
        if (typeOfInput !== input) setTypeOfInput(input);
        else setTypeOfInput('empty');
    }

    function handleTypeOfGraph(graph) {
        if (typeOfGraph !== graph) setTypeOfGraph(graph);
        else setTypeOfGraph('empty');
    }

    return (
        <ScrollView>
            <Pressable
                style={({ pressed }) => [
                    styles.button,
                    styles.button1,
                    pressed && { opacity: 0.8},
                    isSelected.A1 && {borderWidth: 2},
                    isDisabled.A1 && styles.buttonDisable
                ]}
                onPress={() => {
                    handleShowButtons("A1");
                    handleDisabledButtons("A1");
                    handleSelected("A1");
                    handleTypeOfInput("random");
                    setTypeOfGraph("empty");
                }}
                disabled={isDisabled.A1}
            >
                <Text style={[styles.buttonText, isDisabled.A1 && {color: "#A9A9A9"}]}>Khởi tạo ngẫu nhiên</Text>
            </Pressable>
            {showsButtons.A1 && (
                <View>
                    <Pressable
                        style={({ pressed }) => [
                            styles.button,
                            styles.button2,
                            pressed && { backgroundColor: "gray" },
                            isSelected.A2 && {borderWidth: 2},
                            isDisabled.A2 && styles.buttonDisable
                        ]}
                        onPress={() => {
                            handleShowMoreButtons("A2");
                            handleDisabledButtons("A2");
                            handleSelected("A2");
                            setTypeOfGraph("empty");
                        }}
                        disabled={isDisabled.A2}
                    >
                        <Text style={[styles.buttonText, isDisabled.A2 && {color: "#A9A9A9"}]}>Vô hướng</Text>

                    </Pressable>
                    {
                        showMoreButtons.A2 && (
                            <View>
                                <Pressable
                                    style={[styles.button, styles.button3,
                                        isSelected.A3 && {borderWidth: 2}
                                    ]}
                                    onPress={() => {
                                        handleIsSelectedSibling("A3")
                                        handleTypeOfGraph("UndirectedSimpleGraph")}
                                    }
                                        >
                                    <Text style={styles.buttonText}>Đơn đồ thị vô hướng</Text>
                                </Pressable>
                                <Pressable
                                    style={[styles.button, styles.button3,
                                        isSelected.B3 && {borderWidth: 2}
                                    ]}
                                    onPress={() => {
                                        handleIsSelectedSibling("B3")
                                        handleTypeOfGraph("UndirectedMultiGraph")}
                                    }
                                        >
                                    <Text style={styles.buttonText}>Đa đồ thị vô hướng</Text>
                                </Pressable>
                                <Pressable
                                    style={[styles.button, styles.button3,
                                        isSelected.C3 && {borderWidth: 2}
                                    ]}
                                    onPress={() => {
                                        handleIsSelectedSibling("C3")
                                        handleTypeOfGraph("PseudoGraph")}
                                    }
                                        >
                                    <Text style={styles.buttonText}>Giả đồ thị</Text>
                                </Pressable>
                            </View>
                        )
                    }
                    <Pressable
                        onPress={() => {
                            handleShowMoreButtons("B2");
                            handleDisabledButtons("B2");
                            handleSelected("B2");
                            setTypeOfGraph("empty");
                        }}
                        style={({ pressed }) => [
                            styles.button,
                            styles.button2,
                            isSelected.B2 && {borderWidth: 2},
                            pressed && { backgroundColor: "gray" },
                            isDisabled.B2 && styles.buttonDisable
                        ]}
                        disabled={isDisabled.B2}
                    >
                        <Text style={[styles.buttonText, isDisabled.B2 && {color: "#A9A9A9"}]}>Có hướng</Text>
                    </Pressable>
                    {
                        showMoreButtons.B2 && (
                            <View>
                                <Pressable
                                    style={[styles.button, styles.button3
                                        ,isSelected.A3 && {borderWidth: 2}
                                    ]}
                                    onPress={() => {
                                        handleIsSelectedSibling("A3");   
                                        handleTypeOfGraph("DirectedSimpleGraph")}
                                    }
                                        >
                                    <Text style={styles.buttonText}>Đơn đồ thị có hướng</Text>
                                </Pressable>
                                <Pressable
                                    style={[styles.button, styles.button3
                                        ,isSelected.B3 && {borderWidth: 2}
                                    ]}
                                    onPress={() => {
                                        handleIsSelectedSibling("B3");   
                                        handleTypeOfGraph("DirectedMultiNoLoopGraph")}
                                    }
                                        >
                                    <Text style={styles.buttonText}>Đa đồ thị có hướng không khuyên</Text>
                                </Pressable>
                                <Pressable
                                    style={[styles.button, styles.button3
                                        ,isSelected.C3 && {borderWidth: 2}
                                    ]}
                                    onPress={() => {
                                        handleIsSelectedSibling("C3");   
                                        handleTypeOfGraph("DirectedMultiLoopGraph")}
                                    }
                                        >
                                    <Text style={styles.buttonText}>Đa đồ thị có hướng có khuyên</Text>
                                </Pressable>
                            </View>
                        )
                    }
                </View>
            )}
            <Pressable
                onPress={() => {
                    handleShowButtons("B1");
                    handleDisabledButtons("B1");
                    handleSelected("B1");
                    handleTypeOfInput("create");
                    setTypeOfGraph("empty");
                }}
                style={({ pressed }) => [
                    styles.button,
                    styles.button1,
                    pressed && { opacity: 0.9 },
                    isSelected.B1 && {borderWidth: 2},
                    isSelected.B1 && {borderWidth: 2},
                    isDisabled.B1 && styles.buttonDisable
                ]}
                disabled={isDisabled.B1}
            >
                <Text style={[styles.buttonText, isDisabled.B1 && {color: "#A9A9A9"}]}>Tự khởi tạo</Text>
            </Pressable>
            {showsButtons.B1 && (
                <View>
                    <Pressable
                        onPress={() => {
                            handleShowMoreButtons("C2");
                            handleDisabledButtons("C2");
                            handleSelected("C2");
                            setTypeOfGraph("empty");
                        }}
                        style={
                            ({ pressed }) => [
                                styles.button,
                                styles.button2,
                                pressed && { backgroundColor: "gray" },
                                isSelected.C2 && {borderWidth: 2},
                                isDisabled.C2 && styles.buttonDisable
                            ]}
                        disabled={isDisabled.C2}
                    >
                        <Text style={[styles.buttonText, isDisabled.C2 && {color: "#A9A9A9"}]}>Vô hướng</Text>
                    </Pressable>
                    {
                        showMoreButtons.C2 && (
                            <View>
                                <Pressable
                                    onPress={() => {
                                        handleIsSelectedSibling("A3")    
                                        handleTypeOfGraph("UndirectedSimpleGraph")}
                                    }
                                    style={[styles.button, styles.button3
                                        ,isSelected.A3 && {borderWidth: 2}
                                    ]}
                                >
                                    <Text style={styles.buttonText}>Đơn đồ thị vô hướng</Text>
                                </Pressable>
                                <Pressable
                                    onPress={() => {
                                        handleIsSelectedSibling("B3")    
                                        handleTypeOfGraph("UndirectedMultiGraph")}
                                    }
                                    style={[styles.button, styles.button3
                                        ,isSelected.B3 && {borderWidth: 2}
                                    ]}
                                >
                                    <Text style={styles.buttonText}>Đa đồ thị vô hướng</Text>
                                </Pressable>
                                <Pressable
                                    onPress={() => {
                                        handleIsSelectedSibling("C3")    
                                        handleTypeOfGraph("PseudoGraph")}
                                    }
                                    style={[styles.button, styles.button3
                                        ,isSelected.C3 && {borderWidth: 2}
                                    ]}
                                >
                                    <Text style={styles.buttonText}>Gỉa đồ thị</Text>
                                </Pressable>
                            </View>
                        )
                    }
                    <Pressable
                        onPress={() => {
                            handleShowMoreButtons("D2");
                            handleDisabledButtons("D2");
                            handleSelected("D2");
                            setTypeOfGraph("empty");
                        }}
                        style={({ pressed }) => [
                            styles.button,
                            styles.button2,
                            isSelected.D2 && {borderWidth: 2},
                            pressed && { backgroundColor: "gray" },
                            isDisabled.D2 && styles.buttonDisable
                        ]}
                        disabled={isDisabled.D2}
                    >
                        <Text style={[styles.buttonText, isDisabled.D2 && {color: "#A9A9A9"}]}>Có hướng</Text>
                    </Pressable>
                    {
                        showMoreButtons.D2 && (
                            <View>
                                <Pressable
                                    onPress={() => {
                                        handleIsSelectedSibling("A3");
                                        handleTypeOfGraph("DirectedSimpleGraph")}
                                    }
                                    style={[styles.button, styles.button3
                                        ,isSelected.A3 && {borderWidth: 2}
                                    ]}
                                >
                                    <Text style={styles.buttonText}>Đơn đồ thị có hướng</Text>
                                </Pressable>
                                <Pressable
                                    onPress={() => {
                                        handleIsSelectedSibling("B3");
                                        handleTypeOfGraph("DirectedMultiNoLoopGraph")}
                                    }
                                    style={[styles.button, styles.button3
                                        ,isSelected.B3 && {borderWidth: 2}
                                    ]}
                                >
                                    <Text style={styles.buttonText}>Đa đồ thị có hướng không khuyên</Text>
                                </Pressable>
                                <Pressable
                                    onPress={() => {
                                        handleIsSelectedSibling("C3");
                                        handleTypeOfGraph("DirectedMultiLoopGraph")}
                                    }
                                    style={[styles.button, styles.button3
                                        ,isSelected.C3 && {borderWidth: 2}
                                    ]}    
                                
                                >
                                    <Text style={styles.buttonText}>Đa đồ thị có hướng có khuyên</Text>
                                </Pressable>
                            </View>
                        )
                    }
                </View>
            )}

            <Pressable
                disabled={typeOfGraph === 'empty' || typeOfInput === 'empty'}
                onPress={() => navigation.navigate('DrawGraph', {
                    typeOfGraph: typeOfGraph,
                    typeOfInput: typeOfInput
                })}
                style={({pressed}) => [
                    styles.button,
                    styles.buttonSelect,
                    pressed && {opacity: 0.9},
                    (typeOfGraph === 'empty' || typeOfInput === 'empty') && styles.buttonDisable
                ]}
            >
                <Text style={[styles.buttonText, (typeOfGraph === 'empty' || typeOfInput === 'empty') && {color: "#A9A9A9"}]}>Chọn</Text>
            </Pressable>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    buttonDisable: {
        backgroundColor: "#C9D7DD",
    },
    button1: {
        backgroundColor: "#38419D"
    },
    button2: {
        backgroundColor: "#3887BE"
    },
    button3: {
        backgroundColor: "#59B4C3"
    },
    buttonSelect: {
        backgroundColor: "#365486"
    },

    button: {
        padding: 10,
        margin: 5,
        borderRadius: 5,
        backgroundColor: "blue"
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
    },
})

export default InputGraph;