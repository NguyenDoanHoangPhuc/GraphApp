import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import Svg, { Circle, Text as SvgText, G, Line } from 'react-native-svg';
import color from '../constants/color';



//Function to create random element from the given array
Array.prototype.sample = function(){
    return this[Math.floor(Math.random()*this.length)];
}

const vertexColor = color.graphContent

class Vertex {
    id;
    x;
    y;
    label
    color;
    size;
    isActive;

    constructor(id, x, y, color = vertexColor, size = 20, isActive = false) {
        this.id = id
        this.x = x
        this.y = y
        this.label = id
        this.color = color
        this.size = size
        this.isActive = isActive
    }

    isSame(vertex) {
        return this.id === vertex.id;
    }

    deepCopy() {
        // Gọi constructor với đầy đủ tham số
        return new Vertex(this.id, this.x, this.y, this.color, this.size, this.isActive);
    }
    
}

class Edge {
    beginVertex;
    endVertex;
    isLoop;
    times;
    weight;

    constructor(beginVertex, endVertex, weight = 0, times = 1) {
        this.beginVertex = beginVertex;
        this.endVertex = endVertex;
        
        this.weight = weight;
        this.times = times;
        this.isLoop = this.beginVertex.id === this.endVertex.id;
    }

    
    isLoop() {
        return this.beginVertex.id === this.endVertex.id;
    }

    isUndirectedSame(beginId, endId) {
        return (this.beginVertex.id === beginId && this.endVertex.id === endId)
            || (this.beginVertex.id === endId && this.endVertex.id === beginId);
    }

    isDirectedSame(beginId, endId) {
        return this.beginVertex.id === beginId && this.endVertex.id === endId;
    }

    deepCopy() {
        // Gọi constructor với các bản sao sâu của beginVertex và endVertex
        return new Edge(this.beginVertex.deepCopy(), this.endVertex.deepCopy(), this.weight, this.times);
    }
    
    addWeight(weight){
        this.weight = weight;
    }

}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}




class Graph {
    vertices;
    edges;
    isWeightVisible;

    constructor() {
        this.vertices = [];
        this.edges = [];
        this.isWeightVisible = false;
    }

    setIsWeightVisible(bool){
        this.isWeightVisible = bool;
    }

    //Vertices methods
    addVertexById(id, x, y) {
        let newVertex = new Vertex(id, x, y);
        this.vertices.push(newVertex);
    }

    addVertexByVertex(vertex) {
        this.vertices.push(vertex);
    }

    isCloseToVertex(x, y){
        let max = this.vertices.length;
        for (let i = 0; i < max; i++){
           let a = this.vertices[i].x;
           let b = this.vertices[i].y;
           let r = this.vertices[i].size + 50;
           if (
            ((x - a)**2 +(y - b)**2)<= r**2
           )
           return true;
        }
        return false;
    }

    createVertex(maximumVertex) {
       let rows = 5, cols = 5;
       let frames = [];

       for (let i = 1; i <= rows; i++){
        frames[i] = [];
        for (let j = 1; j <= cols; j++){
            frames[i][j] = {
                x: 60*j,
                y: 60*i,
                ready: true
            }
        }
       }
       
       for (let i = 1; i <= maximumVertex; i++){
        let rowNum, colNum;
        do {
            rowNum = getRandomInt(1, rows);
            colNum = getRandomInt(1, cols);
        } while (!frames[rowNum][colNum].ready);

        let x = frames[rowNum][colNum].x;
        let y = frames[rowNum][colNum].y;
        frames[rowNum][colNum].ready = false;

        this.addVertexById(i, x, y);
       }
       
    }

    //Edges methods
    addEdgeById(beginId, endId) {
        let beginVertex = this.vertices.find((item) => item.id === beginId);
        let endVertex = this.vertices.find((item) => item.id === endId);
        let newEdge = new Edge(beginVertex, endVertex);
        this.edges.push(newEdge);
    }

 
    addEdgeByIdAndWeight(beginId, endId, weight){
        let beginVertex = this.vertices.find((item) => item.id === beginId);
        let endVertex = this.vertices.find((item) => item.id === endId);
        let newEdge = new Edge(beginVertex, endVertex, weight);
        this.edges.push(newEdge);
    }

    addEdgeByVertex(beginVertex, endVertex) {
        let newEdge = new Edge(beginVertex, endVertex);
        this.edges.push(newEdge);
    }

    addEdgeByEdge(edge){
        this.edges.push(edge);
    }

    addRandomWeight(maximumWeight){
        this.edges.map((edge) => {
            let weight = getRandomInt(1, maximumWeight);
            edge.addWeight(weight);
        })
    }

    deepCopy(){
        let newGraph = new Graph();

        this.vertices.map((vertex) => {
            const vertexCopy = vertex.deepCopy();
            newGraph.addVertexByVertex(vertexCopy);
        })

        this.edges.map((edge) => {
            const edgeCopy = edge.deepCopy();
            newGraph.addEdgeByEdge(edgeCopy);
        })

        newGraph.isWeightVisible = this.isWeightVisible;
        
        return newGraph;
    }
}




