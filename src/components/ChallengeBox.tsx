import { useContext } from 'react';
import { compileFunction } from 'vm';
import { ChallengeContext } from '../contexts/ChallengeContext';
import { CountdownContext } from '../contexts/CountdownContext';
import styles from '../styles/components/ChallengeBox.module.css'

export function ChallengeBox() {
  const { activeChallenge, resetChallenge, completeChallenge } = useContext(ChallengeContext)
  const { resetCountdown } = useContext(CountdownContext);

  function handleChallengeSuccess() {
    completeChallenge();
    resetCountdown();
  }

  function handleChallengeFailed() {
    resetChallenge();
    resetCountdown();
  }

  return (
    <div className={styles.challengeBoxContainer}>
      { activeChallenge ? (
        <div className={styles.challengeActive}>
          <header>Ganhe {activeChallenge.amount} xp</header>
            <main>
              <img src={`icons/${activeChallenge.type}.svg`}/>
              <strong>Novo desafio</strong>
              <p>{activeChallenge.description}</p>
            </main>
            <footer>
              <button type="button" onClick={handleChallengeFailed} className={styles.challengeFailed}>Falhei</button>
              <button type="button"  onClick={handleChallengeSuccess} className={styles.challengeSuccess}>Completei</button>
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