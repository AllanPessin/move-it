import styles from '../styles/components/ChallengeBox.module.css'

export function ChallengeBox() {

  const hasActivechallenge = true;

  return (
    <div className={styles.challengeBoxContainer}>
      { hasActivechallenge ? (
        <div className={styles.challengeActive}>
          <header>Ganhe 400xp</header>
            <main>
              <img src="icons/body.svg" alt=""/>
              <strong>Novo desafio</strong>
              <p>Levante e faça uma caminhada de 3 mintos</p>
            </main>
            <footer>
              <button type="button" className={styles.challengeFailed}>Falhei</button>
              <button type="button" className={styles.challengeSuccess}>Completei</button>
            </footer>         
        </div>
      ) : (
          <div className={styles.challengeNotActive}>
            <strong>Inicie um ciclo para receber um deasafio</strong>
            <p>
              <img src="icons/level-up.svg" alt="Level up" />
           Avance de level completando desafios
        </p>
          </div>
        )}
    </div>
  )
}