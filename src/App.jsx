import { useState,useEffect, useRef } from "react"
import { clsx } from "clsx"
import { languages } from "./languages"
import { getFarewellText, getRandomWord } from "./utils"
import Confetti from "react-confetti"
import Tooltip from "./components/Tooltip/Tooltip"
import TooltipRedux from "./components/Tooltip/TooltipRedux"
import toast, { Toaster } from "react-hot-toast";

export default function GoodbyeWorld(){

	const [word, setWord] = useState(()=> getRandomWord())
	const [guessedLetter, setGuessedLetter] = useState([])
	const newGameButtonRef = useRef(null)

	const numGuessesLeft = languages.length - 1
	const wrongGuessesCount = guessedLetter.filter(letter => !word.includes(letter)).length
	
	const isGameWon = [...word].every(letter => guessedLetter.includes(letter))
	const isGameLost = wrongGuessesCount >= numGuessesLeft
	const isGameOver = isGameWon || isGameLost
	const lastGuess = guessedLetter[guessedLetter.length - 1]
	const isLastGuessIncorrect = lastGuess && !word.includes(lastGuess)


	const alphabets= "abcdefghijklmnopqrstuvwxyz"

	function addGuessedLetter(letter){
		setGuessedLetter(prev => (
			prev.includes(letter) ?
				prev :
				[...prev, letter]
		))
	}

	function newGame(){
		setGuessedLetter([])
		setWord(getRandomWord)
	}
	
	const gameStatusClass = clsx(
		"game-status",
		isGameWon && "win",
		isGameLost && "lost",
		!isGameOver && isLastGuessIncorrect && "farewell"
	)
	function renderGameStatus(){
		if(!isGameOver && isLastGuessIncorrect){
			return(
				<p >
					{getFarewellText(languages[wrongGuessesCount - 1].name)}
				</p>
			)
		}

		if(isGameWon){
			return (
				<>
					<h4>You Win!</h4>
					<p>Well done 🎉</p>
				</>
			)
		}
		if(isGameLost){
			return (
				<>
					<h4>Game Over!</h4>
					<p>You lose! Better start learning Assembly 😭</p>
				</>
			)
		}
	}


	const languageElements = languages.map((lang, index) =>{
		const isLanguageLost = index < wrongGuessesCount
		
		return(
			<span key={index} style={{backgroundColor: lang.backgroundColor, color: lang.color}} className={clsx(isLanguageLost && "lost")}>
				{lang.name}
			</span>
		)
	})

	const letterElements = word.split('').map((letter,index)=>{
		const shouldRevealLetter = isGameLost || guessedLetter.includes(letter)
		
		return (
			<span key={index} className={clsx(isGameLost && !guessedLetter.includes(letter) && "wrong-guess")}>
				{shouldRevealLetter && letter.toUpperCase()}
			</span>)
	})

	const keyboardElements = [...alphabets].map((letter,index)=>{
		const isGuessed = guessedLetter.includes(letter)
		const isCorrect = isGuessed && word.includes(letter)
		const isIncorrect = isGuessed && !word.includes(letter)

		const className = clsx(
			"keyboard-button",
			isCorrect && "correct",
			isIncorrect && "incorrect"
		)   
		return <button className={className} key={index} onClick={() => addGuessedLetter(letter)} disabled={isGameOver && true}>{letter.toUpperCase()}</button>
	})

	useEffect(()=>{
		if(wrongGuessesCount>0){

			toast(`${numGuessesLeft-wrongGuessesCount} Guesses Left`, {
				style:{
					background: 'darkgray',
					color: 'white'
				},
				icon: "⚠"
			})	
		}
	}, [wrongGuessesCount])

	// Auto-focus New Game button when game is over
	useEffect(()=>{
		if(isGameOver && newGameButtonRef.current){
			newGameButtonRef.current.focus()
		}
	}, [isGameOver])
	
	return(
		<>
			{ isGameWon && <Confetti recycle={false} numberOfPieces={1000} />}
			<header>
				<h1>The Final Compile: Endgame</h1>
				<p>Guess the word within {languages.length-1} attempts to keep the
				programming world safe from Assembly!</p>
			</header>
			<main>            
			<section className={gameStatusClass}>
				{renderGameStatus()}
			</section>
			<section className="chips">
				{languageElements}
			</section>
			<TooltipRedux text={word} currentWord={guessedLetter}>
				<div className="word">
					{letterElements}
				</div>
			</TooltipRedux>
			<section className="keyboard" >
				{keyboardElements}
			</section>
			<Toaster position="bottom-right" />
			{isGameOver && <button className="new-game" ref={newGameButtonRef} onClick={newGame}>
				New Game
			</button>}
		</main>
			<footer>
				<p>@2025 Akshay Sawant</p>
			</footer>
		</>
	)
}