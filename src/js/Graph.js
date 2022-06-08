class Graph {
  
  constructor(name, type = 'no-dirigido') {
    this.id = generateId();
    this.name = name;
    this.type = type;
    this.adjacencyList = {};
    this.vertices = [];
    this.edges = [];
  }

  setType = (type) => {
    this.type = type;
  }

  addVertice = (vertice) =>{
    this.vertices.push(vertice);

    if (!this.adjacencyList[vertice.id]) {
      this.adjacencyList[vertice.id] = {};
    }
  }

  addEdge = (edge) => {
    this.edges.push(edge);
    this.adjacencyList[edge.vertices[0].id][edge.vertices[1].id] = edge.weight;
    this.adjacencyList[edge.vertices[1].id][edge.vertices[0].id] = edge.weight;
  }

  getShortestPathWithDijkstra(s) {
    var solutions = {};
    solutions[s] = [];
    solutions[s].dist = 0;
  
    while (true) {
      var parent = null;
      var nearest = null;
      var dist = Infinity;
    
      //for each existing solution
      for (var n in solutions) {
        if (!solutions[n]) {
          continue;
        }

        var ndist = solutions[n].dist;
        var adj = this.adjacencyList[n];
        //for each of its adjacent nodes...
        for (var a in adj) {
          //without a solution already...
          if (solutions[a]) {
            continue;
          }
          //choose nearest node with lowest *total* cost
          var d = adj[a] + ndist;

          if (d < dist) {
            //reference parent
            parent = solutions[n];
            nearest = a;
            dist = d;
          }
        }
      }
      
      //no more solutions
      if (dist === Infinity) {
          break;
      }
      
      //extend parent's solution path
      solutions[nearest] = parent.concat(nearest);
      //extend parent's cost
      solutions[nearest].dist = dist;
    }
  
    return solutions;
  }
}