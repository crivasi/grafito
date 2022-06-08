const layout = document.getElementById('my-layout');
const canvasContext = layout.getContext('2d');
const layoutContainer = document.querySelector('.layout-container');
const options = document.querySelector('.menu-container__options');
const menuContainer = document.querySelector('.menu-container');
const createGraphButton = document.getElementById('create-graph');
const createEdgeButton = document.getElementById('create-edge');
const usePredefinedGraph = document.getElementById('use-predefined');
const verticeOption = "V";
const edgeOption = "E";
const shortestPath = "shortestPath";
const verticeRadius = 16;

let optionToDraw = null;
let currentEdge = [];
let nodesShortestPath = [];

layout.width = window.innerWidth - menuContainer.clientWidth - 60;
layout.height = window.innerHeight - menuContainer.clientHeight + 80;

const getCoordinatesCanvas = (event) => {
  const x = Math.floor(event.pageX - layout.offsetLeft);
  const y = Math.floor(event.pageY - layout.offsetTop);

  return {x, y};
}

const getWidthHeightCanvas = () => {
  const layoutWidth = layout.width;
  const layoutHeight = layout.height;
  
  return {layoutWidth, layoutHeight};
}

const isOutsideCanvas = (event, posX = null, posY = null) => {
  const {layoutWidth, layoutHeight} = getWidthHeightCanvas();
  let currentPosition = null;
  let x = null;
  let y = null;

  if (posX && posY) {
    x = posX;
    y = posY;
  } else {
    currentPosition = getCoordinatesCanvas(event);
    x = currentPosition.x;
    y = currentPosition.y;
  }
  
  return x - verticeRadius < 2 || x + verticeRadius > layoutWidth - 2 || y - verticeRadius < 2 || y + verticeRadius > layoutHeight - 2;
}

usePredefinedGraph.addEventListener('click', function () {
  if (graph) {
    id = 0;
    currentEdge = [];
    nodesShortestPath = [];
    graph = new Graph(graph.name, graph.type);
  }

  for (predefinedVertice of predefinedVertices) {
    const vertice = new Vertice('A', predefinedVertice.coordinates.x, predefinedVertice.coordinates.y);
    graph.addVertice(vertice);
  }

  for (predefinedEdge of predefinedEdges) {
    const edge = new Edge(predefinedEdge.vertices[0], predefinedEdge.vertices[1], parseInt(predefinedEdge.weight));
    graph.addEdge(edge);
  }

  redrawGraph();
});

options.addEventListener('click', function (e) {
  const clickedElement = e.target;

  redrawGraph();

  if (clickedElement.tagName === "BUTTON") {
    const activeButton = this.querySelector('button.active');
    
    if (activeButton) {
      activeButton.classList.remove('active');
    }

    clickedElement.classList.add('active');
    optionToDraw = clickedElement.dataset.option;

    if (optionToDraw === shortestPath) {
      currentEdge = [];
      nodesShortestPath = [];
      if (graph.vertices.length && graph.edges.length) {
        alert('Selecciona el vértice inicial y el vértice final');
      } else {
        alert('Es necesario un grafo para calcular');
        clickedElement.classList.remove('active');
      }
    }
  }
});

layout.addEventListener('mousemove', function(event) {
  if (isOutsideCanvas(event)) {
    layout.style.cursor = 'not-allowed';
    return;
  }

  if (optionToDraw === verticeOption) {
    layout.style.cursor = 'crosshair';
  } else {
    layout.style.cursor = 'pointer';

  }
});

layout.addEventListener('click', function (event) {
  if (layout.getContext) {
    if (optionToDraw) {
      if (isOutsideCanvas(event)) {
        return;
      }

      if (optionToDraw === 'V') {
        storeAndDrawVertice(event);
      }

      if (optionToDraw === 'E') {
        storeAndDrawEdge(event);
      }

      if (optionToDraw === shortestPath) {
        calculateShortestPath(event);
      }

    } else {
      alert("Selecciona la opción a crear");
    }
  }
});

