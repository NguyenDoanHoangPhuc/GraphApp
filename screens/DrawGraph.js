import React, { useState, useEffect } from 'react';
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

function DrawGraph({ route, navigation }) {
    const { typeOfGraph, typeOfInput } = route.params;

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

    useEffect(() => {
        if (isUpdateGraph) {
            if (parseInt(updateVertexNum) > 0 && parseInt(updateEdgeNum) > 0) {
                let newGraph = createInstance(typeOfGraph);
                newGraph.createVertex(parseInt(updateVertexNum));
                newGraph.createRandomEdge(parseInt(updateEdgeNum));
                setMyGraph(newGraph);
                setVerticesNum(updateVertexNum);
                setEdgesNum(updateEdgeNum);
                setGraphKey(prev => prev + 1);
                setUpdateVertexNum("0");
                setUpdateEdgeNum("0");
            }
            setIsUpdateGraph(false);
            ToastAndroid.showWithGravityAndOffset(
                "Kéo thả đỉnh để tối ưu đồ thị",
                ToastAndroid.LONG, // This will show the toast for a long duration (about 3.5 seconds). There's no built-in way to show it for exactly 10 seconds.
                ToastAndroid.BOTTOM,
                25,
                50
              );
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
            ToastAndroid.showWithGravityAndOffset(
                "Thêm đỉnh thành công!",
                ToastAndroid.LONG, // This will show the toast for a long duration (about 3.5 seconds). There's no built-in way to show it for exactly 10 seconds.
                ToastAndroid.BOTTOM,
                25,
                50
              );
        }
    }, [isUpdateVertex]);

    useEffect(() => {
        if (isUpdateEdge) {
            if (beginId != "-1" && endId !== "-1")
                if (parseInt(beginId) <= parseInt(verticesNum) && parseInt(endId) <= parseInt(verticesNum)) {
                    let newGraph = myGraph.deepCopy();
                    newGraph.addEdgeById(parseInt(beginId), parseInt(endId));
                    setMyGraph(newGraph);
                    setGraphKey(prev => prev + 1);
                    setEdgesNum(prev => parseInt(prev) + 1 + "");
                    setBeginId("-1");
                    setEndId("-1");
                    ToastAndroid.showWithGravityAndOffset(
                        "Thêm cung thành công!",
                        ToastAndroid.LONG, // This will show the toast for a long duration (about 3.5 seconds). There's no built-in way to show it for exactly 10 seconds.
                        ToastAndroid.BOTTOM,
                        25,
                        50
                      );
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
        'UndirectedMultiGraph': 'Đơn đồ thị có hướng',
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

    const checkDirectGraph = (graph) => {
        if (graph == 'UndirectedSimpleGraph' ||
            graph == 'UndirectedMultiGraph' ||
            graph == 'PseudoGraph')
            return 'undirected';
        else return 'directed';
    }

   

    return (

        <SafeAreaView style={{ flex: 1 }}>


            <Modal
                visible={modalVisible}
                transparent={true}
            >
                <View style={styles.centeredView}>
                    <View
                        style={styles.modalView}
                    >
                        <Text style={styles.textModal}>Khởi tạo đồ thị</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={text => setUpdateVertexNum(text)}
                            inputMode="numeric"
                            placeholderTextColor={'black'}
                            placeholder='Nhập số đỉnh'
                        />
                        <TextInput
                            style={styles.input}
                            onChangeText={text => setUpdateEdgeNum(text)}
                            inputMode="numeric"
                            placeholder='Nhập số cung'
                            placeholderTextColor={'black'}
                        />

                        <Pressable
                            onPress={() => {
                                setIsUpdateGraph(true);
                                setModalVisible(false);
                            }}
                            style={styles.optionsButton}
                        >
                            <Text style={styles.textModal}>Okay</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>

            <Modal
                visible={modalEdgeVisible}
                transparent={true}
            >
                <View style={styles.centeredView}>
                    <View
                        style={styles.modalView}
                    >
                        <Text style={styles.textModal}>Thêm cung</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={text => setBeginId(text)}
                            inputMode="numeric"
                            placeholder='Đỉnh bắt đầu'
                            placeholderTextColor={'black'}
                        />
                        <TextInput
                            style={styles.input}
                            onChangeText={text => setEndId(text)}
                            inputMode="numeric"
                            placeholder='Đỉnh kết thúc'
                            placeholderTextColor={'black'}
                        />

                        <Pressable
                            onPress={() => {
                                setIsUpdateEdge(true);
                                setModalEdgeVisible(false);
                            }}
                            style={styles.optionsButton}
                        >
                            <Text style={styles.textModal}>Chọn</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>


            <View style={[styles.buttonLayout]}>
                <Text style={styles.headerText}>{graphName[typeOfGraph]}</Text>
                
                <View style = {[styles.buttonContainer]}>

                
                 


                    {typeOfInput === "random" && <Pressable
                        style={styles.optionsButton}
                        onPress={() => setModalVisible(true)}
                    >
                        <Text style={styles.optionsText}>khởi tạo</Text>
                    </Pressable>}
                    <Pressable
                        style={styles.optionsButton}
                        onPress={() => {
                            setIsUpdateVertex(true);
                        }}
                    >
                        <Text style={styles.optionsText}>Thêm đỉnh</Text>
                    </Pressable>
                    <Pressable
                        style={styles.optionsButton}
                        onPress={() => setModalEdgeVisible(true)}
                    >
                        <Text style={styles.optionsText}>Thêm cung</Text>
                    </Pressable>



                
                </View>
            </View>

            <View style={styles.graphLayout}>

                <Svg>
                    {(myGraph !== null) && <RenderGraph data={myGraph} type={checkDirectGraph(typeOfGraph)} key={graphKey} />}
                </Svg>
            </View>

            <View style={styles.navigateLayout}>
                <Pressable
                    style={styles.optionsButton}
                    onPress={() => navigation.navigate('InputGraphSearch', {
                        graph: myGraph,
                        typeOfGraph: typeOfGraph
                    })}
                >
                    <Text style={styles.optionsText}>Tới duyệt đồ thị</Text>
                </Pressable>
            </View>

        </SafeAreaView>


    );
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },

    modalView: {
        margin: 10,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: '80%'
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    headerText: {

        fontSize: 16,
        color: 'black',
        fontWeight: 'bold',
        textTransform: 'uppercase',

    },
    modalText: {

        textAlign: 'center',
    },
    input: {
        height: 50,
        margin: 10,
        padding: 5,
        borderWidth: 1,
        color: 'black',
        width: '80%'
    },
    textModal: {
        color: 'black',
        textTransform: 'uppercase',
        fontSize: 16
    },

    //button options+
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        
    },
    optionsButton: {
        padding: 10,
        marginHorizontal: 5,
        marginVertical: 10,
        borderRadius: 10,
        borderWidth: 1,
    },
    optionsText: {
        color: 'black',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 12,
        textTransform: 'uppercase'
    },
    buttonLayout: {
        flex: 0.2,
       
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    graphLayout: {
        flex: 0.7,
        borderWidth: 1
    },
    navigateLayout: {
        flex: 0.1,
        
        margin: 20
    }
});



export default DrawGraph;