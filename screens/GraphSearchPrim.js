import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Pressable } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import RenderGraphPrim from '../graph_render/RenderGraphPrim';
import color from '../constants/color';
import { Prim, Prim_weight } from '../graph_data/GraphAlgorithm';
import { UndirectedSimpleGraph, UndirectedMultiGraph, PseudoGraph, DirectedSimpleGraph, DirectedMultiLoopGraph, DirectedMultiNoLoopGraph } from '../graph_data/Graph';
import { EdgeList } from '../graph_data/GraphRepresentation2';

const GraphSearchPrim = ({ route, navigation }) => {
    const {algorithm, graph, typeOfGraph, beginVertex} = route.params;

    
    const [selectedEdges, setSelectedEdges] = useState([]);
    const [myGraph, setMyGraph] = useState(graph);
    const [minimumSpanningTreeWeight, setMinimumSpanningTreeWeight] = useState(0);

    useEffect(() => {
        const applyPrimAlgorithm = () => {
            const primAlgorithm = new Prim(myGraph);
            const SelectedEdges = primAlgorithm.execute();
            console.log("before",SelectedEdges);
            setSelectedEdges(SelectedEdges);
            const primWeightAlgorithm = new Prim_weight(myGraph);
            const weight = primWeightAlgorithm.execute();
            console.log("before",weight);
            setMinimumSpanningTreeWeight(weight);
            console.log(selectedEdges);
            console.log(weight);
        }
        applyPrimAlgorithm();
    }, [myGraph]);

    return (
        <View style={styles.container}>
            <View style={styles.headerLayout}>
                <Pressable style={styles.navigateBackButton} onPress={() => navigation.goBack()}>
                    <FontAwesomeIcon icon="fa-solid fa-arrow-left" size={24} color="white" />
                </Pressable>
                <Text style={styles.headerText}>Thuật toán Prim</Text>
            </View>

            <View style={styles.graphLayout}>
                <View style={styles.graphContent}>
                    <RenderGraphPrim data={myGraph} type={typeOfGraph} />
                </View>
            </View>

            <View style={styles.buttonLayout}>
                <Text style={styles.minimumSpanningTreeText}>Trọng số cây khung nhỏ nhất: {minimumSpanningTreeWeight}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
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
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonLayout: {
        height: '20%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerText: {
        fontSize: 16,
        color: 'white',
        textAlign: 'center',
        fontFamily: 'Montserrat-Black',
        marginTop: 20
    },
    graphContent: {
        borderRadius: 20,
        width: '94%',
        borderWidth: 1,
        borderColor: color.graphFrameStroke,
        overflow: 'hidden'
    },
    minimumSpanningTreeText: {
        fontSize: 16,
        color: 'white',
        textAlign: 'center',
        fontFamily: 'Montserrat-Black',
        marginTop: 20
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
});

export default GraphSearchPrim;
