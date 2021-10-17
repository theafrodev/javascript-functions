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

  let map = "";

  let vert = topRight[0];
  let hor = topRight[1];

  let vertlimit = bottomLeft[0];

  while (!vert < vertlimit){
      for(row = 0; row < hor; row++){

      map = map.concat(` ${vert} , ${row+1}`);

      map = printCell(state, [`${vert}` , `${row+1}`]);

      console.log(map);

      if(row === hor - 1){
          map = map.concat("\n");
          vert --;
      }

      /*let printout = printCells(state, [topRight[vert],bottomLeft[hor]]);

      map = map.concat(printout);

      if(hor == bottomLeft[hor]){
          map = map.concat("\n");
      }*/
      }
  }


  console.log(topRight);
  //console.log(bottomLeft);

};


const getNeighborsOf = ([x, y]) => {};

const getLivingNeighbors = (cell, state) => {};

const willBeAlive = (cell, state) => {};

const calculateNext = (state) => {};

const iterate = (state, iterations) => {};

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