import styles from "./App.module.css"
import { Button } from "./components/Button"

import { WORDS, type Challenge } from "./utils/words"

import { Header } from "./components/Header"
import { Input } from "./components/Input"
import { Letter } from "./components/Letter"
import { Letters, type LettersProps } from "./components/LettersUsed"
import { Tip } from "./components/Tip"
import { useEffect, useState } from "react"
export default function App() {

  const [score, setScore] = useState(0)
  const [letter, setLetter] = useState("")
  const [letters, setLetters] = useState<LettersProps[]>([])
  const [challenge, setChallenge] = useState<Challenge | null>()
  const ATTEMPTS_MAX = 3

  function handlRestartGame() {
    const isConfirmed = window.confirm("Você tem certeza que deseja reiniciar?")

    if (isConfirmed) {
      startGames()
    }
  }

  function startGames() {
    const index = Math.floor(Math.random() * WORDS.length)

    const ramdomWord = WORDS[index]
    setChallenge(ramdomWord)

    setScore(0)
    setLetter("")
    setLetters([])
  }

  function handleConfirm() {
    if (!challenge) {
      return
    }
    if (!letter.trim()) {
      return alert("Digite uma letra!")
    }

    const value = letter.toUpperCase()

    const exists = letters.find((used) => used.value.toLocaleUpperCase() === value)

    if (exists) {
      setLetter("")
      return alert("Você já utilizou essa letra " + value)
    }

    const hits = challenge.word.
      toLocaleUpperCase()
      .split("")
      .filter((char) => char === value).length

    const correct = hits > 0

    const currentScore = score + hits

    setLetters((prevState) => [...prevState, { value, correct }])
    setScore(currentScore)
    setLetter("")

  }

  function endGames(message: string) {
    alert(message)
    startGames()
  }

  useEffect(() => {
    startGames()
  }, [])
  useEffect(() => {
    if (!challenge) {
      return
    }
    setTimeout(() => {
      if (score === challenge.word.length) {
        return endGames("Parabéns, você descobriu a palavra!")
      }
      const attemptLimit = challenge.word.length + ATTEMPTS_MAX
      if (letters.length == attemptLimit) {
        return endGames("Que pena, Você usou todas as tentativas!")
      }
    }, 200)
  }, [score, letters.length])

  if (!challenge) {
    return
  }
  return (
    <div className={styles.container}>
      <main>
        <Header
          current={letters.length}
          max={challenge?.word.length + ATTEMPTS_MAX}
          onRestart={handlRestartGame} />
        <Tip tip={challenge.tip} />
        <div className={styles.word}>
          {
            challenge.word.split("").map((letter, index) => {
              const letterUsed = letters.
                find((used) => used.value.toUpperCase() === letter.toUpperCase())

              return (
                <Letter key={index} value={letterUsed?.value} color={letterUsed?.correct ? "correct" : "default"} />
              )
            }
            )
          }
        </div>
        <h4>Palpite</h4>
        <div className={styles.guess}>
          <Input
            autoFocus
            maxLength={1}
            placeholder="?"
            onChange={(e) => { setLetter(e.target.value) }} />
          <Button title="Confirmar" onClick={handleConfirm} />
        </div>
        <Letters data={letters} />
      </main>
    </div>
  )
}
