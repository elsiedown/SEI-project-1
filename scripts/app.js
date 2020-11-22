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
  const livesLeft = document.querySelector('#lives-left')
  const audio = document.querySelector('#audio')
  const playMusicButton = document.querySelector('.music-button')
  const resetButton = document.querySelector('.reset-button')
  const startButton = document.querySelector('.start-button')
  const timerDisplay = document.querySelector('#timer')

  

  const arielClass = 'ariel'
  const ursulaClass = 'ursula'
  const shellClass = 'shell'
  const wallClass = 'wall'
  const starfishClass = 'starfish'
  const whirlpoolClass = 'whirlpool'
  

  //* Variables

  const width = 13
  const gridCellCount = width * width
  const cells = []
  const wallCells = []
  const starfishes = []
  const whirlpools = []
  const shells = []

  const wallLayout = [28, 29, 30, 31, ,33, 34, 35, 36]

    
  let timer = 0 
  let timerId = null
  let count = 2.30
  let score = 0 
  let lives = 3
  let arielPosition = 84
  let ursulaPosition = 22

  //* Functions

  //* Create A Grid

  function createGrid(position) {
    for (let i = 0; i < gridCellCount; i++) {
      const cell = document.createElement('div')
      // cell.innerHTML = i
      grid.appendChild(cell)
      cells.push(cell)
      // cell.classList.add(shellClass)
    }
    addUrsula(ursulaPosition)
    addToGrid()
    addAriel(position)
    scoreDisplay.innerHTML = 0
  }

  createGrid(arielPosition)

  //* Add Walls, Starfish and Whirpools

  function addToGrid() {
    for (let i = 0; i < cells.length; i++) {
      if ((i < 13 || i > 155) || (i % 13 === 0) || (i % 13 === 12) || (i > 27 && i < 32 ) 
        || (i > 32 && i < 37 ) | (i > 131  && i < 136 ) || (i > 136 && i < 141 )
        || (i === 41 || i === 41 || i === 54 || i === 67)  || (i === 93 || i === 106 || i === 119 || i === 49 )
        || (i === 49 || i === 62 || i === 75 || i === 49 ) || (i === 101 || i === 114 || i === 127 )
        || (i === 83 || i === 96 || i === 97 || i === 98 || i === 85 )) {
        wallCells.push(cells[i])
        wallCells.forEach(wallCell=> {
          wallCell.classList.add(wallClass)
        })
      } else if ((i === 19) || (i === 79 ) || (i  === 89 ) || (i  === 149 ) ){
        starfishes.push(cells[i])
        starfishes.forEach(starfish=> {
          starfish.classList.add(starfishClass)
        })
      } else if ((i === 14) || (i === 154 )){
        whirlpools.push(cells[i])
        whirlpools.forEach(whirlpool=> {
          whirlpool.classList.add(whirlpoolClass)
        })
      } else {
        shells.push(cells[i])
        shells.forEach(shell=> {
          shell.classList.add(shellClass)
        })
      }
    }
  }

  //* Remove Item

  function removeItem(position) {
    updateScore()
    if (hasShell(position))  {
      cells[position].classList.remove(shellClass)
    }
    if (hasStarfish(position))  {
      cells[position].classList.remove(starfishClass)
    }  
  }

  //* Has shell or starfish function

  function hasShell(position) {
    return cells[position].classList.contains(shellClass)
  }

  function hasStarfish(position) {
    return cells[position].classList.contains(starfishClass)
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


  //* Move Ariel Around the Board

  function handleKeyUp(event) {
    removeAriel(arielPosition)

    //* Horizontal and Vertical Axis 
    const horizontal = arielPosition % width 
    const vertical = Math.floor(arielPosition / width)
    
    
    switch (event.keyCode) {
      case 39: // right 
        if (cells[arielPosition].classList.contains(whirlpoolClass)) arielPosition = 15
        else if (cells[arielPosition + 1].classList.contains(wallClass)) arielPosition += 0
        else if (horizontal < width - 2) arielPosition++ 
        break 
      case 37: // left
        if (cells[arielPosition].classList.contains(whirlpoolClass)) arielPosition = 153
        if (cells[arielPosition - 1].classList.contains(wallClass)) arielPosition += 0
        else if (horizontal > 1) arielPosition-- 
        break
      case 38: //up
        if (cells[arielPosition].classList.contains(whirlpoolClass)) arielPosition = 153
        if (cells[arielPosition - width].classList.contains(wallClass)) arielPosition += 0
        else if (vertical > 1) arielPosition -= width
        break
      case 40: //down
        if (cells[arielPosition].classList.contains(whirlpoolClass)) arielPosition = 15
        if (cells[arielPosition + width].classList.contains(wallClass)) arielPosition += 0
        else if (vertical < width - 2) arielPosition += width
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

  const randomUrsulaIndex = Math.floor(Math.random() * cells.length)
    
  // if hits walls then skip
  // if 

  function moveUrsula () {
    timer = setInterval(() => {
      removeUrsula(ursulaPosition)
      ursulaPosition++
      addUrsula(ursulaPosition)
    }, 500)
  }


  console.log(ursulaPosition)



  //* Function for score:

  function updateScore() {
    if (hasShell(arielPosition)) {
      score += 20
      // audio.src = './assets/bubble.mp3'
      // audio.play()
    } if (hasStarfish(arielPosition)) {
      score += 50
    }
    scoreDisplay.innerHTML = score
    winner()
  }

  //* Function for Game Complete

  function winner() {
    if (scoreDisplay.innerHTML >= 1840) {
      return scoreDisplay.innerHTML = 'Winner'
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


  //* Start Game

  function handleStart() {
    moveUrsula()
    startTimer()
  }

  function startTimer() {
    timerId = setInterval(() => {
      count = count - 0.01
      timerDisplay.innerHTML = count.toFixed(2)
      if (count === 0) {
        clearInterval(timerId)
        timerDisplay.innerHTML = 'Times up'
      }
    }, 1000)
  }

  //* Ariel caught by Ursula + loose a life function

  function arielCaught() {
    timer = setInterval(() => {
      if ((cells[arielPosition + 1].classList.contains(ursulaClass)) ||
         (cells[arielPosition - 1].classList.contains(ursulaClass)) ||
         (cells[arielPosition + width].classList.contains(ursulaClass)) ||
         (cells[arielPosition - width].classList.contains(ursulaClass))) {
        lives = lives - 1
        clearInterval()
        livesLeft.innerHTML = lives
      } 
    }, 500)
  }

  arielCaught()

  //* Remove Default from up and down arrow key 

  function handleKeyDown(event) {
    if (event.which === 38 || event.which === 40) {
      event.preventDefault()
    }

  }
  

  //* Event Listeners

  document.addEventListener('keyup', handleKeyUp)
  document.addEventListener('keydown', handleKeyDown)
  playMusicButton.addEventListener('click', handlePlaySound)
  resetButton.addEventListener('click', handleReset)
  startButton.addEventListener('click', handleStart)
  

}

window.addEventListener('DOMContentLoaded', init)