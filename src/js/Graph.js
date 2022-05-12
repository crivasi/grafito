class Graph {
  vertices = [];
  edges = [];

  constructor(name, type = 'no-dirigido') {
    this.id = generateId();
    this.name = name;
    this.type = type;
  }

  setType = (type) => {
    this.type = type;
  }

  addVertice = (vertice) =>{
    this.vertices.push(vertice);
  }

  addEdge = (edge) => {
    this.edges.push(edge);
  }
}