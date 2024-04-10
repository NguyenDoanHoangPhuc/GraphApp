

class Edges {
    constructor(u, v, weight) {
        this.u = u;
        this.v = v;
        this.w = weight;
    }
}

class EdgeList {
    constructor(vertices_num) {
        this.A = [];
        this.vertices_num = vertices_num;
        this.edges_num = 0;
    }

    addEdgeDirected(u, v, weight) {
        this.A.push(new Edges(u, v, weight));
        this.edges_num++;
    }

    adjacent(u, v) {
        for (let i = 0; i < this.edges_num; i++) {
            if ((this.A[i].u === u && this.A[i].v === v) || (this.A[i].v === u && this.A[i].u === v)) {
                return true;
            }
        }
        return false;
    }

    getVertex(i) {
        return this.A[i];
    }

    neighbours(u) {
        let list = [];
        for (let i = 0; i < this.edges_num; i++) {
            if (this.A[i].u === u) {
                list.push(this.A[i].v); 
            } else if (this.A[i].v === u) {
                list.push(this.A[i].u); 
            }
        }
        return list;
    }
    

    print() {
        for (let i = 0; i < this.edges_num; i++) {
            console.log("[" + this.A[i].u + ", " + this.A[i].v + ", " + this.A[i].w + "]");
        }
    }

    getweight(u, v) {
        for (let i = 0; i < this.edges_num; i++) {
            if ((this.A[i].u === u && this.A[i].v === v) || (this.A[i].v === u && this.A[i].u === v)) {
                return this.A[i].w; 
            }
        }
    }

    transferFromGraph(G, graph) {
        let check;
        if (graph == 'UndirectedSimpleGraph' ||
            graph == 'UndirectedMultiGraph' ||
            graph == 'PseudoGraph') {
            check = 'undirected';
        } else {
            check = 'directed';
        }

        let n = G.edges.length;
        for (let i = 1; i < n; i++) {
            let beginId = G.edges[i].beginVertex.id;
            let endId = G.edges[i].endVertex.id;
            let weight = G.edges[i].weight;
            if (check == 'undirected') {
                this.addEdgeDirected(beginId, endId, weight);
            } else {
                this.addEdgeDirected(beginId, endId, weight);
            }
        }
    }
}

export { EdgeList };
