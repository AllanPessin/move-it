import { useContext } from 'react';
import { CountdownContext } from '../contexts/CountdownContext';
import styles from '../styles/components/Countdown.module.css'



export function Countdown() {

  const {
    minutes,
    seconds,
    hasFinished,
    isActive,
    resetCountdown,
    startCoutdown
  } = useContext(CountdownContext)

  //padStar verifica se a string tem 2 caracters
  const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
  const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');



  return (
    <div>
      <div className={styles.countdownContainer}>
        <div>
          {/* setando variaveis criados par fazer a parte de funcionalidade dos minutos e segundos */}
          <span>{minuteLeft}</span>
          <span>{minuteRight}</span>
        </div>
        <span>:</span>
        <div>
          <span>{secondLeft}</span>
          <span>{secondRight}</span>
        </div>
      </div>

      { hasFinished ? (
        <button
          disabled
          className={styles.countdownButton}
        >
          Ciclo finalizado
        </button>
      ) : (
          <>
            { isActive ? (
              <button
                type="button"
                className={`${styles.countdownButton} ${styles.countdownButtonActive}`}
                // quando o botão é pressionado a função é chamada
                onClick={resetCountdown}
              >
                Abandonar ciclo
              </button>
            ) : (
                <button
                  type="button"
                  className={styles.countdownButton}
                  // quando o botão é pressionado a função é chamada
                  onClick={startCoutdown}
                >
                  Iniciar um ciclo
                </button>
              )}
          </>
        )}
    </div>
  )
}