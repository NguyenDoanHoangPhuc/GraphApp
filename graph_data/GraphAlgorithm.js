
import Graph from "./Graph";
import { AdjacencyMatrix } from "./GraphRepresentation";
import { Stack, Queue} from "../data_structure/DataStructure";
import { NativeScreenNavigationContainer } from "react-native-screens";
import { EdgeList } from "./GraphRepresentation2";


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
class Dijkstra {
    constructor(graph, typeOfGraph) {
        this.data = new EdgeList(graph.vertices.length);
        this.data.transferFromGraph(graph, typeOfGraph);
    }

    execute(x) {
        let dist = [];
        let mark = [];
        for (let i = 1; i <= this.data.vertices_num; i++) {
            dist[i] = Infinity;
            mark[i] = false;
        }
        dist[x] = 0;

        for (let count = 1; count <= this.data.vertices_num - 1; count++) {
            let u = this.minDistance(dist, mark);
            mark[u] = true;
            for (let v = 1; v <= this.data.vertices_num; v++) {
                if (!mark[v] && this.data.adjacent(u, v) && dist[u] !== Infinity && dist[u] + this.data.getweight(u, v) < dist[v]) {
                    dist[v] = dist[u] + this.data.getweight(u, v);
                }
            }
        }
        return dist;
    }

    minDistance(dist, mark) {
        let min = Infinity,
            minIndex = -1;
        for (let v = 1; v <= this.data.vertices_num; v++) {
            if (mark[v] === false && dist[v] <= min) {
                min = dist[v];
                minIndex = v;
            }
        }
        return minIndex;
    }
}




class Topo {
    data;

    constructor(graph, typeOfGraph) {
        this.data = new AdjacencyMatrix(graph.vertices.length);
        this.data.transferFromGraph(graph, typeOfGraph);
    }

    execute() {
        const result = [];
        let d = Array(this.data.vertices_num+1).fill(0);
        let mark = Array(this.data.vertices_num).fill(0);

        for (let u = 1; u <= this.data.vertices_num; u++) {
                d[u] = 0;
            for( let v = 1; v <= this.data.vertices_num; v++){
                if (this.data.adjacent(v,u)){
                    d[u]++;
                }
            }
        }

        const queue = new Queue();
        queue.make_null();
        
        for (let u = 1; u <= this.data.vertices_num; u++) {
            if (d[u] === 0) {
                queue.enqueue(u);
            }
        }

        while (!queue.empty()) {
            const u = queue.front(); 
            queue.dequeue();
            if (mark[u] === 1) continue;

            mark[u] = 1;
            result.push(u); 
           for( let v = 1; v <= this.data.vertices_num; v++){
                if (this.data.adjacent(u,v)){
        
                        d[v]--;
                        if (d[v] === 0) {
                            queue.enqueue(v);
                       } 
                   }
             }     
        }
        return result;
    }
}



class Prim{
    data;

    constructor(graph, typeOfGraph) {
        this.data = new EdgeList(graph.vertices.length);
        this.data.transferFromGraph(graph, typeOfGraph);
    }
    execute() {
        const pi = Array(this.data.vertices_num).fill(Infinity); 
        const p = Array(this.data.vertices_num).fill(-1); 
        const mark = Array(this.data.vertices_num).fill(false); 
        
        pi[1] = 0;
        
        for (let i = 1; i < this.data.vertices_num ; i++) {
            let min_dist = Infinity;
            let u;
            for (let j = 1; j <= this.data.vertices_num; j++) {
                if (!mark[j] && pi[j] < min_dist) {
                    min_dist = pi[j];
                    u = j;
                }
            }
            mark[u] = true;
            
            const vlist = this.data.neighbours(u);
            for (let j = 0; j < vlist.length; j++) {
                const v = vlist[j];
                if (!mark[v] && this.data.getweight(u, v) < pi[v]) {
                    pi[v] = this.data.getweight(u, v);
                    p[v] = u;
                }
            }
        }
    
        const List = [];
        for (let u = 1; u < this.data.vertices_num; u++) {
                if(p[u] !== -1){
                    const w = this.data.getweight(p[u], u);
                    List.push({ u: p[u], v: u, w: w }); 
            }
        }
        return List;
    }
    
}

class Prim_weight {
    data;
    minweight;
    
    constructor(graph) {
        this.data = new EdgeList(graph.vertices.length);
        this.data.transferFromGraph(graph);
        this.minweight = 0; // Khởi tạo minweight
        
    }
   
    execute() {
        const pi = Array(this.data.vertices_num).fill(Infinity); 
        const p = Array(this.data.vertices_num).fill(-1); 
        const mark = Array(this.data.vertices_num).fill(false); 
        
        pi[1] = 0;
        let u;
        for (let i = 1; i < this.data.vertices_num; i++) {
            let min_dist = Infinity;
            for (let j = 1; j <= this.data.vertices_num; j++) {
                if (mark[j] === false && pi[j] < min_dist) {
                    min_dist = pi[j];
                    u = j;
                }
            }
            mark[u] = true;
           
            const vlist = this.data.neighbours(u);
            for (let j = 0; j < vlist.length; j++) {
                const v = vlist[j];
                const w = this.data.getweight(u, v);
                if (mark[v] === false && w < pi[v]) {
                    pi[v] = w;
                    p[v] = u;
                }
            }
        }
    
        let minweight = 0;
       
        for (let u = 1; u < this.data.vertices_num; u++) {
                if(p[u] !== -1){
                    const w = this.data.getweight(p[u], u);
                    minweight += w;
            }
        }
    
        return minweight;
    }
    
}


export {DFS, BFS, DFSRecursion, Dijkstra, Topo, Prim, Prim_weight}