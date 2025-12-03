import styles from "./styles.module.css"
import icon from "../../assets/tip.svg"
type Props = {
  tip: string
}

export function Tip({ tip }: Props) {
  return (
    <div>
      <img src={icon} alt="Icone de dica" className={styles.icon} />
      <div>
        <h3>Dica</h3>
        <p>{tip}</p>
      </div>
    </div>
  )

}