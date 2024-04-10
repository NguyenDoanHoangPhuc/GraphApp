import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert, Pressable } from 'react-native';
import Svg, { Circle, Text as SvgText, G, Line, Path, Polygon } from 'react-native-svg';

import color from '../constants/color';

function RenderGraphDijkstra(props) {
    const typeGraph = props.type;
    const showWeight = props.showWeight;
    const shortestPaths = props.shortestPaths;

    const theme = {
        'numberStroke': color.numberStroke,
        'vertexStroke': color.vertexStroke,
        'stroke': color.lineStroke,
    };

    const [vertices, setVertices] = useState(props.data.vertices);
    const [edges, setEdges] = useState(props.data.edges);

    function renderVertex() {
        const verticesComponents = vertices.map((vertex, index) => (
            <G key={index}>
                <Circle
                    cx={vertex.x}
                    cy={vertex.y}
                    r={vertex.size}
                    stroke={theme['vertexStroke']}
                    strokeWidth={2}
                    fill={vertex.color}
                />
                <SvgText
                    fontFamily='Montserrat-Black'
                    key={`text_${vertex.id}`}
                    x={vertex.x}
                    y={vertex.y}
                    fill={theme['numberStroke']}
                    fontSize="20"
                    textAnchor="middle"
                    dy=".3em"
                >
                    {vertex.label}
                </SvgText>
            </G>
        ));
        return verticesComponents;
    }

    function renderEdge() {
        const edgesComponents = edges.map((edge, index) => (
            <Line
                key={index}
                x1={edge.beginVertex.x}
                y1={edge.beginVertex.y}
                x2={edge.endVertex.x}
                y2={edge.endVertex.y}
                stroke={theme['stroke']}
                strokeWidth="2"
            />
        ));
        return edgesComponents;
    }

    function renderWeight() {
        const weightComponents = edges.map((edge, index) => {
            const midX = (edge.beginVertex.x + edge.endVertex.x) / 2;
            const midY = (edge.beginVertex.y + edge.endVertex.y) / 2;
            return (
                <SvgText
                    key={index}
                    x={midX}
                    y={midY}
                    fill={theme['numberStroke']}
                    fontSize="20"
                    textAnchor="middle"
                    dy=".3em"
                >
                    {edge.weight}
                </SvgText>
            );
        });
        return weightComponents;
    }

    function renderShortestPaths() {
        const pathsComponents = shortestPaths.map((distance, index) => (
            <SvgText
                key={index}
                x={vertices[index].x}
                y={vertices[index].y}
                fill={theme['numberStroke']}
                fontSize="20"
                textAnchor="middle"
                dy=".3em"
            >
                {distance}
            </SvgText>
        ));
        return pathsComponents;
    }

    return (
        <View>
            <Svg width='100%' height='100%'>
                {renderEdge()}
                {renderVertex()}
                {showWeight && renderWeight()}
                {shortestPaths.length > 0 && renderShortestPaths()}
            </Svg>
        </View>
    );
}

export default RenderGraphDijkstra;