function findUndirectedEdge(edges, beginId, endId) {
    for (let i = 0; i < edges.length; i++) {
        if (edges[i].isUndirectedSame(beginId, endId)) return edges[i];
    }
    return null;
}

function findDirectedEdge(edges, beginId, endId) {
    for (let i = 0; i < edges.length; i++) {
        if (edges[i].isDirectedSame(beginId, endId)) return edges[i];
    }
    return null;
}

/* CAC LOAI DO THI VO HUONG*/


class UndirectedSimpleGraph extends Graph {
    constructor() {
        super();
    }

    addEdgeById(beginId, endId) {
       
        if (beginId == endId) ;
        else if (findUndirectedEdge(this.edges, beginId, endId) != null);
        else super.addEdgeById(beginId, endId);
    }

    createRandomEdge(maximumEdge) {
        let maximumVertex = this.vertices.length;
        
        let checkValue = ((maximumVertex)*(maximumVertex - 1)) / 2
        if (maximumEdge > checkValue){
            Alert.alert("Số cung không hợp lệ!");
            return;
        }

        // Khởi tạo ma trận A với kích thước maximumVertex x maximumVertex
        let A = Array.from({length: maximumVertex + 1}, () => Array(maximumVertex + 1).fill(0));
    
        let index = 0;
        while (index < maximumEdge) {
            let begin = getRandomInt(1, maximumVertex);
            let random_list = [];
            for (let k = 1; k <= maximumVertex; k++) {
                if (k !== begin && A[begin][k] === 0) random_list.push(k);
            }
            if (random_list.length > 0) {
                // Chọn ngẫu nhiên một phần tử từ random_list
                let end = random_list.sample();
                this.addEdgeById(begin, end);
                A[begin][end] += 1;
                A[end][begin] += 1;
                index++;
            } else {
                // Nếu random_list trống, thoát vòng lặp để tránh vòng lặp vô hạn
                break;
            }
        }
    }

    deepCopy(){
        let newGraph = new UndirectedSimpleGraph();

        this.vertices.map((vertex) => {
            const vertexCopy = vertex.deepCopy();
            newGraph.addVertexByVertex(vertexCopy);
        })

        this.edges.map((edge) => {
            const edgeCopy = edge.deepCopy();
            newGraph.addEdgeByEdge(edgeCopy);
        })

        return newGraph;
    }
    
}

class UndirectedMultiGraph extends Graph {
    constructor() {
        super();
    }

    addEdgeById(beginId, endId) {
        if (beginId === endId);
        else {
            let changeEdge = findUndirectedEdge(this.edges, beginId, endId);
            if (changeEdge != null) {
                changeEdge.times++;
            }
            else super.addEdgeById(beginId, endId);
        }

    }

    createRandomEdge(maximumEdge) {
       let maximumVertex = this.vertices.length;

       let A = Array.from({length: maximumVertex + 1}, () => Array(maximumVertex + 1).fill(0));

       let index = 0;

       while (index < maximumEdge){
        let begin = getRandomInt(1, maximumVertex);
        let random_list = [];

        for (let k = 1; k <= maximumVertex; k++){
            if (k != begin) random_list.push(k);
        }

        if (random_list.length > 0){
            let end = random_list.sample();
            this.addEdgeById(begin, end);
            A[begin][end] += 1;
            A[end][begin] += 1;
            index++;
        }
        else break;
       }
    
    }

    deepCopy(){
        let newGraph = new UndirectedMultiGraph();

        this.vertices.map((vertex) => {
            const vertexCopy = vertex.deepCopy();
            newGraph.addVertexByVertex(vertexCopy);
        })

        this.edges.map((edge) => {
            const edgeCopy = edge.deepCopy();
            newGraph.addEdgeByEdge(edgeCopy);
        })

        return newGraph;
    }
}

class PseudoGraph extends Graph {
    constructor() {
        super();
    }

    addEdgeById(beginId, endId) {
        let changeEdge = findUndirectedEdge(this.edges, beginId, endId);
        if (changeEdge != null) {
            changeEdge.times++;
        }
        else super.addEdgeById(beginId, endId);
    }

    createRandomEdge(maximumEdge) {
        let maximumVertex = this.vertices.length;

        for (let i = 1; i <= maximumEdge; i++) {
            let beginId, endId;
            beginId = getRandomInt(1, maximumVertex);
            endId = getRandomInt(1, maximumVertex);
            this.addEdgeById(beginId, endId);
        }
    }

    deepCopy(){
        let newGraph = new PseudoGraph();

        this.vertices.map((vertex) => {
            const vertexCopy = vertex.deepCopy();
            newGraph.addVertexByVertex(vertexCopy);
        })

        this.edges.map((edge) => {
            const edgeCopy = edge.deepCopy();
            newGraph.addEdgeByEdge(edgeCopy);
        })

        return newGraph;
    }
}

