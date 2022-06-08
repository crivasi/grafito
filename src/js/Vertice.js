class Vertice {
  constructor(name, x, y) {
    this.id = generateId();
    this.name = name;
    this.coordinates = {x, y};
    this.isSelected = false;
    this.belongsShortPath = false;
  }

  changeName = (name) => {
    this.name = name;
  }

  setCoordinates = (x, y) => {
    this.coordinates = {x, y};
  }

  getCoordinates = () => {
    return this.coordinates;
  }

  getX = () => {
    return this.coordinates.x;
  }

  getY = () => {
    return this.coordinates.y;
  }

  setIsSelected = (isSelected) => {
    this.isSelected = isSelected;
  }

  getIsSelected = () => {
    return this.isSelected;
  }

  setBelongsShortPath = (belongs) => {
    this.belongsShortPath = belongs;
  }

  getBelongsShortPath = () => {
    return this.belongsShortPath;
  }
}