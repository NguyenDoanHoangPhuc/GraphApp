import React, { useDebugValue } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Pressable, ImageBackground, FlatList, ScrollView, Dimensions, Svg} from 'react-native';
import { ToastAndroid } from 'react-native';
import Graph, { UndirectedSimpleGraph, UndirectedMultiGraph, PseudoGraph, Vertex } from '../graph_data/Graph'
import { DirectedSimpleGraph, DirectedMultiLoopGraph, DirectedMultiNoLoopGraph } from '../graph_data/Graph';
import { AdjacencyMatrix } from '../graph_data/GraphRepresentation';
import {EdgeList } from '../graph_data/GraphRepresentation2';
import { useState, useEffect, useRef } from 'react';
//Algorithm
import { DFS, BFS, DFSRecursion, Topo} from '../graph_data/GraphAlgorithm';

import RenderGraph from '../graph_render/RenderGraph';
import color from '../constants/color';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { Alert } from 'react-native';



//Tao lop thuat toan tuong ung
const classMap = {
    'DFS': DFS,
    'BFS': BFS,
    'DFS-Recursion': DFSRecursion,
    'Topo': Topo
}

const className = {
    'DFS': 'Duyệt theo chiều sâu',
    'BFS': 'Duyệt theo chiều rộng',
    'DFS-Recursion': 'Duyệt theo chiều sâu đệ quy',
    'Topo': 'Duyệt theo thứ tự Topo'
}


function createInstance(className, myGraph, typeOfGraph) {
    const Class = classMap[className];
    if (Class) {
        return new Class(myGraph, typeOfGraph);
    }
    throw new Error(`Undefined class for string: ${className}`);
}



const screenWidth = Dimensions.get('window').width;

function GraphSearch({ route, navigation }) {
    const { algorithm, graph, typeOfGraph, beginVertex } = route.params;


    const getAlgorithmList = (algorithm) => {
        const a = createInstance(algorithm, graph, typeOfGraph);
        return a.execute(beginVertex);
    }

    
    const list = getAlgorithmList(algorithm);
    console.log(list);


    const [isChosenVertex, setIsChosenVertex] = useState(Array(list.length).fill(false));
    const [currentVertex, setCurrentVertex] = useState(0);
    const [myGraph, setMyGraph] = useState(graph);
    const [graphKey, setGraphKey] = useState(graph);

    const scrollViewRef = useRef();

    const itemWidth = 60; // width of your item
    const itemSpacing = 30; // spacing between items (marginHorizontal)

    


    const colorVertexBox = [
        '#715660',
        '#846470',
        '#566071',
        '#727f96',
        '#c39f72',
        '#d5bf95',
        '#667762',
        '#879e82'
    ]

    const highlightVertexColor = (changeId) => {
        const newGraph = myGraph.deepCopy();
        newGraph.vertices[changeId-1] = new Vertex(changeId, newGraph.vertices[changeId-1].x, newGraph.vertices[changeId-1].y, '#F4FFAA');

        setMyGraph(newGraph);
        setGraphKey(prev => prev + 1);
    }


    
    const resetVertexColor = () => {
        const newGraph = myGraph.deepCopy();
        newGraph.vertices.forEach((vertex) => vertex.color = color.vertexColor);
        setMyGraph(newGraph);
        setGraphKey(prev => prev + 1);
    }


    const scrollToIndex = (index) => {
        const position = index * (itemWidth + 2 * itemSpacing) - screenWidth / 2 + itemWidth / 2;
        scrollViewRef.current.scrollTo({ x: position, animated: true });
    }

    const handleIsChosenVertex = () => {

        let state = Array(list.length).fill(false);
        state[currentVertex] = true;
        setIsChosenVertex(state);

    }


    useEffect(() => {
        handleIsChosenVertex();
        scrollToIndex(currentVertex);
        highlightVertexColor(list[currentVertex]);
       
    }, [currentVertex])

    return <View style={styles.container}>
        <View style = {styles.headerLayout}>
            <Pressable style={styles.navigateBackButton} onPress={() => navigation.goBack()}>
                <FontAwesomeIcon icon="fa-solid fa-arrow-left" size={24} color="white" />
            </Pressable>
            <Text style={styles.headerText}>{className[algorithm]}</Text>
        </View>

        
        <View style={styles.graphLayout}>
                <View style = {styles.graphContent}>

                    <View style={styles.graphHeader}>
                        <View style={[styles.graphCircle, {backgroundColor: '#7D0319'}]}></View>
                        <View style={[styles.graphCircle, {backgroundColor: '#A37701'}]}></View>
                        <View style={[styles.graphCircle, {backgroundColor: '#027808'}]}></View>
                    </View>
                    <View style={styles.graphFrame}>
                        
                            {(myGraph !== null) && <RenderGraph data={myGraph} type={typeOfGraph} key={graphKey}/>}
                        

                    </View>
                </View>
            </View>

        <View style={styles.vertexHeaderLayout}>
            <Text style={styles.vertexHeader}>Thứ tự duyệt đỉnh</Text>
        </View>
        <View style={styles.buttonLayout}>
            <View style={[styles.vertexLayout, styles.centeredVertical]}>
                <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    ref={scrollViewRef}
                >
                    {list.map((element, index) =>
                        <View key={index} style={[styles.vertexBox,
                        isChosenVertex[index] && styles.chosenVertexBox,
                        {backgroundColor: colorVertexBox[index % 8]}
                        ]}>
                            <Text
                                style={styles.vertexBoxText}
                            >{element}</Text>
                        </View>
                    )}

                </ScrollView>

            </View>

            <View style={styles.centeredVertical}>

                <Pressable style={[styles.button, styles.backButton]}
                    onPress={() => {
                        setCurrentVertex(prev => {
                            const nextVertex = prev - 1 < 0 ? list.length - 1 : prev - 1;
                            return nextVertex;
                        });
                    }}
                >
                    <Text style={styles.buttonText}>BACK</Text>
                </Pressable>
                <Pressable style={[styles.button, styles.nextButton]}
                    onPress={() => {
                        setCurrentVertex(prev => {
                            if (prev + 1 > list.length - 1) resetVertexColor();
                            const nextVertex = (prev + 1) % list.length;
                            return nextVertex;
                        });
                    }}
                >
                    <Text style={styles.buttonText}>NEXT</Text>
                </Pressable>
            </View>
        </View>
    </View>    
}

    // Alert.alert(
    //     'Thông báo',
    //     'Đồ thị này có chu trình!',
    //     [
    //     { text: 'OK', onPress: () => console.log('OK Pressed') } // Đây là một nút "OK" để người dùng đóng thông báo
    //     ],
    //     { cancelable: false }
    // );

