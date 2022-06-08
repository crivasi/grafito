let id = 0;
function generateId() {
  return id++;
  return Math.floor(Math.random() * Math.floor(Math.random() * Date.now()));
}

const predefinedVertices = [
  {
    id: 1,
    name: "A",
    coordinates: {
      x: 277,
      y: 254,
    },
    isSelected: false,
    belongsShortPath: false,
  },
  {
    id: 2,
    name: "A",
    coordinates: {
      x: 452,
      y: 92,
    },
    isSelected: false,
    belongsShortPath: false,
  },
  {
    id: 3,
    name: "A",
    coordinates: {
      x: 456,
      y: 257,
    },
    isSelected: false,
    belongsShortPath: false,
  },
  {
    id: 4,
    name: "A",
    coordinates: {
      x: 448,
      y: 429,
    },
    isSelected: false,
    belongsShortPath: false,
  },
  {
    id: 5,
    name: "A",
    coordinates: {
      x: 770,
      y: 434,
    },
    isSelected: false,
    belongsShortPath: false,
  },
  {
    id: 6,
    name: "A",
    coordinates: {
      x: 751,
      y: 262,
    },
    isSelected: false,
    belongsShortPath: false,
  },
  {
    id: 7,
    name: "A",
    coordinates: {
      x: 765,
      y: 93,
    },
    isSelected: false,
    belongsShortPath: false,
  },
  {
    id: 8,
    name: "A",
    coordinates: {
      x: 924,
      y: 256,
    },
    isSelected: true,
    belongsShortPath: false,
  },
];

