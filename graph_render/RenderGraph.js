import React, { useState, useEffect} from 'react';
import { View, Text, TouchableOpacity, Alert, Pressable } from 'react-native';
import Svg, { Circle, Text as SvgText, G, Line, Path, Polygon } from 'react-native-svg';

import Graph, { Vertex, Edge, UndirectedSimpleGraph } from '../graph_data/Graph.js'
import color from '../constants/color.js';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry.js';






function RenderGraph(props) {

  const checkDirectGraph = (graph) => {
    if (graph == 'UndirectedSimpleGraph' ||
        graph == 'UndirectedMultiGraph' ||
        graph == 'PseudoGraph')
        return 'undirected';
    else return 'directed';
  }

  const typeGraph = checkDirectGraph(props.type);
  const lock = props.lock;
  const showWeight = props.showWeight;
  
  

  const theme = {
    'numberStroke': color.numberStroke,
    'vertexStroke': color.vertexStroke,
    'stroke': color.lineStroke,
  }

  const calculateMultiEdge = (graph, type) => {
    if (type == 'undirected') return graph.getMultiUndirectedEdges();
    else return graph.getMultiDirectedEdges();
  }

  const [myGraph, setMyGraph] = useState(props.data);
  const [vertices, setVertices] = useState(props.data.vertices);
  const [edges, setEdges] = useState(props.data.edges);


  const [loops, setLoops] = useState(myGraph.edges.filter((item) => item.isLoop));
  const [multiEdges, setMultiEdges] = useState(calculateMultiEdge(myGraph, typeGraph));
 
 
  
  //addVertexFunction
  


  function moveVertexAndEdge(index, x, y) {
    if (lock) return;
    let newVertices = vertices.map((vertex) => vertex.deepCopy())
    newVertices[index] = new Vertex(newVertices[index].id, x, y, newVertices[index].color);
    setVertices(newVertices);
  }

  const handleMutiEdgeCoordinate = (edge, time) => {
    
    let x1 = edge.beginVertex.x, x2 = edge.endVertex.x;
    let y1 = edge.beginVertex.y, y2 = edge.endVertex.y;
    let midX = (x1 + x2) / 2, midY = (y1 + y2) / 2;
    
    let distance = 1;
    if (time % 2 == 0) distance = 30 * (time / 2)
    else distance = 30 * ((time + 1) / 2);
    
    const a = y1 - y2, b =  x2 - x1;
    
    
    const positiveT = Math.sqrt(distance*distance / (a*a + b*b));

    if (time % 2 == 0) return [midX + a * positiveT, midY + b * positiveT];
    else return [midX - a * positiveT, midY - b * positiveT];

  }


  useEffect(()=>{
    let newEdges = edges.map((edge) => edge.deepCopy());
    newEdges.forEach((edge) => {
      const beginId = edge.beginVertex.id;
      const endId = edge.endVertex.id;

      edge.beginVertex = vertices[beginId - 1].deepCopy();
      edge.endVertex = vertices[endId - 1].deepCopy();
    })

    setEdges(newEdges);
    setMultiEdges(newEdges.filter((item) => !item.isLoop))
    setLoops(newEdges.filter((item) => item.isLoop))

    let newGraph = myGraph;
    newGraph.vertices = vertices;
    newGraph.edges = edges;
    setMyGraph(newGraph);
  },[vertices, myGraph])


//add Edge

const [isAddEdge, setIsAddEdge] = useState(true);
const [beginVertex, setBeginVertex] = useState(null);

function handleAddEdge(index) {
  if (beginVertex === null) setBeginVertex(index);
  else {
    let newGraph = myGraph;
    newGraph.addEdgeById(beginVertex, index);
    setBeginVertex(null);
    
    setMyGraph(newGraph);
  }
}



  function renderVertex() {
    const verticesComponents = vertices.map((vertex, index) => (
        <G
          key={index}
          onPress={() => {if (isAddEdge) handleAddEdge(index+1);}}
          onStartShouldSetResponder={() => true}
          onResponderMove={(event) => {
            const { locationX, locationY } = event.nativeEvent;
            moveVertexAndEdge(index, locationX, locationY);
          }}>

          <Circle
            cx={vertex.x}
            cy={vertex.y}
            r={vertex.size}
            stroke={theme['vertexStroke']}
            strokeWidth={1}
            fill={vertex.color}
          />
          <SvgText
            fontFamily='Montserrat'
            key={`text_${vertex.id}`}
            x={vertex.x}
            y={vertex.y}
            fill={theme['numberStroke']}
            fontSize="20"
            textAnchor="middle"
            dy=".3em" // Điều chỉnh vị trí dọc của văn bản
          >
            {vertex.label}
          </SvgText>
        </G>
      
    ))

    return verticesComponents;
  }

  function renderUndirectedEdge() {
    const edgesComponents = multiEdges.flatMap((edge, index) => {
      let lines = [];
      let x1 = edge.beginVertex.x, x2 = edge.endVertex.x;
      let y1 = edge.beginVertex.y, y2 = edge.endVertex.y;
      lines.push(
        <Line
          key={index + "edge"}
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke={theme['stroke']}
          strokeWidth="1"
        />
      )


      if (edge.times > 1) {
        

        for (let i = 1; i <= edge.times - 1; i++) {
          let [midX, midY] = handleMutiEdgeCoordinate(edge, i);
          lines.push(
            <Path
              key={i + "curve" + index}
              d={`M${x1} ${y1} Q ${midX} ${midY} ${x2} ${y2}`}
              stroke={theme['stroke']}
              fill="none"
              strokeWidth="1"
            />
          );
        }
      }

      
      return lines;
    })

    

    return edgesComponents;
  }

  function renderLoop(){
    const loopsComponents = loops.map((edge, index) => (
      <Circle
        key={index + "circle"}
        cx={edge.beginVertex.x - 20}
        cy={edge.beginVertex.y - 20}
        r="16"
        stroke={theme['stroke']}
        strokeWidth="1"
        fill="none"
      />
    ))
    return loopsComponents;
  }

  function getArrowByEdge(startVertex, endVertex, id) {
    let x1 = startVertex.x, y1 = startVertex.y;
    let x2 = endVertex.x, y2 = endVertex.y;
    let x3, y3, x4, y4, x5, y5;
    let s = endVertex.size;

    const AB = Math.sqrt((x2 - x1)*(x2 - x1) + (y2 - y1) *(y2 - y1));

    const lambda = (AB - s) / s;

    x3 = (x1 + lambda * x2) / (1 + lambda);
    y3 = (y1 + lambda * y2) / (1 + lambda);


    const theta = Math.atan2(y3 - y2, x3 - x2);
    const d = 10;

    x4 = x3 + d * Math.cos(theta + Math.PI / 8);
    y4 = y3 + d * Math.sin(theta + Math.PI / 8);

    x5 = x3 + d * Math.cos(theta - Math.PI / 8);
    y5 = y3 + d * Math.sin(theta - Math.PI / 8);

    return <Path
      key = {`arrow${startVertex.id}${endVertex.id}${id} `}
      d={`M${x4},${y4} L${x3},${y3} L${x5},${y5} `}
      fill="none"
      stroke={theme['stroke']}
      strokeWidth="1"
    />
  }

  function getArrowByLoop(vertex, aPrime, bPrime, rPrime, index) {
    
    let a = vertex.x;
    let b = vertex.y;
    let size = vertex.size;
    
   
    const d = Math.sqrt((aPrime - a) ** 2 + (bPrime - b) ** 2);

    
    if (d > size + rPrime || d < Math.abs(size - rPrime)) {
        return ;
    }

   
    const h = (size ** 2 - rPrime ** 2 + d ** 2) / (2 * d);

    
    const x2 = a + (h * (aPrime - a)) / d;
    const y2 = b + (h * (bPrime - b)) / d;

  
    const l = Math.sqrt(size ** 2 - h ** 2);

   
    const x3 = x2 + (l * (bPrime - b)) / d;
    const y3 = y2 - (l * (aPrime - a)) / d;

    
    let angle = Math.atan2(y3 - b, x3 - a);
  
   
    let arrowLength = 10; 
    let arrowAngle = Math.PI / 6;
  
   
    let x4 = x3 + arrowLength * Math.cos(angle + arrowAngle);
    let y4 = y3 + arrowLength * Math.sin(angle + arrowAngle);
    let x5 = x3 + arrowLength * Math.cos(angle - arrowAngle);
    let y5 = y3 + arrowLength * Math.sin(angle - arrowAngle);
  
    // Tạo thẻ Path cho mũi tên
    return (
      <Path
        key={`arrowLoop${index}`}
        d={`M${x4},${y4} L${x3},${y3} L${x5},${y5}`}
        stroke={theme['stroke']}
        fill="none"
        strokeWidth="1"
      />
    );
  }
  

  function renderArrow() {
    const arrowEdgeComponents = multiEdges.flatMap((edge, index) => {
      let arrows = [];
      if (edge.times === 1) {
        
        arrows.push(getArrowByEdge(edge.beginVertex, edge.endVertex, index));
      } else {
        for (let i = 0; i < edge.times; i++) {
          
          let x1 = edge.beginVertex.x, y1 = edge.beginVertex.y;
          let x2 = edge.endVertex.x, y2 = edge.endVertex.y;

          let midX = (edge.beginVertex.x + edge.endVertex.x) / 2; 
          let midY = (edge.beginVertex.y + edge.endVertex.y) / 2 + 30 * ((-1)**i); 

          let nearX = 0.01*x1 + 0.18*midX + 0.81*x2;
          let nearY = 0.01*y1 + 0.18*midY + 0.81*y2;

          let nearVertex = new Vertex(-1, nearX, nearY); 
          if (i === 0) {
            arrows.push(getArrowByEdge(edge.beginVertex, edge.endVertex, i)); 
          } else {
            arrows.push(getArrowByEdge(nearVertex, edge.endVertex, i)); 
          }
        }
      }
      return arrows;
    });
  
    const arrowLoopComponents = loops.flatMap((edge, index) => {
      let loopArrows = [];
      let x1 = edge.beginVertex.x - 20, y1 = edge.beginVertex.y - 20;
      loopArrows.push(getArrowByLoop(edge.endVertex, x1, y1, 16, index));
      return loopArrows;
    })
    return [...arrowEdgeComponents, ...arrowLoopComponents];
  }

  function renderDirectedEdge() {
    const edgesComponents = multiEdges.flatMap((edge, index) => {
      let lines = [];
      let x1 = edge.beginVertex.x, x2 = edge.endVertex.x;
      let y1 = edge.beginVertex.y, y2 = edge.endVertex.y;
      lines.push(
        <Line
          key={index + "edge"}
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke={theme['stroke']}
          strokeWidth="1"
        />

      )



      if (edge.times > 1) {
        for (let i = 1; i <= edge.times - 1; i++) {
          let [midX, midY] = handleMutiEdgeCoordinate(edge, i);
          lines.push(
            <Path
              key={i + "curve" + index}
              d={`M ${x1} ${y1} Q ${midX} ${midY} ${x2} ${y2}`}
              stroke={theme['stroke']}
              fill="none"
              strokeWidth="1"
            />
          );
        }
      }

      return lines;
    })

    return edgesComponents;
  }

  const renderWeight = () => {
    const weightComponents = edges.flatMap((edge, index) => {
      let x1 = edge.beginVertex.x, x2 = edge.endVertex.x;
      let y1 = edge.beginVertex.y, y2 = edge.endVertex.y;
      let midX = (x1 + x2) / 2, midY = (y1 + y2) / 2;

      
      let a = x2 - x1, b = y2- y1;
      let distance = Math.sqrt(a*a + b*b);

      let xValue = midX + 12 * b / distance;
      let yValue = midY + 12 * a / distance;
      return (
        <SvgText
          key={index}
          x={xValue}
          y={yValue}
          fill={theme['numberStroke']}
          fontSize="20"
          textAnchor="middle"
          dy=".3em"
        >
          {edge.weight}
        </SvgText>
      )
    })
    return weightComponents;
  }



  function renderDirectedGraph() {
    return <Svg width='100%' height='100%' >
      {renderDirectedEdge()}
      {renderLoop()}
      {renderArrow()}
      {renderVertex()}
      {showWeight && renderWeight()}
    </Svg>
  }


  function renderUndirectedGraph() {
    return <Svg width='100%' height='100%' > 

      {renderUndirectedEdge()}
      {renderLoop()}
      {renderVertex()}
      {showWeight && renderWeight()}
    </Svg>
  }

  return <View>
    {(typeGraph == "directed") ? renderDirectedGraph() : renderUndirectedGraph()}

  </View>
}
export default RenderGraph