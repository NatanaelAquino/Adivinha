import sytles from "./styles.module.css"
import { Letter } from "../Letter"

export type LettersProps = {
  value: string
  correct: boolean
}
type Props = {
  data: LettersProps[]
}
export function Letters({ data }: Props) {
  return (
    <div className={sytles.lettersUsed}>
      <h5>Letras utilizadas</h5>
      <div>
        {
          data.map(({ value, correct }) => (
            <Letter key={value} value={value} size="small" color={correct ? "correct" : "wrong"} />
          ))
        }
      </div>
    </div>
  )
}