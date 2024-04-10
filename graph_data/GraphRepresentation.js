

Array.prototype.createMatrix = function(n){
    return Array.from({length: n + 1}, () => Array(n + 1).fill('empty'));
}

class AdjacencyMatrix {
    A;
    vertices_num;
    edges_num;

    constructor(vertices_num){
        A = [].createMatrix(vertices_num);
        this.vertices_num = vertices_num;
    }

    adjacent(u, v){
        return A[u][v] != 'empty';
    }

    addEdgeUndirected(u, v, weight = 1){
        A[u][v] = weight;
        A[v][u] = weight;
    }

    addEdgeDirected(u, v, weight = 1){
        A[u][v] = weight;
    }

    neighbours(u){
        list = [];
        for (let i = 1; i <= this.vertices_num; i++){
            if (this.adjacent(u, i)) list.push(i);
        }
        return list;
    }

    degree(u){
        return this.neighbours(u).length;
    }

    transferFromGraph(G, graph){
        let check;
        if (graph == 'UndirectedSimpleGraph' ||
            graph == 'UndirectedMultiGraph' ||
            graph == 'PseudoGraph')
            check = 'undirected';
        else check = 'directed';


  

        let n = G.edges.length;
        for (let i = 0; i < n; i++){
            let beginId= G.edges[i].beginVertex.id;
            let endId = G.edges[i].endVertex.id;
            let weight = G.edges[i].weight;
            if (check == 'undirected') this.addEdgeUndirected(beginId, endId, weight);
            else this.addEdgeDirected(beginId, endId, weight);
        }
    }

    print(){
        for (let i = 1; i <= this.vertices_num; i++){
            for (let j = 1; j <= this.vertices_num; j++)
                console.log(A[i][j] + " ");
        }
        console.log();
    }
}   

export {AdjacencyMatrix};