createGraphButton.addEventListener('click', () => {
  const nameGraph = document.querySelector('[name="graphName"]').value;
  const typeGraph = document.querySelector('[name="graphType"]').value;

  if (nameGraph && typeGraph) {
    graph = new Graph(nameGraph, typeGraph);
    document.getElementById('my-graph-name').innerText = nameGraph;
    document.getElementById('my-graph-type').innerText = typeGraph === 'dirigido' ? '[Dirigido]' : '[No dirigido]';
    document.getElementById('create-graph-modal').classList.remove('showed');
    document.getElementById('create-graph-modal').classList.add('hidden');
    document.querySelector('.overlay').classList.remove('showed');
    document.querySelector('.overlay').classList.add('hidden');
  } else {
    alert('Ingresa los datos requeridos');
  }
});

createEdgeButton.addEventListener('click', () => {
  const edgeWeight = document.querySelector('[name="edgeWeight"]');
  const edgeName = document.querySelector('[name="edgeName"]');

  if (!edgeWeight.value) {
    alert('Por favor asigna un peso a la arista');
    return;
  }

  createEdge(edgeWeight.value, edgeName.value);
  edgeWeight.value = "";
  edgeName.value = "";

  document.getElementById('create-edge-modal').classList.remove('showed');
  document.getElementById('create-edge-modal').classList.add('hidden');
  document.querySelector('.overlay').classList.remove('showed');
  document.querySelector('.overlay').classList.add('hidden');
});

function drawVertice(vertice, withSelectedVertice) {
  const x = vertice.coordinates.x;
  const y = vertice.coordinates.y;

  canvasContext.lineWidth = 2;
  canvasContext.beginPath();
  canvasContext.arc(x, y, verticeRadius, 0, Math.PI * 2, false);

  if (withSelectedVertice && vertice.getIsSelected()) {
    canvasContext.fillStyle = "#ffddbf";
    canvasContext.strokeStyle = "#ef801e";
    canvasContext.fill();
    canvasContext.stroke();
  } else if (vertice.getBelongsShortPath()) {
    canvasContext.fillStyle = "#ffdb6c";
    canvasContext.strokeStyle = "#2c395e";
    canvasContext.fill();
    canvasContext.stroke();
  } else {
    canvasContext.strokeStyle = "#616f99";
    canvasContext.stroke();
  }

  canvasContext.font = "bold 13px monospace";
  canvasContext.fillStyle = "#2c395e";
  canvasContext.textAlign = "center";
  canvasContext.fillText(vertice.id, x, y + 4);

  canvasContext.closePath();
}

function storeAndDrawVertice(event) {
  const {x , y} = getCoordinatesCanvas(event);

  const vertice = new Vertice('A', x, y);
  graph.addVertice(vertice);

  drawVertice(vertice);
}

function getVerticeClicked(x, y) {
  let verticeClicked = null;

  graph.vertices.forEach(vertice => {
    vertice.setIsSelected(false);

    if (Math.sqrt((x - vertice.getX()) ** 2 + (y - vertice.getY()) ** 2) < verticeRadius) {
      vertice.setIsSelected(true);

      verticeClicked = vertice;
    }
  });

  return verticeClicked;
}

function drawEdge(edge) {
  const vertice1 = edge.vertices[0];
  const vertice2 = edge.vertices[1];

  const x = vertice2.coordinates.x - vertice1.coordinates.x;
  const y = vertice2.coordinates.y - vertice1.coordinates.y;

  const lengthLine = Math.sqrt((x * x) + (y * y));
  const pointX1 = vertice1.coordinates.x + (verticeRadius * x / lengthLine);
  const pointY1 = vertice1.coordinates.y + (verticeRadius * y / lengthLine);
  const pointX2 = vertice2.coordinates.x - (verticeRadius * x / lengthLine);
  const pointY2 = vertice2.coordinates.y - (verticeRadius * y / lengthLine);

  canvasContext.strokeStyle = edge.getBelongsShortPath() ? "#2c395e" : "#ef801e";
  canvasContext.lineWidth = 2;
  canvasContext.beginPath();
  canvasContext.moveTo(pointX1, pointY1);
  canvasContext.lineTo(pointX2, pointY2);
  canvasContext.stroke();
  canvasContext.closePath();

  if (edge.weight) {
    canvasContext.font = "16px monospace";
    addLabelToEdge(edge, {x: pointX1, y: pointY1}, {x: pointX2, y: pointY2});
  }
}

