function init() {

  //** To Do
  // Add Ariel to the Board in specific startingposition
  // Make sure Ariel stays on board and cant move into walls, can move up down left and right
  // Add Urusula to the board in specific position (add other ghosts later)
  // Add shellls to each square
  // Ariel must be able to move up and down within the board 
  // Ghosts move in random direction (add random direction towards Ariel later on)
  //
  

  //* Elements

  const grid = document.querySelector('.grid')

  const arielClass = 'ariel'
  const ursulaClass = 'ursula'
  const shellClass = 'shell'
  const wallClass = 'wall'

  //* Variables

  const width = 10
  const gridCellCount = width * width
  const cells = []
  const wallCells = []
    
  let timer = 0 
  let arielPosition = 55
  let ursulaPosition = 11

  //* Functions

  //* Create A Grid

  function createGrid(position) {
    for (let i = 0; i < gridCellCount; i++) {
      const cell = document.createElement('div')
      // cell.innerHTML = i
      grid.appendChild(cell)
      cells.push(cell)
      cell.classList.add(shellClass)
    }
    addUrsula(ursulaPosition)
    addAriel(position)
  }

  createGrid(arielPosition)

  //* Add Walls

  function addWallCells() {
    for (let i = 0; i < cells.length; i++) {
      if ((i < 9 || i > 90) || (i % 10 === 0) || (i % 10 === 9 ) || (i > 31 && i < 34 ) 
      || (i > 35 && i < 38 ) || (i > 61 && i < 64 ) || (i > 65 && i < 68 )) {
        wallCells.push(cells[i])
        wallCells.forEach(wallCell=> {
          wallCell.classList.add(wallClass)
        })
      }
    }
  }
  addWallCells()
  

  //* Remove Shell

  function removeShell(position) {
    if (cells[position].classList.contains(shellClass))  {
      cells[position].classList.remove(shellClass)
    } 
  }

  function addAriel(position) {
    removeShell(arielPosition)
    return cells[position].classList.add(arielClass)
  }

  //* Remove Ariel from Grid 

  function removeAriel(position) {
    cells[position].classList.remove(arielClass)
  }

  //* Add Ursula to Grid 

  function addUrsula(position) {
    cells[position].classList.add(ursulaClass)
  }

  //* Remove Ursula from Grid 

  function removeUrsula(position) {
    cells[position].classList.remove(ursulaClass)
  }

  //* Move Ariel Around the Board

  function handleKeyUp(event) {
    removeAriel(arielPosition)

    //* Horizontal and Vertical Axis 
    const horizontal = arielPosition % width 
    const vertical = Math.floor(arielPosition / width)
    
    // create a condition / varaible which checks if shes on a wall - and if so cant move into it 
  

    switch (event.keyCode) {
      case 39: // right
        if ( horizontal < width - 2) arielPosition++
        break
      case 37: // left
        if (horizontal > 1) arielPosition-- 
        break
      case 38: //up
        if (vertical > 1) arielPosition -= width
        break
      case 40: //down
        if (vertical < width - 2) arielPosition += width
        break
      default:
        console.log('Invalid Key') //* remove for prompt window 
    } 
    addAriel(arielPosition)
  }

  //* Move Ursula Around the Board 
  //* every second or less - move ursula - set an interval 
  // from her position to the left / right
  // make sure she stays on the board 

  function moveUrsula () {
    timer = setInterval(() => {
      removeUrsula(ursulaPosition)
      ursulaPosition++
      addUrsula(ursulaPosition)
    }, 800)
  }
  moveUrsula()




  //* Function for Winner - if no cells with shells left 

  

  //* Event Listeners

  document.addEventListener('keyup', handleKeyUp)

}

window.addEventListener('DOMContentLoaded', init)