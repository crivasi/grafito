class Edge {
  constructor(vertice1, vertice2, weight = "", name = "") {
    this.id = generateId();
    this.name = name;
    this.weight = weight;
    this.vertices = [vertice1, vertice2];
    this.belongsShortPath = false;
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

  setBelongsShortPath = (belongs) => {
    this.belongsShortPath = belongs;
  }

  getBelongsShortPath = () => {
    return this.belongsShortPath;
  }
}