function addLabelToEdge(edge, point1, point2) {
  const dx = (point2.x - point1.x);
  const dy = (point2.y - point1.y);
  const pad = 1/2;
  const alignment = "center";
  
  canvasContext.save();
  canvasContext.textAlign = alignment;
  canvasContext.translate(point1.x + dx * pad, point1.y + dy * pad);

  if(dx < 0) {
    canvasContext.rotate(Math.atan2(dy,dx) - Math.PI);  //to avoid label upside down
  } else {
    canvasContext.rotate(Math.atan2(dy,dx));
  }
  
  canvasContext.font = "16px monospace";

  if (edge.getBelongsShortPath()) {
    canvasContext.font = "bold 16px monospace";
  }
  
  canvasContext.fillStyle = "#2c395e"
  canvasContext.fillText(edge.weight, 0, -5);
  
  canvasContext.restore();
}

function storeAndDrawEdge(event) {
  // para dibujar la linea:
    // mirar si es el mismo vértice, tendría que curvearse la línea pero como en círculo y unirse a él mismo
    // si queda un número par de aristas curvearlas todas, si no, dejar una recta y el resto curvas y el mismo número de curvas a ambos lados de la recta 
    // si entre dos nodos hay más de dos aristas, sería un grafo multigrafo
  const {x , y} = getCoordinatesCanvas(event);
  const selectedVertice = getVerticeClicked(x, y);

  if (selectedVertice) {
    currentEdge.push(selectedVertice);
    redrawGraph(true);
  }

  if (currentEdge.length > 1) {
    showModal('#create-edge-modal');
  }
}

function createEdge(weight, name) {
  const edge = new Edge(currentEdge[0], currentEdge[1], parseInt(weight), name);

  graph.addEdge(edge);
  currentEdge = [];

  redrawGraph();
}

function redrawGraph(withSelectedVertice = false) {
  canvasContext.clearRect(0, 0, layout.width, layout.height);

  graph.vertices.forEach(vertice => {
    drawVertice(vertice, withSelectedVertice);
  });

  graph.edges.forEach(edge => {
    // si el grafo es no dirigido, no permitir que se repitan los mismos vertices
    drawEdge(edge);
  });
}

function showModal(selector) {
  const modalElement = document.querySelector(selector);
  const overlay = document.querySelector('.overlay');

  modalElement.classList.remove('hidden');
  overlay.classList.remove('hidden');
  modalElement.classList.add('showed');
  overlay.classList.add('showed');
}

function calculateShortestPath(event) {
  const {x, y} = getCoordinatesCanvas(event);
  const selectedVertice = getVerticeClicked(x, y);

  if (selectedVertice) {
    redrawGraph(true);
  }

  if (selectedVertice && !nodesShortestPath[selectedVertice.id]) {
    nodesShortestPath.push(selectedVertice);
  }

  if (nodesShortestPath.length > 1) {
    const solutions = graph.getShortestPathWithDijkstra(nodesShortestPath[0].id);
    const shortestPath = solutions[nodesShortestPath[1].id];

    for (vertice of graph.vertices) {
      vertice.setBelongsShortPath(false);
      shortestPath.forEach((element) => {
        if (vertice.id == element || vertice.id == nodesShortestPath[0].id) {
          vertice.setBelongsShortPath(true);
        }
      });
    }

    let initialVertice = nodesShortestPath[0].id;
    for (let i = 0; i < shortestPath.length; i++) {
      for (edge of graph.edges) {
        if (
          edge.vertices[0].id == initialVertice && edge.vertices[1].id == shortestPath[i] || 
          edge.vertices[1].id == initialVertice && edge.vertices[0].id == shortestPath[i]
        ) {
          edge.setBelongsShortPath(true);
        }
      }

      initialVertice = shortestPath[i];
    }

    shortestPath.forEach(() => {
      for (edge of graph.edges) {
        edge.vertices.indexOf(nodesShortestPath[0].id) ;
      }
    });

    document.querySelector('button.active').classList.remove('active');
    alert('Costo ruta más corta: ' + shortestPath['dist']);
    redrawGraph();
  }
}