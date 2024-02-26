
import Graph from "./Graph";
import { AdjacencyMatrix } from "./GraphRepresentation";
import { Stack, Queue } from "../data_structure/DataStructure";
import { NativeScreenNavigationContainer } from "react-native-screens";


class DFS {
    data;
    
    constructor(graph, typeOfGraph){
        data = new AdjacencyMatrix(graph.vertices.length);
        data.transferFromGraph(graph, typeOfGraph);
        
    }

    execute(x){
        let result = [];
        let stack = new Stack();
        stack.make_null();
        stack.push(x);
        
        let mark = Array(data.vertices_num).fill(0);
        
        while (!stack.empty()){
            let u = stack.top();
            stack.pop();
            
            if (mark[u] == 1) continue;
            
            result.push(u);
            mark[u] = 1;

            let list = data.neighbours(u);
            list.forEach(element => stack.push(element));
        }
        return result;
    }

    
}

class BFS {
    data;

    constructor(graph, typeOfGraph){
        data = new AdjacencyMatrix(graph.vertices.length);
        data.transferFromGraph(graph, typeOfGraph);
    }

    execute(x){
        let result = [];
        let queue = new Queue();
        queue.enqueue(x);

        let mark = Array(data.vertices_num+1).fill(0);

        while (!queue.empty()){
            let u = queue.front();
            queue.dequeue();

            if (mark[u] == 1) continue;

            mark[u] = 1;
            result.push(u);

            let list = data.neighbours(u);
            list.forEach(element => queue.enqueue(element));
        }

        return result;
        
    }
}

class DFSRecursion {
    data;
    
    constructor(graph, typeOfGraph){
        data = new AdjacencyMatrix(graph.vertices.length);
        data.transferFromGraph(graph, typeOfGraph);
        
    }

    execute(x){
        let result = [];
        let stack = new Stack();
        stack.make_null();
        stack.push(x);
     
        let mark = Array(data.vertices_num).fill(0);

        while (!stack.empty()){
            let u = stack.top();
            stack.pop();
            
            if (mark[u] == 1) continue;
            
            result.push(u);
            mark[u] = 1;

            let list = data.neighbours(u);
            
            list.reverse().forEach(element => stack.push(element));
        }
        return result;
    }
}

export {DFS, BFS, DFSRecursion}