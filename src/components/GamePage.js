import { useState, useEffect  } from 'react';
import {Modal,ExitModal} from './Modal';
import {Link} from 'react-router-dom';

function GamePage() {
  const [number, setNumber] = useState(Math.floor(Math.random() * 100) + 1);
  const [guess, setGuess] = useState("");
  const [message, setMessage] = useState("Guess a number between 1 and 100.");
  const [tries, setTries] = useState(10);
  const [guesses, setGuesses] = useState([]);
  const [color, setColor] = useState("black");
  const [disable, setDisable] = useState(false);
  const [showModal,setShowModal] = useState(false);
  const [showExitModal,setShowExitModal] = useState(false);
  const [points, setPoints] = useState(() => {
    const storedPoints = localStorage.getItem('points');
    return storedPoints ? parseInt(storedPoints) : 0;
  });

  // The useEffect hook is used to store the points in 
  // local storage whenever it changes. It listens to changes in 
  // the points state variable and calls localStorage.setItem to save the updated points value.

  useEffect(() => {
    localStorage.setItem('points', points.toString());
  }, [points]);


  const handleSubmit = (e) => {
    e.preventDefault();
    const guessNumber = parseInt(guess);
    if (guessNumber < 1 || guessNumber > 100) {
      setMessage("Please enter a number between 1 and 100.");
    } else if (guess === "") {
      setMessage("Please enter a number between 1 and 100.");
    } else if (guessNumber === number) {
      setMessage(`Congratulations! You guessed the number ${number} in ${10 - tries + 1} tries.`);
      setTries(0);
      setDisable(true);
      setGuesses([...guesses, guessNumber]);
      setColor("green");
      setPoints(points + 1);
    } else if (tries === 1) {
      setMessage("GAME OVER!!!");
      setTries(0);
      setDisable(true);
      setGuesses([...guesses, guessNumber]);
      setColor("red");
    } else if (guessNumber > number) {
      setMessage(`The number is lower than ${guessNumber}.`);
      setTries(tries - 1);
      setGuesses([...guesses, guessNumber]);
      setColor("blue");
    } else {
      setMessage(`The number is higher than ${guessNumber}.`);
      setTries(tries - 1);
      setGuesses([...guesses, guessNumber]);
      setColor("red");
    }

    setGuess("");
  };

  const handleReset = () => {
    setNumber(Math.floor(Math.random() * 100) + 1);
    setGuess("");
    setMessage("Guess a number between 1 and 100.");
    setTries(10);
    setGuesses([]);
    setColor("black");
    setDisable(false);
  };

  const handleModal = () => setShowModal(true);
  const handleExitModal = () => setShowExitModal(true);

  return (
    <div className='gamepage'>
      <div className='gamepage-content'>

        <h2>
          Random number selected between 1 and 100. See if you can guess it in
          10 turns or fewer. If you cannot guess the correct number after 10 tries, the game is over
        </h2>

        <form onSubmit={handleSubmit}>
          <input
            disabled={disable}
            type="text"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
          /><br />

          <button disabled={disable} type="submit">Guess</button>
          <button onClick={handleReset} className='btn-reset'>Reset</button>
          <p style={{ color: color }}>{message}</p>
        </form>
        <div className='gamepage-status'>
          <p>Previous guesses: {guesses.join(", ")}</p>
          <p>Tries left: {tries}</p>
          <p>Correct Guesses : {points}</p>
        </div>
        <div className='gamepage-quit'>
        <Link to="/" onClick={handleReset} className='btn-quit'>QUIT</Link>
        {showModal && <Modal setShowModal={setShowModal}/>}
        <a href='#' onClick={handleModal}>Scoreboard</a>
        </div>
      </div>
    </div>
  );


}

export default GamePage;