import GameState from './gameObjects/gameState';
import FireStore from './utils/firebase';

let content = document.querySelector('.content');
let game = new GameState(content);

const routes = [
  {
    match: '',
    onEnter: () => {
      window.location.hash = 'game';
    }
  },
  {
    match: 'about',
    onEnter: () => {
      changeActivePage('about');
      content.innerHTML = `<h1>
             <span>Super arcade game</span>
            </h1>
            <div class="w-100"></div>
            <div>
                <h2>Author
                    <a href="https://github.com/citrinin">Kate Kuzkina</a>
                </h2>
            </div>
            <div class="about">
                <span>This is an arcade game where You will play as knight.</span>
                <img src="knight/knight_run_down_000.png" /> <br/>
                <span>You can control knight with arrow keys or if you play on mobile phone with buttons on screen.</span>
                <br/> 
                <span>Your goal is to stay alive as long as possible despite the enemies that want to kill You. </span>
                <br/>
                <span>This is Goblin – dummy enemy. <img src="goblin/goblin_run_down_000.png" width="35" /> 
                He will run in random direction all the time. </span>
                <br/>
                <span>This is Rogue – smart enemy.  <img src="rogue/rogue_run_down_000.png" width="40" />He will also run in random direction
                but if he will see You around – he will chase you till you ran away.</span>
                <br/>
                <span> Sometimes on the screen can appear fruits.
                <img src="food/Apple.png">
                <img src="food/Avocado.png">
                <img src="food/Cherry.png">
                <img src="food/Lemon.png">
                <img src="food/MelonWater.png">
                <img src="food/Peach.png">
                <img src="food/Strawberry.png">
                They will give you power to fight with enemies, but only for 3 seconds.<span><br/>
                <span>Good luck!</span>
            </div>`;
    }
  },
  {
    match: 'game',
    onEnter: () => {
      changeActivePage('game');
      game.setUpGame();
    },
    onLeave: () => {
      game.endGame();
    }
  },
  {
    match: 'scores',
    onEnter: () => {
      changeActivePage('scores');

      FireStore.getScores().then(result => {
        content.innerHTML = '<h1 class="about"><span>Scores</span></h1>';
        let ol = document.createElement('ol');
        result.forEach(item => {
          let li = document.createElement('li');
          li.innerHTML = `${item.name} - ${item.score}`;
          ol.appendChild(li);
        });

        let divForDivision = document.createElement('div');
        divForDivision.classList.add('w-100');
        content.appendChild(divForDivision);
        let div = document.createElement('div');
        div.appendChild(ol);
        content.appendChild(div);
      });
    }
  },
  {
    match: 'replay',
    onEnter: () => {
      if ((game.replayData || []).length === 0) {
        window.location.hash = 'game';
        return;
      }
      game.replayGame();
    }
  },
  {
    match: 'watchreplay',
    onEnter: () => {
      window.location.hash = 'replay';
    }
  },
  {
    match: 'newgame',
    onEnter: () => {
      window.location.hash = 'game';
    }
  }
];

function changeActivePage(newPage) {
  document.querySelector('.active').className = '';
  document.querySelector(`[href="#${newPage}"]`).parentElement.className =
    'active';
}

export default routes;
