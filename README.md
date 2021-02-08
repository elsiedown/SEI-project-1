# General Assembly SEI Project 1: Simple Front-End Game

## Project 1: Little Mermaid Pacman

You can find a hosted version of my game here : [Little Mermaid Pacman](https://elsiedown.github.io/SEI-project-1/)

## Overview

This was my first project on the General Assembly Software Engineering Immersive course.  After three weeks of learning, we were assigned a week-long individual project with the goal of building a single page game using JavaScript, HTML and CSS. 

I decided to choose the classic arcade game PacMan,  adding a personal twist by picking a Little Mermaid theme.  The aim of the game is for the Little Mermaid (Pacman) to pick up all the shells in the maze before the time runs out and without being hunted by Ursula (the ghosts). 

This Readme will outline the approach I took and the wins and challenges that I encountered along the way.


## Brief
* Render a game in the browser
* Design logic for winning & visuals display which player won
* Include separate HTML / CSS / JavaScript files
* Use Javascript for DOM manipulation.
* Deploy your game online, using Github Pages, where the rest of the world can access it
* Use semantic markup for HTML and CSS

##Specific Game Brief:
* The player should be able to clear at least one board
* The player’s score should be displayed at the end of the game
* Create 4 ghosts + create effective logic for the ghosts


## Timeframe and Technologies Used

**7 days**

**Front End:**

* JavaScript (ES6)
* HTML5 & HTML5 Audio
* CSS3 with Animation

**Dev Tools:**

* VSCode
* Eslint
* Git
* Google Chrome Dev Tools
* Google Fonts
* GitHub

## Features and Pages
* Single Page Game
* Score Board with Time and Lives
* Timers
* Restart Button
* Audio

## Game Instructions
1. The player (Ariel) has 60 seconds to clear the board, collecting all the shells before the time runs out and without being caught by the ghosts (Ursula).  For each shell collected, the player gets 20 points and 50 points for the starfishes.
2. To escape Ursula , Ariel can use the whirlpool warp holes to move from one side of the board to the other.
3. If Ursula catches Ariel, Ariel goes back to the beginning of the board and loses one life.
4. If all lives are lost or the time runs out, the game is over. The player can then play again. 
5. The score board displays the result and points scored at the end of the game.

## Approach Taken

This sections sets out the approach that I took and the problems which I encountered.

I started by  mounting the grid, using JavaScript. I started with a 10x10 grid but made the grid bigger once I had it in place.  I then added different classes to the grid (eg. Walls / shells / starfish / whirlpools).

I then focused on the movement of Pacman, responding to the different arrow keys using a switch statement to make sure the player stayed within the grid and could move up + down, left and right.  The challenge I faced at this point was not only ensuring  that Pacman stayed on the board, but that the Pacman stayed within the maze grid and didn’t go ‘under’ the walls of the maze.

I then moved onto the ghost movement. At first, I aimed to generate a completely random movement for the ghost. Similar to Pacman, I used a switch statement to ensure the ghost stayed on the grid and within the maze path. I had difficulty making the ghosts turn at junctions and they kept getting stuck in the corners of the grid at first. Once I was happy with the random movement I decided to add the other ghosts. The easiest way to do this was by creating an array of objects of ghosts,  with different speeds and starting positions and Timer Ids.  This took quite a while to put in place but then meant the function was reusable, passing in the different ghost indexes and resulting in the ghosts being added to the grid. The timers were also difficult to implement and I encountered a few bugs with the ghosts where they were going at the wrong speeds.

The final challenge was to generate an ‘intelligent’ ghost movement - where the ghosts were tracking Pacman. I did this by generating the current and new coordinates of the ghosts, as well as the current coordinates of Pacman and then compared the three coordinates.  I worked out that if the (Pac-Man coordinates - new ghost position coordinates) is smaller than (Pac-Man coordinates - current ghost position) then the ghost could move into the new position. Similarly, if the result of first calculation was greater than the second calculation, then the ghost should choose a different direction.

After I was happy that I had achieved the above functionality, I moved onto styling my game.  I added instructions and score boards, as well as buttons for the start and reset buttons. I then added in GIFS and affects (such as bubbles) for when the game was in play. The final thing I focussed on was the audio . I used 5 different audio clips from the Little Mermaid for the following parts of the game - general soundtrack, ‘lost life’ sound, game over sound, times over sound and winner sound.

## Screen Shots

## Challenges

The main challenge for me was coming up with the ghost logic and applying the logic to multiple ghosts. This included refactoring my code and adding in an object of ghosts which then sped up the process and made life a lot easier. I also found the timers slightly difficult to get my head around but was happy that they all seemed to be working by the end. 

Bugs - Ursula movement  double up  go on top of each other

## Key Takeaways

As this was my first ever project using JavaScript, I was really happy with the final product. I also really enjoyed playing with CSS (something I was nervous about when starting the project) and felt the game looked fun and interesting. I was really happy with the layout of my code and think it is pretty concise and readable. I was also happy with the different audio files that I used - I found them on a movie sound database and I think they work well (music whilst the game is in play / lost a life / game over / times up )

## Future Features

My main improvement would be to work on the Ghost Logic - I feel they could probably track Pacman in a more accurate way (but felt the difficult level was appropriate for a child). I would have liked to add the functionality which enabled Pacman to eat food that would make the ghost run away.

 If I had more time, I would also like to try and make the game mobile responsive or playable on a touchscreen device.

I would also have liked to added more levels - possibly with a more complex maze or with different timers used.

I would have also liked to have used local storage in order to create a persistent leaderboard.