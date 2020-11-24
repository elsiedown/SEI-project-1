function init() {

  //** To Do
  // Start Button Should start the game
  // Add Grid with walls, shells, etc
  // Add Ariel to the Board in specific starting position
  // Make sure Ariel stays on board and cant move into walls, can move up down left and right
  // Add Urusula to the board in specific position (add other ghosts later)
  // Ghosts move in random direction (add random direction towards Ariel later on)
  
  

  //* Elements

  const grid = document.querySelector('.grid')
  const scoreDisplay = document.querySelector('#score-text')
  const livesLeft = document.querySelector('#lives-left')
  const audio = document.querySelector('#audio')
  const playMusicButton = document.querySelector('.music-button')
  const resetButton = document.querySelector('.reset-button')
  const startButton = document.querySelector('.start-button')
  const timerDisplay = document.querySelector('#timer-display')
  const yourScore = document.querySelector('#your-score')
  // const timerSecondsDisplay = document.querySelector('#seconds')
  // const timerMinutesDisplay = document.querySelector('#minutes')


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
  const possibleMoves = []

  let ghosts = [
    { name: 'ghostOne', startPosition: 14, currentPosition: 14, timerId: 0, timeInterval: 800 },
    { name: 'ghostTwo', startPosition: 24, currentPosition: 24, timerId: 0, timeInterval: 600 },
    { name: 'ghostThree', startPosition: 144, currentPosition: 144, timerId: 0, timeInterval: 1000 },
    { name: 'ghostFour', startPosition: 154, currentPosition: 154, timerId: 0, timeInterval: 900 }
  ]
   

  const movements = ['right', 'left', 'up', 'down']
  let movement = randomMovement()

    
  // let moveGhostTimer = 0 
  let ghostTimerId = 0 
  let scoreTimer = 0
  let startTimerId = null
  let countSeconds = 60
  // let countMinutes = 2
  let score = 0 
  let lives = 3
  let arielPosition = 84


  //* Functions

  //* Create A Grid

  function createGrid(position) {
    for (let i = 0; i < gridCellCount; i++) {
      const cell = document.createElement('div')
      // cell.innerHTML = i
      grid.appendChild(cell)
      cells.push(cell)
    }
    addGhostStart()
    addToGrid()
    addAriel(position)
    scoreDisplay.innerHTML = 0
  }

  createGrid(arielPosition)

  //* Add Walls, Starfish and Whirpools to Grid

  function addToGrid() {
    for (let i = 0; i < cells.length; i++) {
      if ((i < 13 || i > 155) || (i % 13 === 0) || (i % 13 === 12) || (i > 27 && i < 32 ) 
        || (i > 32 && i < 37 ) | (i > 131  && i < 136 ) || (i > 136 && i < 141 )
        || (i === 41 || i === 41)  || (i === 119 || i === 49 )
        || (i === 49  || i === 49 ) || (i === 127 )
        || (i === 83 || i === 96 || i === 97 || i === 98 || i === 85 || i === 92 || i === 66 || i === 76 || i === 102)
        || (i === 56 || i === 57 ||  i === 59 || i === 60) || (i === 122 || i === 124) || (i === 94 || i === 100)) {
        wallCells.push(cells[i])
        wallCells.forEach(wallCell=> {
          wallCell.classList.add(wallClass)
        })
      } else if ((i === 19) || (i  === 149 )) {
        possibleMoves.push(cells[i])
        starfishes.push(cells[i])
        starfishes.forEach(starfish=> {
          starfish.classList.add(starfishClass)
        })
      } else if ((i === 79) || (i === 89 )){
        possibleMoves.push(cells[i])
        whirlpools.push(cells[i])
        whirlpools.forEach(whirlpool=> {
          whirlpool.classList.add(whirlpoolClass)
        })
      } else {
        possibleMoves.push(cells[i])
        shells.push(cells[i])
        shells.forEach(shell=> {
          shell.classList.add(shellClass)
        })
      }
    }
  }


  // Items: 


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



  //* Characters
  
  //Add Ariel

  function addAriel(position) {
    removeItem(arielPosition)
    cells[position].classList.add(arielClass)  
  }

  //* Remove Ariel from Grid 

  function removeAriel(position) {
    cells[position].classList.remove(arielClass)
  }


  //* Move Ariel Around the Board

  function handleKeyUp(event) {
    removeAriel(arielPosition)

    //* Horizontal and Vertical Axis 
    const horizontal = arielPosition % width 
    const vertical = Math.floor(arielPosition / width)
    
    
    switch (event.keyCode) {
      case 39: // right 
        if (cells[arielPosition].classList.contains(whirlpoolClass)) arielPosition = 80
        else if (cells[arielPosition + 1].classList.contains(wallClass)) arielPosition += 0
        else if (horizontal < width - 2) arielPosition++ 
        break 
      case 37: // left
        if (cells[arielPosition].classList.contains(whirlpoolClass)) arielPosition = 88
        if (cells[arielPosition - 1].classList.contains(wallClass)) arielPosition += 0
        else if (horizontal > 1) arielPosition-- 
        break
      case 38: //up
        if (cells[arielPosition].classList.contains(whirlpoolClass)) arielPosition = 89
        if (cells[arielPosition - width].classList.contains(wallClass)) arielPosition += 0
        else if (vertical > 1) arielPosition -= width
        break
      case 40: //down
        if (cells[arielPosition].classList.contains(whirlpoolClass)) arielPosition = 79
        if (cells[arielPosition + width].classList.contains(wallClass)) arielPosition += 0
        else if (vertical < width - 2) arielPosition += width
        break
      default:
        console.log('Invalid Key') //* remove for prompt window 
    } 
    addAriel(arielPosition)
  }

  //* Add Ghosts to Grid 

  function addGhostStart() {
    cells[ghosts[0].startPosition].classList.add(ursulaClass)
    cells[ghosts[1].startPosition].classList.add(ursulaClass)
    cells[ghosts[2].startPosition].classList.add(ursulaClass)
    cells[ghosts[3].startPosition].classList.add(ursulaClass)
  }

  function addGhost() {
    cells[ghosts[0].currentPosition].classList.add(ursulaClass)
    cells[ghosts[1].currentPosition].classList.add(ursulaClass)
    cells[ghosts[2].currentPosition].classList.add(ursulaClass)
    cells[ghosts[3].currentPosition].classList.add(ursulaClass)
  }


  //* Remove Ghosts from Grid 

  function removeGhost() {
    cells[ghosts[0].currentPosition].classList.remove(ursulaClass)
    cells[ghosts[1].currentPosition].classList.remove(ursulaClass)
    cells[ghosts[2].currentPosition].classList.remove(ursulaClass)
    cells[ghosts[3].currentPosition].classList.remove(ursulaClass)
  }


  //* Function to Randomise Movement 

  function randomMovement() {
    const randomIndex = Math.floor(Math.random() * movements.length)
    return movements[randomIndex]
  }
  

  //* Move Ursula Around Board
  //* Move Ursula Around the Board 
  //* every second or less - move ursula - set an interval 
  // from her position to the left / right
  // make sure she stays on the board 
  //* up left right down -- pick these - if you cant do one pick again 
  // if at starfish - move down


  function moveGhost(index, timeInterval) {
    ghosts[index].timerId = setInterval(() => {
      removeGhost(ghosts[index].currentPosition)
      
      switch (movement) {
        case 'right': // right 
          if (cells[ghosts[index].currentPosition + 1].classList.contains(wallClass)) {
            movement = randomMovement()
          } else if ((cells[ghosts[index].currentPosition + 1].classList.contains(ursulaClass))) {
            movement = randomMovement()
          } else if (cells[ghosts[index].currentPosition].classList.contains(starfishClass)) {
            movement = randomMovement()
          } else {
            ghosts[index].currentPosition++
          }
          break 
        case 'left': // left
          if (cells[ghosts[index].currentPosition - 1].classList.contains(wallClass)) {
            movement = randomMovement()
          } else if ((cells[ghosts[index].currentPosition - 1].classList.contains(ursulaClass))) {
            movement = randomMovement()
          } else if (cells[ghosts[index].currentPosition].classList.contains(starfishClass)) {
            movement = randomMovement()
          } else {
            ghosts[index].currentPosition--
          }
          break 
        case 'up': //up
          if (cells[ghosts[index].currentPosition - width].classList.contains(wallClass)) {
            movement = randomMovement()
          } else if ((cells[ghosts[index].currentPosition - width].classList.contains(ursulaClass))) {
            movement = randomMovement()
          } else if (cells[ghosts[index].currentPosition - 1].classList.contains(starfishClass)) {
            movement = randomMovement()
          } else {
            ghosts[index].currentPosition -= width
          }
          break
        case 'down': //down
          if (cells[ghosts[index].currentPosition + width].classList.contains(wallClass)) {
            movement = randomMovement()
          } else if ((cells[ghosts[index].currentPosition + width].classList.contains(ursulaClass))) {
            movement = randomMovement()
          } else if (cells[ghosts[index].currentPosition - 1].classList.contains(starfishClass)) {
            movement = randomMovement()
          } else {
            ghosts[index].currentPosition += width
          }
          break 
        default:
          ghosts[index].currentPosition++
      } 
      addGhost(ghosts[index].currentPosition)
    }, timeInterval)
  }

  //*   Find coordinates of ghost new position
  // coordinates of ariel position
  // if coordinate of (ariel position - ghosts new position) is bigger than (ariel position - ghost current position) - find another move
  // if coordinate of ghost new position is smaller  - move forward 
  
  function findCoordinates(index) {
    return [index % width, Math.floor(index / width)]
  }

  function compareCoordinates(index) {
    const [currentGhostX, currentGhostY] = findCoordinates(ghosts[index].currentPosition)
    const [newGhostX, newGhostY] = findCoordinates(ghosts[index].currentPosition + 40)
    const [arielX, arielY] = findCoordinates(arielPosition)
    console.log([newGhostX, newGhostY])
    if ((Math.abs(arielX - newGhostX) || Math.abs(arielY - newGhostY)) > (Math.abs(arielX - currentGhostX) || Math.abs(arielY - currentGhostY))){
      console.log('Try Another Move')
    } else if ((Math.abs(arielX - newGhostX) || Math.abs(arielY - newGhostY)) < (Math.abs(arielX - currentGhostX) || Math.abs(arielY - currentGhostY))) {
      console.log('Move Into New Position')
    }
  }

  compareCoordinates((3))
  


  //* Scoring for Ariel being caught by Ghost

  function arielCaught(index) {
    scoreTimer = setInterval(() => {
      if (cells[ghosts[index].currentPosition].classList.contains(arielClass)) {
        removeAriel(arielPosition)
        arielPosition = 84
        addAriel(arielPosition)
        lives = lives - 1
        livesLeft.innerHTML = lives
      } else if (lives < 1) {
        endOfGame()
        livesLeft.innerHTML = 'No Lives Left'
        yourScore.innerHTML = `Game Over! You Scored ${score}`
      }
    }, 200)
  }

  arielCaught(0)
  arielCaught(1)
  arielCaught(2)
  arielCaught(3)




  // Start, End and Scoring

  //* Start Game Function

  function handleStart() {
    document.addEventListener('keyup', handleKeyUp)
    ghosts.forEach((ghost, index) => {
      moveGhost(index, ghost.timeInterval)
    })
    startTimer()
  }

  function startTimer() {
    if (startTimerId) return
    startTimerId = setInterval(() => {
      countSeconds = countSeconds - 1
      timerDisplay.innerHTML = countSeconds
      if (countSeconds < 1 ){ 
        timerDisplay.innerHTML = 'Times Up'
        yourScore.innerHTML = `Game Over! You Scored ${score}`
        endOfGame()
        return
      } 
    }, 1000)
  }

  //* Function for score:

  function updateScore() {
    if (hasShell(arielPosition)) {
      score += 20
      scoreDisplay.innerHTML = score
      // audio.src = './assets/bubble.mp3'
      // audio.play()
    } if (hasStarfish(arielPosition)) {
      score += 50
      scoreDisplay.innerHTML = score
    } if (scoreDisplay.innerHTML >= 1700) {
      endOfGame()
      return yourScore.innerHTML = `You Won! You Collected all Shells! You Scored ${score}`
    }
  }

  //* Function for Game Complete

  function endOfGame() {
    ghosts.forEach(ghost => clearInterval(ghost.timerId))
    clearInterval(startTimerId)
    clearInterval(scoreTimer)
    removeAriel(arielPosition)
  }
  
  // Other Effects

  //* Play Music 

  function handlePlaySound() {
    audio.src = './assets/Under the Sea.mp3'
    audio.play()
  }
  
  //* Reset Game

  function handleReset() {
    window.location.reload()
  }


  //* Remove Default from up and down arrow key 

  function handleKeyDown(event) {
    if (event.which === 38 || event.which === 40) {
      event.preventDefault()
    }

  }


  //* Event Listeners


  document.addEventListener('keydown', handleKeyDown)
  playMusicButton.addEventListener('click', handlePlaySound)
  resetButton.addEventListener('click', handleReset)
  startButton.addEventListener('click', handleStart)
  

}

window.addEventListener('DOMContentLoaded', init)