const predefinedEdges = [
  {
    id: 9,
    name: "",
    weight: 16,
    vertices: [
      {
        id: 1,
        name: "A",
        coordinates: {
          x: 277,
          y: 254,
        },
        isSelected: false,
        belongsShortPath: false,
      },
      {
        id: 2,
        name: "A",
        coordinates: {
          x: 452,
          y: 92,
        },
        isSelected: false,
        belongsShortPath: false,
      },
    ],
    belongsShortPath: false,
  },
  {
    id: 10,
    name: "",
    weight: 2,
    vertices: [
      {
        id: 2,
        name: "A",
        coordinates: {
          x: 452,
          y: 92,
        },
        isSelected: false,
        belongsShortPath: false,
      },
      {
        id: 3,
        name: "A",
        coordinates: {
          x: 456,
          y: 257,
        },
        isSelected: false,
        belongsShortPath: false,
      },
    ],
    belongsShortPath: false,
  },
  {
    id: 11,
    name: "",
    weight: 4,
    vertices: [
      {
        id: 3,
        name: "A",
        coordinates: {
          x: 456,
          y: 257,
        },
        isSelected: false,
        belongsShortPath: false,
      },
      {
        id: 4,
        name: "A",
        coordinates: {
          x: 448,
          y: 429,
        },
        isSelected: false,
        belongsShortPath: false,
      },
    ],
    belongsShortPath: false,
  },
  {
    id: 12,
    name: "",
    weight: 5,
    vertices: [
      {
        id: 4,
        name: "A",
        coordinates: {
          x: 448,
          y: 429,
        },
        isSelected: false,
        belongsShortPath: false,
      },
      {
        id: 1,
        name: "A",
        coordinates: {
          x: 277,
          y: 254,
        },
        isSelected: false,
        belongsShortPath: false,
      },
    ],
    belongsShortPath: false,
  },
  {
    id: 13,
    name: "",
    weight: 10,
    vertices: [
      {
        id: 1,
        name: "A",
        coordinates: {
          x: 277,
          y: 254,
        },
        isSelected: false,
        belongsShortPath: false,
      },
      {
        id: 3,
        name: "A",
        coordinates: {
          x: 456,
          y: 257,
        },
        isSelected: false,
        belongsShortPath: false,
      },
    ],
    belongsShortPath: false,
  },
  {
    id: 14,
    name: "",
    weight: 6,
    vertices: [
      {
        id: 2,
        name: "A",
        coordinates: {
          x: 452,
          y: 92,
        },
        isSelected: false,
        belongsShortPath: false,
      },
      {
        id: 7,
        name: "A",
        coordinates: {
          x: 765,
          y: 93,
        },
        isSelected: false,
        belongsShortPath: false,
      },
    ],
    belongsShortPath: false,
  },
  {
    id: 15,
    name: "",
    weight: 8,
    vertices: [
      {
        id: 7,
        name: "A",
        coordinates: {
          x: 765,
          y: 93,
        },
        isSelected: false,
        belongsShortPath: false,
      },
      {
        id: 6,
        name: "A",
        coordinates: {
          x: 751,
          y: 262,
        },
        isSelected: false,
        belongsShortPath: false,
      },
    ],
    belongsShortPath: false,
  },
  {
    id: 16,
    name: "",
    weight: 3,
    vertices: [
      {
        id: 6,
        name: "A",
        coordinates: {
          x: 751,
          y: 262,
        },
        isSelected: false,
        belongsShortPath: false,
      },
      {
        id: 5,
        name: "A",
        coordinates: {
          x: 770,
          y: 434,
        },
        isSelected: false,
        belongsShortPath: false,
      },
    ],
    belongsShortPath: false,
  },
  {
    id: 17,
    name: "",
    weight: 10,
    vertices: [
      {
        id: 3,
        name: "A",
        coordinates: {
          x: 456,
          y: 257,
        },
        isSelected: false,
        belongsShortPath: false,
      },
      {
        id: 5,
        name: "A",
        coordinates: {
          x: 770,
          y: 434,
        },
        isSelected: false,
        belongsShortPath: false,
      },
    ],
    belongsShortPath: false,
  },
  {
    id: 18,
    name: "",
    weight: 15,
    vertices: [
      {
        id: 4,
        name: "A",
        coordinates: {
          x: 448,
          y: 429,
        },
        isSelected: false,
        belongsShortPath: false,
      },
      {
        id: 5,
        name: "A",
        coordinates: {
          x: 770,
          y: 434,
        },
        isSelected: false,
        belongsShortPath: false,
      },
    ],
    belongsShortPath: false,
  },
  {
    id: 19,
    name: "",
    weight: 12,
    vertices: [
      {
        id: 3,
        name: "A",
        coordinates: {
          x: 456,
          y: 257,
        },
        isSelected: false,
        belongsShortPath: false,
      },
      {
        id: 6,
        name: "A",
        coordinates: {
          x: 751,
          y: 262,
        },
        isSelected: false,
        belongsShortPath: false,
      },
    ],
    belongsShortPath: false,
  },
  {
    id: 20,
    name: "",
    weight: 4,
    vertices: [
      {
        id: 2,
        name: "A",
        coordinates: {
          x: 452,
          y: 92,
        },
        isSelected: false,
        belongsShortPath: false,
      },
      {
        id: 6,
        name: "A",
        coordinates: {
          x: 751,
          y: 262,
        },
        isSelected: false,
        belongsShortPath: false,
      },
    ],
    belongsShortPath: false,
  },
  {
    id: 21,
    name: "",
    weight: 7,
    vertices: [
      {
        id: 7,
        name: "A",
        coordinates: {
          x: 765,
          y: 93,
        },
        isSelected: false,
        belongsShortPath: false,
      },
      {
        id: 8,
        name: "A",
        coordinates: {
          x: 924,
          y: 256,
        },
        isSelected: true,
        belongsShortPath: false,
      },
    ],
    belongsShortPath: false,
  },
  {
    id: 22,
    name: "",
    weight: 16,
    vertices: [
      {
        id: 6,
        name: "A",
        coordinates: {
          x: 751,
          y: 262,
        },
        isSelected: false,
        belongsShortPath: false,
      },
      {
        id: 8,
        name: "A",
        coordinates: {
          x: 924,
          y: 256,
        },
        isSelected: true,
        belongsShortPath: false,
      },
    ],
    belongsShortPath: false,
  },
  {
    id: 23,
    name: "",
    weight: 5,
    vertices: [
      {
        id: 5,
        name: "A",
        coordinates: {
          x: 770,
          y: 434,
        },
        isSelected: false,
        belongsShortPath: false,
      },
      {
        id: 8,
        name: "A",
        coordinates: {
          x: 924,
          y: 256,
        },
        isSelected: true,
        belongsShortPath: false,
      },
    ],
    belongsShortPath: false,
  },
];