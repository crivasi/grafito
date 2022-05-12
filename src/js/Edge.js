class Edge {
  constructor(vertice1, vertice2) {
    this.id = generateId();
    this.name = 'A';
    this.vertices = [vertice1, vertice2];
  }

  setVertices = (vertice1, vertice2) => {
    this.vertices = [vertice1, vertice2];
  }

  setWeight = (weight) => {
    this.weight = weight;
  }

  setName = (name) => {
    this.name = name;
  }
}