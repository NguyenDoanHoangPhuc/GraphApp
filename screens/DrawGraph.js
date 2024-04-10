import React, { useState, useEffect, useCallback } from 'react';
import {
    Text,
    View,
    Image,
    ImageBackground,
    TouchableOpacity,
    StyleSheet,
    Modal,
    Pressable,
    TextInput,
    Alert,
    ScrollView,
    SafeAreaView,
    ToastAndroid
} from 'react-native'
import Swiper from 'react-native-swiper';
import { Edge, Vertex, Graph } from '../graph_data/Graph';
import { UndirectedMultiGraph, UndirectedSimpleGraph, PseudoGraph } from '../graph_data/Graph';
import { DirectedSimpleGraph, DirectedMultiNoLoopGraph, DirectedMultiLoopGraph } from '../graph_data/Graph';
import RenderGraph from '../graph_render/RenderGraph';
import Svg, { Circle, Text as SvgText, G, Line, Path, Polygon } from 'react-native-svg';
import { createTestScheduler } from 'jest';
import parseErrorStack from 'react-native/Libraries/Core/Devtools/parseErrorStack';
import color from '../constants/color';
import image from '../constants/image';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';



function DrawGraph({ route, navigation }) {
    const { typeOfGraph, typeOfInput, showWeight } = route.params;
   
  
    const [modalVisible, setModalVisible] = useState(typeOfInput === "random" ? true : false);
    const [modalEdgeVisible, setModalEdgeVisible] = useState(false);

    const [verticesNum, setVerticesNum] = useState("0");
    const [edgesNum, setEdgesNum] = useState("0");
    const [myGraph, setMyGraph] = useState(null);
    const [graphKey, setGraphKey] = useState(0);

    const [isUpdateGraph, setIsUpdateGraph] = useState(false);
    const [updateVertexNum, setUpdateVertexNum] = useState("0");
    const [updateEdgeNum, setUpdateEdgeNum] = useState("0");


    const [isUpdateVertex, setIsUpdateVertex] = useState(false);

    const [isUpdateEdge, setIsUpdateEdge] = useState(false);
    const [beginId, setBeginId] = useState("-1");
    const [endId, setEndId] = useState("-1");
    const [weight, setWeight] = useState("0");
    const [maxWeight, setMaxWeight] = useState(20);

    useEffect(() => {
        if (isUpdateGraph) {
            if (parseInt(updateVertexNum) > 0 && parseInt(updateEdgeNum) > 0) {
                let newGraph = createInstance(typeOfGraph);
                newGraph.createVertex(parseInt(updateVertexNum));
                newGraph.createRandomEdge(parseInt(updateEdgeNum));
                newGraph.addRandomWeight(parseInt(maxWeight));
                
                
                setMyGraph(newGraph);
                setVerticesNum(updateVertexNum);
                setEdgesNum(updateEdgeNum);
                setGraphKey(prev => prev + 1);
                setUpdateVertexNum("0");
                setUpdateEdgeNum("0");

            }
            setIsUpdateGraph(false);
            
        }
    }, [isUpdateGraph, updateVertexNum, updateEdgeNum]);




    useEffect(() => {
        if (isUpdateVertex) {
            let newGraph = myGraph ? myGraph.deepCopy() : createInstance(typeOfGraph);

            newGraph.addVertexById(parseInt(verticesNum) + 1, 50, 50);
            setMyGraph(newGraph);
            setGraphKey(prev => prev + 1);
            setVerticesNum(prev => parseInt(prev) + 1 + "");
            setIsUpdateVertex(false);
            
        }
    }, [isUpdateVertex]);

    useEffect(() => {
        if (isUpdateEdge) {
            if (beginId != "-1" && endId !== "-1")
                if (parseInt(beginId) <= parseInt(verticesNum) && parseInt(endId) <= parseInt(verticesNum)) {
                    let newGraph = myGraph.deepCopy();
                    
                    if (showWeight){
                        newGraph.addEdgeByIdAndWeight(parseInt(beginId), parseInt(endId), parseInt(weight));
                    }
                    else newGraph.addEdgeById(parseInt(beginId), parseInt(endId));
                    
                    
                    
                    setMyGraph(newGraph);
                    setGraphKey(prev => prev + 1);
                    setEdgesNum(prev => parseInt(prev) + 1 + "");
                    setBeginId("-1");
                    setEndId("-1");
                    setWeight("0");
                }
            setIsUpdateEdge(false);

        }
    }, [isUpdateEdge, beginId, endId])




    const classMap = {
        'UndirectedSimpleGraph': UndirectedSimpleGraph,
        'UndirectedMultiGraph': UndirectedMultiGraph,
        'PseudoGraph': PseudoGraph,
        'DirectedSimpleGraph': DirectedSimpleGraph,
        'DirectedMultiNoLoopGraph': DirectedMultiNoLoopGraph,
        'DirectedMultiLoopGraph': DirectedMultiLoopGraph
    }

    const graphName = {
        'UndirectedSimpleGraph': 'Đơn đồ thị vô hướng',
        'UndirectedMultiGraph': 'Đa đồ thị vô hướng',
        'PseudoGraph': 'Giả đồ thị',
        'DirectedSimpleGraph': 'Đơn đồ thị có hướng',
        'DirectedMultiNoLoopGraph': 'Đa đồ thị có hướng (không khuyên)',
        'DirectedMultiLoopGraph': 'Đa đồ thị có hướng (có khuyên)'
    }

    function createInstance(className) {
        const Class = classMap[className];
        if (Class) {

            return new Class();
        }
        throw new Error(`Undefined class for string: ${className}`);
    }

   
    const handleModalClose = useCallback(() => {
        setModalVisible(false);
    }, []);

    

    return (

        <SafeAreaView style={styles.mainContainer}>


            <Modal
                animationType='fade'
                visible={modalVisible}
                transparent={true}
                onRequestClose={() => {
                    setModalVisible(false);
                  }}
            >
                <View style = {styles.overlayModal}>
                    <View
                        style={styles.modalContent}
                    >
                        <Pressable 
                        
                            style={styles.modalCloseButton}
                            onPress = {() => handleModalClose()}
                        >
                            <FontAwesomeIcon icon="fa-xmark" size={26} color={color.modalPrimary}/>
                        </Pressable>


                        <Text style={styles.modalHeader}>Khởi tạo đồ thị</Text>
                        <Text style={styles.modalDescription}>Nhập vào số đỉnh và số cung của đồ thị để khởi tạo</Text>
                        <Text style={styles.modalInputTitle}>Số đỉnh</Text>
                        <TextInput
                            style={styles.modalInput}
                            onChangeText={text => setUpdateVertexNum(text)}
                            inputMode="numeric"
                            placeholderTextColor={color.modalInputPlaceHolder}
                            placeholder='Nhập số đỉnh...'
                            color="white"
                        />

                        <Text style={styles.modalInputTitle}>Số cung</Text>
                        <TextInput
                            style={styles.modalInput}
                            onChangeText={text => setUpdateEdgeNum(text)}
                            inputMode="numeric"
                            placeholder='Nhập số cung...'
                            placeholderTextColor={color.modalInputPlaceHolder}
                            color="white"
                        />


                        {showWeight && <View>
                            <Text style={styles.modalInputTitle}>Trọng số tối đa</Text>
                            <TextInput
                                style={styles.modalInput}
                                onChangeText={text => setMaxWeight(text)}
                                inputMode="numeric"
                                placeholder='Nhập trọng số tối đa...'
                                color="white"
                                placeholderTextColor={color.modalInputPlaceHolder}
                            />
                        </View>}

                        <View style = {styles.modalButtonContainer}>

                        <Pressable
                            onPress={() => {
                                setModalVisible(false);
                            }}
                            style={styles.modalCancelButton}
                        >
                            <Text style={styles.modalInputTitle}>Cancel</Text>
                        </Pressable>
                        <Pressable
                            onPress={() => {
                                setIsUpdateGraph(true);
                                setModalVisible(false);
                            }}
                            style={styles.modalSaveButton}
                        >
                            <Text style={styles.modalInputTitle}>Okay</Text>
                        </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>

            <Modal
                animationType='fade'
                visible={modalEdgeVisible}
                transparent={true}
                onRequestClose={() => {
                    setModalEdgeVisible(false);
                  }}
            >
                <View style={styles.overlayModal}>
                    <View
                        style={styles.modalContent}
                    >
                        <Text style={styles.modalHeader}>Thêm cung</Text>
                        <Text style={styles.modalDescription}>Nhập đỉnh vào và đỉnh cuối để thêm cung</Text>
                        <Text style={styles.modalInputTitle}>Đỉnh bắt đầu</Text>
                        <TextInput
                            style={styles.modalInput}
                            onChangeText={text => setBeginId(text)}
                            inputMode="numeric"
                            placeholder='Nhập đỉnh bắt đầu'
                            color="white"
                            placeholderTextColor={color.modalInputPlaceHolder}
                        />
                         <Text style={styles.modalInputTitle}>Đỉnh kết thúc</Text>
                        <TextInput
                            style={styles.modalInput}
                            onChangeText={text => setEndId(text)}
                            inputMode="numeric"
                            placeholder='Nhập đỉnh kết thúc...'
                            color="white"
                            placeholderTextColor={color.modalInputPlaceHolder}
                        />


                        {showWeight && <View>
                            <Text style={styles.modalInputTitle}>Trọng số</Text>
                            <TextInput
                                style={styles.modalInput}
                                onChangeText={text => setWeight(text)}
                                inputMode="numeric"
                                placeholder='Nhập trọng số...'
                                color="white"
                                placeholderTextColor={color.modalInputPlaceHolder}
                            />
                        </View>}


                        <View style={styles.modalButtonContainer}>
                            <Pressable
                                onPress={() => {
                                    setModalEdgeVisible(false);
                                }}
                                style={styles.modalCancelButton}
                            >
                                <Text style={styles.modalInputTitle}>Cancel</Text>
                            </Pressable>

                            <Pressable
                                onPress={() => {
                                    setIsUpdateEdge(true);
                                    setModalEdgeVisible(false);
                                }}
                                style={styles.modalSaveButton}
                            >
                                <Text style={styles.modalInputTitle}>Chọn</Text>
                            </Pressable>

                        </View>
                    </View>
                </View>
            </Modal>


            <View style = {styles.headerLayout}>
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
                <Text style={styles.headerText}>{graphName[typeOfGraph]}</Text>
            </View>

            <View style={styles.graphLayout}>
                <View style = {styles.graphContent}>

                    <View style={styles.graphHeader}>
                        <View style={[styles.graphCircle, {backgroundColor: '#7D0319'}]}></View>
                        <View style={[styles.graphCircle, {backgroundColor: '#A37701'}]}></View>
                        <View style={[styles.graphCircle, {backgroundColor: '#027808'}]}></View>
                    </View>
                    <View style={styles.graphFrame}>
                        <Svg>
                            {(myGraph !== null) && <RenderGraph data={myGraph} type={typeOfGraph} key={graphKey} showWeight={showWeight} lock = {false}/>}
                        </Svg>

                    </View>
                </View>
            </View>


            <View style={[styles.buttonLayout]}>

            
                <Pressable
                    style={styles.circleButton}
                    onPress={() => {
                        setIsUpdateVertex(true);
                    }}
                >
                    <Image
                        
                        source = {image.addVertexLogo}
                        style = {{width: 30, height: 30}}
                    />
                </Pressable>
                <Pressable
                    style={styles.circleButton}
                    onPress={() => setModalEdgeVisible(true)}
                >

                    <Image
                   
                        source = {image.addEdgeLogo}
                        style ={{width: 30, height: 30}}
                    />
                </Pressable>

                {typeOfInput === "random" && <Pressable
                    style={styles.generateButton}
                    onPress={() => setModalVisible(true)}
                >
                    <Text style={styles.generateButtonText}>Tạo mới</Text>
                </Pressable>}



            </View>

            <View style={styles.navigateLayout}>
                <Pressable
                    style={styles.navigateButton}
                    onPress={() => navigation.navigate('InputGraphSearch', {
                        graph: myGraph,
                        typeOfGraph: typeOfGraph
                    })}
                >
                    <Text style={styles.navigateButtonText}>Tới duyệt đồ thị</Text>
                    
                </Pressable>
                <View style ={styles.navigateButtonShadow}></View>
            </View>

        </SafeAreaView>


    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: color.primaryBackground,
        
    },
    headerLayout: {
        height: '10%',
        justifyContent: 'flex-end',
        alignItems: 'center',
        display: 'flex',
    },
    graphLayout: {
       height: '60%',
       justifyContent: 'center',
       alignItems: 'center',

       
    },
    buttonLayout: {
        height: '10%',
        
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    navigateLayout: {
       height: '20%',
       

       alignItems: 'center',
    },


    // Header
    headerText: {
        fontSize: 20,
        color: 'white',
    
        fontFamily: 'Montserrat-Black',
        textAlign: 'center'
    },


    // Modal
    overlayModal: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 39, 0.4)',

        justifyContent: 'center',
        alignItems: 'center',
    },

    modalContent: {
        width: '90%',
        
        backgroundColor: color.primaryBackground,
        
        borderColor: color.modalPrimary,
        borderWidth: 1,
        padding: 20
    },

    modalHeader: {
        fontSize: 20,
        color: 'white',
        fontFamily: 'Montserrat-Bold',
        
    },

    modalDescription: {
        fontSize: 14,
        color: 'white',
        fontFamily: 'Montserrat-Regular',
        marginVertical: 18
    },
    
    modalInput: {
        width: '100%',
        height: 60,
        backgroundColor: color.modalInput,
        borderRadius: 100,
        marginVertical: 10,
        paddingLeft: 20,
    },

    modalInputTitle: {
        fontSize: 14,
        fontFamily: 'Roboto-Medium',
        color: 'white',
    },

    modalCloseButton: {
        width: 40,
        height: 40,

        position: 'absolute',
        top: 10,
        right: 0
    },
    
    modalCancelButton: {
        height: 50,
        width: '50%',

        borderRadius: 30,
        backgroundColor: color.primaryBackground,
        justifyContent: 'center',
        alignItems: 'center',
    },

    modalSaveButton: {
        height: 50,
        width: '50%',

        borderRadius: 30,
        backgroundColor: color.modalPrimary,
        justifyContent: 'center',
        alignItems: 'center',
    },

    modalButtonContainer: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 10
    },

    // Graph
    graphContent: {
        borderRadius: 20,
        width: '94%',
        borderWidth: 1,
        borderColor: color.graphFrameStroke,
        overflow: 'hidden'
    },
    graphHeader: {
        paddingLeft: 20,
        height: 30,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: color.graphHeader,
    },  
    graphFrame: {
       
        aspectRatio: 1,
    
        backgroundColor: color.graphContent
    },
    graphCircle: {
        width: 14,
        aspectRatio: 1,
        borderRadius: 30,

        marginRight: 8
    },

    // Button
    circleButton: {
        height: '80%',
        aspectRatio: 1,
        marginHorizontal: 10,

        borderRadius: 100,
        backgroundColor: color.primaryBackground,
        borderColor: '#C48B57',
        borderWidth: 2,

        justifyContent: 'center',
        alignItems: 'center',
    },
    generateButton: {
        width: '50%',
        height: '80%',

        borderRadius: 30,
        backgroundColor: color.primaryBackground,
        borderColor: '#C48B57',
        borderWidth: 2,
        
        justifyContent: 'center',
        alignItems: 'center',
    },
    generateButtonText: {
        fontSize: 18,
        fontFamily: 'Montserrat-Bold',
        textAlign: 'center',
        color: 'white'
    },
    navigateButton: {
        height: '40%',
        width: '90%',

        borderRadius: 30,
        backgroundColor: '#A1683C',
        justifyContent: 'center',
        alignItems: 'center',

        marginTop: 20,
        zIndex: 2
    },
    navigateButtonText: {
        fontSize: 18,
        fontFamily: 'Montserrat-Bold',
        color: 'black',
    },
    navigateButtonShadow: {
        height: '40%',
        width: '90%',

        borderRadius: 30,
        backgroundColor: 'gray',

        position: 'absolute',
        top: 28,
        right: 16,
        zIndex: 1
    }
});



export default DrawGraph;