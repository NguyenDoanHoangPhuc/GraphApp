import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Pressable } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import RenderGraphDijkstra from '../graph_render/RenderGraphDijkstra';
import color from '../constants/color';
import { Dijkstra } from '../graph_data/GraphAlgorithm'; // Updated import
import { UndirectedSimpleGraph, UndirectedMultiGraph, PseudoGraph, DirectedSimpleGraph, DirectedMultiLoopGraph, DirectedMultiNoLoopGraph } from '../graph_data/Graph';
import { EdgeList } from '../graph_data/GraphRepresentation2';

const getSmallestWeightedNumber = () => {
    let smallestWeight = Infinity;
    shortestPaths.forEach(path => {
        if (path.distance < smallestWeight) {
            smallestWeight = path.distance;
        }
    });
    return smallestWeight === Infinity ? "No path selected" : smallestWeight;
};

const GraphSearchDijkstra = ({ route, navigation }) => {
    const { algorithm, graph, typeOfGraph, beginVertex } = route.params;

    const [shortestPaths, setShortestPaths] = useState([]); 
    const [myGraph, setMyGraph] = useState(graph);

    useEffect(() => {
        const applyDijkstraAlgorithm = () => {
            const dijkstraAlgorithm = new Dijkstra(myGraph); 
            const shortestPathsResult = dijkstraAlgorithm.execute(beginVertex); 
            setShortestPaths(shortestPathsResult); 
        };
        applyDijkstraAlgorithm();
    }, [myGraph, beginVertex]); 

    return (
        <View style={styles.container}>
             <View style={styles.headerLayout}>
                <Pressable style={styles.navigateBackButton} onPress={() => navigation.goBack()}>
                    <FontAwesomeIcon icon="fa-solid fa-arrow-left" size={24} color="white" />
                </Pressable>
                <Text style={styles.headerText}>Thuật toán Dijkstra</Text>
            </View>

            <View style={styles.graphLayout}>
                <View style={styles.graphContent}>
                    <RenderGraphDijkstra data={myGraph} type={typeOfGraph} />
                </View>
            </View>

            <View style={styles.buttonLayout}>
                    <Text style={styles.minimumSpanningTreeText}>Smallest Weighted Number: {getSmallestWeightedNumber()}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    
});

export default GraphSearchDijkstra;