import React, { useDebugValue } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, ImageBackground, FlatList, ScrollView, Dimensions} from 'react-native';
import { ToastAndroid } from 'react-native';
import Graph, {UndirectedSimpleGraph, UndirectedMultiGraph, PseudoGraph} from '../graph_data/Graph'
import { DirectedSimpleGraph,  DirectedMultiLoopGraph, DirectedMultiNoLoopGraph} from '../graph_data/Graph';
import { AdjacencyMatrix } from '../graph_data/GraphRepresentation';
import { useState, useEffect, useRef } from 'react';
//Algorithm
import { DFS , BFS, DFSRecursion} from '../graph_data/GraphAlgorithm';

import RenderGraph from '../graph_render/RenderGraph';

const classMap = {
    'DFS': DFS,
    'BFS': BFS,
    'DFS-Recursion': DFSRecursion
}

const className = {
    'DFS': 'Duyệt theo chiều sâu',
    'BFS': 'Duyệt theo chiều rộng',
    'DFS-Recursion': 'Duyệt theo chiều sâu đệ quy'
}


function createInstance(className, myGraph, typeOfGraph) {
    const Class = classMap[className];
    if (Class) {

        return new Class(myGraph, typeOfGraph);
    }
    throw new Error(`Undefined class for string: ${className}`);
}



const screenWidth = Dimensions.get('window').width;

function GraphSearch({route, navigation}){
    const {algorithm, graph, typeOfGraph, beginVertex} = route.params;
    
    const getAlgorithmList = (algorithm) => {
        const a = createInstance(algorithm, graph, typeOfGraph);
        
        return a.execute(beginVertex);
        
    }


    const list = getAlgorithmList(algorithm);

    const [isChosenVertex, setIsChosenVertex] = useState(Array(list.length).fill(false));
    const [currentVertex, setCurrentVertex] = useState(0);
    const [myGraph, setMyGraph] = useState(graph);
    const [graphKey, setGraphKey] = useState(graph);

    const scrollViewRef = useRef();

    const itemWidth = 60; // width of your item
    const itemSpacing = 30; // spacing between items (marginHorizontal)


    

    const highlightVertexColor = (changeId) => {
        let prevState = myGraph.deepCopy();
        prevState.vertices.forEach(vertex => {
            if (vertex.id === changeId) {
                vertex.color = '#BFD8AF';
            }
            else vertex.color = 'white';
        })
        setGraphKey(prev => prev + 1)
        setMyGraph(prevState);
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

    return <View style = {{flex: 1}}>
        <Text style = {[styles.headerText, styles.headerLayout]}>{className[algorithm]}</Text>
        <View style = {styles.graphLayout}>
            <RenderGraph data = {myGraph} type = {typeOfGraph} key = {graphKey} lock = {true}/>
        </View>

        <View style = {styles.vertexHeaderLayout}>
            <Text style = {{color: 'black', textAlign: 'center'}}>Thứ tự duyệt đỉnh</Text>
        </View>
        <View style = {styles.buttonLayout}>
            <View style={[styles.vertexLayout, styles.centeredVertical]}>
            <ScrollView
                horizontal = {true}
                showsHorizontalScrollIndicator = {false}
                ref = {scrollViewRef}
            >
                {list.map((element, index) => 
                    <View key = {index} style={[styles.vertexBox,
                        isChosenVertex[index] && styles.chosenVertexBox
                    ]}>
                        <Text
                            style = {styles.vertexBoxText}
                        >{element}</Text>
                    </View>
                )}

            </ScrollView>

            </View>

            <View style={styles.centeredVertical}>

            <TouchableOpacity style={styles.button}
    onPress={() => {
        setCurrentVertex(prev => {
            const nextVertex = prev - 1 < 0 ? list.length - 1 : prev - 1;
            return nextVertex;
        });
    }}
>
    <Text style={styles.buttonText}>BACK</Text>
</TouchableOpacity>
<TouchableOpacity style={styles.button}
    onPress={() => {
        setCurrentVertex(prev => {
            const nextVertex = (prev + 1) % list.length;
            return nextVertex;
        });
    }}
>
    <Text style={styles.buttonText}>NEXT</Text>
</TouchableOpacity>
            </View>
        </View>
    </View>
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    centeredVertical: {
        flex: 0.5,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    headerText: {
        fontSize: 16,
        color: 'black',
        textAlign: 'center',
        fontWeight: 'bold',

        marginTop: 20
    },

    halfScreen: {
        flex: 0.5
    },
    headerLayout: {
        flex: 0.05
    },  
    graphLayout: {
        flex: 0.55,
        
    },
    vertexHeaderLayout: {
        flex: 0.05,
    },
    vertexLayout: {
        flex: 0.2,
        
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderTopWidth: 1,
        borderBottomWidth: 1,
    },  
    buttonLayout: {
        flex: 0.2,
    },

    vertexBox: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 40,
        height: 40,
        borderRadius: 40,
        backgroundColor: '#ADBC9F',
        marginHorizontal: 30,
        
    },
    vertexBoxText: {
        color: 'white',
        textAlign: 'center'
    },

    chosenVertexBox: {
        borderWidth: 3,
        borderColor: 'black',
        width: 48,
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        width: 100,
        height: 40,
        backgroundColor: '#59B4C3',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 40,
        borderRadius: 20
    },
    buttonText: {
        fontSize: 16,
        textAlign: 'center',
        color: 'white',
        
    }
})

export default GraphSearch;