const styles = StyleSheet.create({

    //Layout
    container: {
        flex: 1,
        backgroundColor: color.primaryBackground
    },
    headerLayout: {
        height: '10%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    graphLayout: {
        height: '60%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    vertexHeaderLayout: {
        height: '5%',

        justifyContent: 'center',
        alignItems: 'center'
    },
    vertexLayout: {
        height: '15%',

        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
       
    },
    buttonLayout: {
        height: '20%'
    },
    //Header
    headerText: {
        fontSize: 16,
        color: 'white',
        textAlign: 'center',
        fontFamily: 'Montserrat-Black',

        marginTop: 20
    },
    //Graph
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

    //Button
    button: {
        width: '40%',
        aspectRatio: 3,

        alignItems: 'center',
        justifyContent: 'center',
        
        marginHorizontal: 10,
        borderRadius: 60
    },

    nextButton: {
        backgroundColor: color.blueButton
    },
    backButton: {
        backgroundColor: 'gray'
    },

    navigateBackButton: {
        position: 'absolute',
        top: 20,
        left: 20,
        width: 60,
        height: 60,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1
    },


    buttonText: {
        fontSize: 16,
        textAlign: 'center',
        color: 'white',
        fontFamily: 'Montserrat-Black'
    },
    //Vertex
    vertexHeader: {
        fontSize: 16,
        fontFamily: 'Poppins-Regular',
        color: 'white',
        textAlign: 'center'
    },

    centeredVertical: {
        flex: 0.5,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    vertexBox: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 50,
        height: 50,
        borderRadius: 60,
        backgroundColor: '#7092BE',
        marginHorizontal: 30,

    },
    vertexBoxText: {
        color: 'white',
        fontSize: 20,
        fontFamily: 'Montserrat-Black'

    },

    chosenVertexBox: {
        borderWidth: 3,
        borderColor: 'white',
        
    },
    
})

export default GraphSearch;