/* CAC LOAI DO THI CO HUONG */

class DirectedSimpleGraph extends Graph {
    constructor() {
        super();
    }

    addEdgeById(beginId, endId) {
        if (beginId === endId);
        else if (findDirectedEdge(this.edges, beginId, endId) != null);
        else super.addEdgeById(beginId, endId);
    }

    createRandomEdge(maximumEdge) {
        let maximumVertex = this.vertices.length;
        let checkValue = maximumVertex*(maximumVertex-1);

        if (maximumEdge > checkValue){
            Alert.alert("Số cung không hợp lệ!");
            return;
        }

        // Khởi tạo ma trận A với kích thước maximumVertex x maximumVertex
        let A = Array.from({length: maximumVertex + 1}, () => Array(maximumVertex + 1).fill(0));
    
        let index = 0;
        while (index < maximumEdge) {
            let begin = getRandomInt(1, maximumVertex);
            let random_list = [];
            for (let k = 1; k <= maximumVertex; k++) {
                if (k !== begin && A[begin][k] === 0) random_list.push(k);
            }
            if (random_list.length > 0) {
                // Chọn ngẫu nhiên một phần tử từ random_list
                let end = random_list.sample();
                this.addEdgeById(begin, end);
                A[begin][end] += 1;
                index++;
            } else {
                // Nếu random_list trống, thoát vòng lặp để tránh vòng lặp vô hạn
                break;
            }
        }
    }

    deepCopy(){
        let newGraph = new DirectedSimpleGraph();

        this.vertices.map((vertex) => {
            const vertexCopy = vertex.deepCopy();
            newGraph.addVertexByVertex(vertexCopy);
        })

        this.edges.map((edge) => {
            const edgeCopy = edge.deepCopy();
            newGraph.addEdgeByEdge(edgeCopy);
        })

        return newGraph;
    }
}

class DirectedMultiNoLoopGraph extends Graph {
    constructor() {
        super();
    }

    addEdgeById(beginId, endId) {
        if (beginId === endId);
        else {
            let changeEdge = findDirectedEdge(this.edges, beginId, endId);
            if (changeEdge != null) {
                changeEdge.times++;
            }
            else super.addEdgeById(beginId, endId);
        }

    }

    createRandomEdge(maximumEdge) {
        let maximumVertex = this.vertices.length;
    
        // Khởi tạo ma trận A với kích thước maximumVertex x maximumVertex
        let A = Array.from({length: maximumVertex + 1}, () => Array(maximumVertex + 1).fill(0));
    
        let index = 0;
        while (index < maximumEdge) {
            let begin = getRandomInt(1, maximumVertex);
            let random_list = [];
            for (let k = 1; k <= maximumVertex; k++) {
                if (k !== begin) random_list.push(k);
            }
            if (random_list.length > 0) {
                // Chọn ngẫu nhiên một phần tử từ random_list
                let end = random_list.sample();
                this.addEdgeById(begin, end);
                A[begin][end] += 1;
                A[end][begin] += 1;
                index++;
            } else {
                // Nếu random_list trống, thoát vòng lặp để tránh vòng lặp vô hạn
                break;
            }
        }
    }

    deepCopy(){
        let newGraph = new DirectedMultiNoLoopGraph();

        this.vertices.map((vertex) => {
            const vertexCopy = vertex.deepCopy();
            newGraph.addVertexByVertex(vertexCopy);
        })

        this.edges.map((edge) => {
            const edgeCopy = edge.deepCopy();
            newGraph.addEdgeByEdge(edgeCopy);
        })

        return newGraph;
    }
}

class DirectedMultiLoopGraph extends Graph {
    constructor() {
        super();
    }

    addEdgeById(beginId, endId) {
        let changeEdge = findDirectedEdge(this.edges, beginId, endId);
        if (changeEdge != null) {
            changeEdge.times++;
        }
        else super.addEdgeById(beginId, endId);
    }

    createRandomEdge(maximumEdge) {
        let maximumVertex = this.vertices.length;


        for (let i = 1; i <= maximumEdge; i++) {
            let beginId, endId;
            beginId = getRandomInt(1, maximumVertex);
            endId = getRandomInt(1, maximumVertex);
            this.addEdgeById(beginId, endId);
        }
    }

    deepCopy(){
        let newGraph = new DirectedMultiLoopGraph();

        this.vertices.map((vertex) => {
            const vertexCopy = vertex.deepCopy();
            newGraph.addVertexByVertex(vertexCopy);
        })

        this.edges.map((edge) => {
            const edgeCopy = edge.deepCopy();
            newGraph.addEdgeByEdge(edgeCopy);
        })

        return newGraph;
    }
}


export default Graph
export { Vertex, Edge }
export { UndirectedMultiGraph, UndirectedSimpleGraph, PseudoGraph }
export { DirectedSimpleGraph, DirectedMultiNoLoopGraph, DirectedMultiLoopGraph }