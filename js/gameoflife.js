function seed() {
  return [...arguments];
}

function same([x, y], [j, k]) {

  let args = [...arguments];

  if(args[0].length === args[1].length){              

    for(i = 0; i < args[0].length; i++){

      if(args[0][i] !== args[1][i]){
        return false;
      }

    }

    return true;
  }

  return false;
}

// The game state to search for `cell` is passed as the `this` value of the function.
function contains(cell) {

  return this.some(item => same(cell, item));

}

const printCell = (cell, state) => {

  if(contains.call(state, cell)){
    return '\u25A3';
  }else{
    return '\u25A2';
  }

};

const corners = (state = []) => {

  let verticals = [];
  let horizontals = [];
  let tR = [];
  let bL = [];

  if(state.length == 0){

      return {
          topRight: [0,0],
          bottomLeft: [0,0]
      };

  } else{

      for(i = 0; i < state.length; i++){
          verticals.push(state[i][0]);

          horizontals.push(state[i][1]);
      }

      verticals.sort( (a , b) => a - b);

      horizontals.sort( (a , b) => a - b);

      tR = [verticals[verticals.length-1], horizontals[horizontals.length-1]];

      bL = [verticals[0], horizontals[0]];

      return {
          topRight: tR,
          bottomLeft: bL
      };

  }

};

const printCells = (state) => {

  let ext = corners(state);

  let topRight = ext.topRight;
  let bottomLeft = ext.bottomLeft;

  let mapd = "";

  let top = topRight[1];
  let right = topRight[0];
  let bottom = bottomLeft[1];
  let left = bottomLeft[0];

  while (top >= bottom){

      for(x = left; x <= right; x++){
          
          mapd = mapd.concat(`${printCell([x,top],state)}`);

          if(x === right){
              mapd = mapd.concat("\n");
              top--;
          }else{
              mapd = mapd.concat(" ");
          }
      }

  }

  //console.log(mapd);

  return mapd;

};

const getNeighborsOf = ([x, y]) => [
  [x-1, y+1], [x, y+1], [x+1, y+1],
  [x-1, y],             [x+1, y],
  [x-1, y-1], [x, y-1], [x+1, y-1]
]

const getLivingNeighbors = (cell, state) => {

  let neighbours = getNeighborsOf(cell);

  let livingNeighbours = [];

  for(var i = 0; i < neighbours.length; i++){

      //console.log(contains.bind(state)(neighbours[i]));

      if(contains.bind(state)(neighbours[i])){
          livingNeighbours.push(neighbours[i]);
      }

  }

  //console.log(livingNeighbours);

  return livingNeighbours;

};

const willBeAlive = (cell, state) => {
  livingNeighbours = getLivingNeighbors(cell,state);

  if(livingNeighbours.length === 3){
      return true;
  }else if(contains.bind(state)(cell) && livingNeighbours.length === 2){
      return true;
  }else{
      return false;
  }
};

const calculateNext = (state) => {

  let board = corners(state);

  let topRight = board.topRight;

  let bottomLeft = board.bottomLeft;

  let bottom = bottomLeft[0] - 1;

  let left = bottomLeft[1] - 1;

  let top = topRight[0] + 1;

  let right = topRight[1] + 1;

  topRight = [top, right];

  bottomLeft = [bottom, left];

  let newstate = [];

  let result = [];

  for(y = right; y >= left; y--){
  for(let x = bottom; x <= top; x++){
          newstate.push([x,y]);
      }
  }

  for(let i = 0; i < newstate.length; i++){

      if(willBeAlive(newstate[i],state)){
          result.push(newstate[i]);
      }

  }
  
  return result;

};

const iterate = (state, iterations) => {

  let states = [state];
  let ns = state;

  for (let i = 0; i < iterations; i++){
      ns = calculateNext(ns);
      states.push(ns);
  }

  return states;

};

const main = (pattern, iterations) => {};

const startPatterns = {
    rpentomino: [
      [3, 2],
      [2, 3],
      [3, 3],
      [3, 4],
      [4, 4]
    ],
    glider: [
      [-2, -2],
      [-1, -2],
      [-2, -1],
      [-1, -1],
      [1, 1],
      [2, 1],
      [3, 1],
      [3, 2],
      [2, 3]
    ],
    square: [
      [1, 1],
      [2, 1],
      [1, 2],
      [2, 2]
    ]
  };
  
  const [pattern, iterations] = process.argv.slice(2);
  const runAsScript = require.main === module;
  
  if (runAsScript) {
    if (startPatterns[pattern] && !isNaN(parseInt(iterations))) {
      main(pattern, parseInt(iterations));
    } else {
      console.log("Usage: node js/gameoflife.js rpentomino 50");
    }
  }
  
  exports.seed = seed;
  exports.same = same;
  exports.contains = contains;
  exports.getNeighborsOf = getNeighborsOf;
  exports.getLivingNeighbors = getLivingNeighbors;
  exports.willBeAlive = willBeAlive;
  exports.corners = corners;
  exports.calculateNext = calculateNext;
  exports.printCell = printCell;
  exports.printCells = printCells;
  exports.startPatterns = startPatterns;
  exports.iterate = iterate;
  exports.main = main;