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
  const scoreDisplay = document.querySelector('#score-text')
  const audio = document.querySelector('#audio')
  const playMusicButton = document.querySelector('.music-button')
  const resetButton = document.querySelector('.reset-button')
  const startButton = document.querySelector('.start-button')

  

  const arielClass = 'ariel'
  const ursulaClass = 'ursula'
  const shellClass = 'shell'
  const wallClass = 'wall'
  const starfishClass = 'starfish'
  const whirlpoolClass = 'whirlpool'
  

  //* Variables

  const width = 10
  const gridCellCount = width * width
  const cells = []
  const wallCells = []
  const starfishes = []
  const whirlpools = []
    
  let timer = 0 
  let score = 0 
  let arielPosition = 55
  let ursulaPosition = 54
  const trapdoorPosition = 12

  //* Functions

  //* Create A Grid

  function createGrid(position) {
    for (let i = 0; i < gridCellCount; i++) {
      const cell = document.createElement('div')
      cell.innerHTML = i
      grid.appendChild(cell)
      cells.push(cell)
      cell.classList.add(shellClass)
    }
    addUrsula(ursulaPosition)
    addAriel(position)
    addWallCells()
    addStarfish()
    addWhirlpool()
    scoreDisplay.innerHTML = 0
  }

  createGrid(arielPosition)

  //* Add Walls, Starfish and Whirpools

  function addWallCells() {
    for (let i = 0; i < cells.length; i++) {
      if ((i < 9 || i > 90) || (i % 10 === 0) || (i % 10 === 9 ) || (i > 31 && i < 34 ) 
      || (i > 35 && i < 38 ) || (i > 61 && i < 64 ) || (i > 65 && i < 68 )) {
        wallCells.push(cells[i])
        wallCells.forEach(wallCell=> {
          wallCell.classList.add(wallClass)
          wallCell.classList.remove(shellClass)
        })
      }
    }
  }

  function addStarfish() {
    for (let i = 0; i < cells.length; i++) {
      if ((i === 15) || (i === 58 ) || (i  === 85 ) || (i  === 51 )){
        starfishes.push(cells[i])
        starfishes.forEach(starfish=> {
          starfish.classList.add(starfishClass)
          starfish.classList.remove(shellClass)
        })
      }
    }
  }

  function addWhirlpool() {
    for (let i = 0; i < cells.length; i++) {
      if ((i === 11) || (i === 88 )){
        whirlpools.push(cells[i])
        whirlpools.forEach(whirlpool=> {
          whirlpool.classList.add(whirlpoolClass)
          whirlpool.classList.remove(shellClass)
        })
      }
    }
  }


  
  
  

  //* Remove Shell

  function removeItem(position) {
    updateScore()
    if (hasShell(position))  {
      cells[position].classList.remove(shellClass)
    }
    if (hasStarfish(position))  {
      cells[position].classList.remove(starfishClass)
    }  
  }

  //* Add Ariel

  function addAriel(position) {
    removeItem(arielPosition)
    cells[position].classList.add(arielClass)  
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

  //* has shell function

  function hasShell(position) {
    return cells[position].classList.contains(shellClass)
  }

  function hasStarfish(position) {
    return cells[position].classList.contains(starfishClass)
  }

  //* Function for score:

  function updateScore() {
    if (hasShell(arielPosition)) {
      score += 50
    } if (hasStarfish(arielPosition)) {
      score += 100
    }
    scoreDisplay.innerHTML = score
  }

  //* Move Ariel Around the Board

  function handleKeyUp(event) {
    removeAriel(arielPosition)

    //* Horizontal and Vertical Axis 
    const horizontal = arielPosition % width 
    const vertical = Math.floor(arielPosition / width)
    

    switch (event.keyCode) {
      case 39: // right
        if (cells[arielPosition].classList.contains(whirlpoolClass)) arielPosition = 12
        else if (cells[arielPosition + 1].classList.contains(wallClass)) arielPosition += 0
        else if (horizontal < width - 2) arielPosition++ 
        break 
      case 37: // left
        if (cells[arielPosition].classList.contains(whirlpoolClass)) arielPosition = 87
        if (cells[arielPosition - 1].classList.contains(wallClass)) arielPosition += 0
        else if (horizontal > 1) arielPosition-- 
        break
      case 38: //up
        if (cells[arielPosition].classList.contains(whirlpoolClass)) arielPosition = 87
        if (cells[arielPosition - width].classList.contains(wallClass)) arielPosition += 0
        else if (vertical > 1) arielPosition -= width
        break
      case 40: //down
        if (cells[arielPosition].classList.contains(whirlpoolClass)) arielPosition = 12
        if (cells[arielPosition + width].classList.contains(wallClass)) arielPosition += 0
        else if (vertical < width - 2) arielPosition += width
        break
      default:
        console.log('Invalid Key') //* remove for prompt window 
    } 
    addAriel(arielPosition)
  }

  // function trapdoor() {
  //   if (cells[arielPosition].classList.contains(whirlpoolClass)) arielPosition = 11 {
  //     arielPosition = 11
  //   }
  //   addAriel(arielPosition)
  // }

  // trapdoor()







  //* Move Ursula Around the Board 
  //* every second or less - move ursula - set an interval 
  // from her position to the left / right
  // make sure she stays on the board 

  const ursulaHorizontal = ursulaPosition % width 
  const ursulaVertical = Math.floor(ursulaPosition / width)
  const ursulaArray = ['right', 'left', 'up', 'down']

  // const moveRight = ursulaPosition++
  // const moveLeft = ursulaPosition--
  // const moveUp = ursulaPosition += width 
  // const moveDown = ursulaPosition += width 

  // ursulaArray.push(moveRight)
  // ursulaArray.push(moveLeft)
  // ursulaArray.push(moveDown)
  // ursulaArray.push(moveUp)

  const randomUrsulaIndex = Math.floor(Math.random() * ursulaArray.length)
    
  // if hits walls then skip
  // if 

  function moveUrsula () {
    timer = setInterval(() => {
      removeUrsula(ursulaPosition)
      if (cells[ursulaPosition + 1].classList.contains(wallClass)) { 
        ursulaPosition -= width
      } else  if (cells[ursulaPosition - width].classList.contains(wallClass)) { 
        ursulaPosition--
      } else  if (cells[ursulaPosition - 1].classList.contains(wallClass)) { 
        ursulaPosition += width
      }  else  if (cells[ursulaPosition + width].classList.contains(wallClass)) { 
        ursulaPosition++


      } else if (ursulaHorizontal < width - 2) {
        ursulaPosition++ 
      }  else if (ursulaHorizontal > 1)  {
        ursulaPosition--
      } else if (ursulaVertical > 1) {
        ursulaPosition -= width
      } else if (ursulaVertical < width - 2) {
        ursulaPosition += width


      } else if (ursulaArray[randomUrsulaIndex] === 'right') {
        ursulaPosition++
      } else if (ursulaArray[randomUrsulaIndex] === 'left') {
        ursulaPosition--
      } else if (ursulaArray[randomUrsulaIndex] === 'up') {
        ursulaPosition -= width 
      } else if (ursulaArray[randomUrsulaIndex] === 'down') {
        ursulaPosition += width 
      }
      addUrsula(ursulaPosition)
    }, 500)
  }

  // moveUrsula()

  console.log(ursulaPosition)







  //* Function for Winner - if no cells with shells left

  function winner() {
    if (score === 200) {
      scoreDisplay.innerHTML = 'game over'
    }
  }

  winner()

  //* Play Music 

  function handlePlaySound() {
    audio.src = './assets/Under the Sea.mp3'
    audio.play()
  }
  
  //* Reset Game

  function handleReset() {
    window.location.reload()
  }
  

  

  //* Event Listeners

  document.addEventListener('keyup', handleKeyUp)
  playMusicButton.addEventListener('click', handlePlaySound)
  resetButton.addEventListener('click', handleReset)

}

window.addEventListener('DOMContentLoaded', init)