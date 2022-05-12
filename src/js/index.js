const layout = document.getElementById('my-layout');
const canvasContext = layout.getContext('2d');
const layoutContainer = document.querySelector('.layout-container');
const options = document.querySelector('.menu-container__options');
const menuContainer = document.querySelector('.menu-container');
const verticeOption = "V";
const edgeOption = "E";
const verticeRadius = 12;

let currentEdge = [];
let optionToDraw = null;

const graph = new Graph('grafito');

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
  }
});

layout.addEventListener('mousemove', function(event) {
  if (isOutsideCanvas(event)) {
    layout.style.cursor = 'not-allowed';
    return;
  }

  if (optionToDraw === verticeOption) {
    layout.style.cursor = 'crosshair';
  }

  if (optionToDraw === edgeOption) {
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

    } else {
      alert("Selecciona la opción a crear");
    }
  }
});

function drawVertice(vertice, withSelectedVertice) {
  canvasContext.lineWidth = 2;
  canvasContext.beginPath();
  canvasContext.arc(vertice.getX(), vertice.getY(), verticeRadius, 0, Math.PI * 2, false);

  if (withSelectedVertice && vertice.getIsSelected()) {
    canvasContext.fillStyle = "#ffddbf";
    canvasContext.strokeStyle = "#ef801e";
    canvasContext.fill();
    canvasContext.stroke();
  } else {
    canvasContext.strokeStyle = "#616f99";
    canvasContext.stroke();
  }

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
  const vertice1 = edge[0];
  const vertice2 = edge[1];

  const x = vertice2.getX() - vertice1.getX();
  const y = vertice2.getY() - vertice1.getY();

  const lengthLine = Math.sqrt((x * x) + (y * y));
  const pointX1 = vertice1.getX() + (verticeRadius * x / lengthLine);
  const pointY1 = vertice1.getY() + (verticeRadius * y / lengthLine);
  const pointX2 = vertice2.getX() - (verticeRadius * x / lengthLine);
  const pointY2 = vertice2.getY() - (verticeRadius * y / lengthLine);

  canvasContext.strokeStyle = "#ef801e";
  canvasContext.lineWidth = 2;
  canvasContext.beginPath();
  canvasContext.moveTo(pointX1, pointY1);
  canvasContext.lineTo(pointX2, pointY2);
  canvasContext.stroke();
  canvasContext.closePath();
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
    graph.addEdge(currentEdge);
    currentEdge = [];
    redrawGraph();
  }
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