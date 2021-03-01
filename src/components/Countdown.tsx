import { stringify } from 'querystring';
import { useState, useEffect, useContext } from 'react'
import { ChallengeContext } from '../contexts/ChallengeContext';
import styles from '../styles/components/Countdown.module.css'

//useEffect roda 1' mesmo após o isActive se tornar false
let coutdownTimeout: NodeJS.Timeout;

export function Countdown() {
  //Contex API implementada no ChallengeContext e envolta da aplicação para todos os
  //componentes terem acesso
  const { startNewChallenge } = useContext(ChallengeContext)
  //estado para quando o time chegar em 0'
  const [hasFinished, setHasFinished] = useState(false);

  //declarando stado
  //iniciar uma contagem regressiva de 1 segundo
  const [time, setTime] = useState(0.1 * 60);

  //estado para armazenar se botão coutdown esta ativo ou não
  const [isActive, setIsActive] = useState(false)

  //arredondar numero para baixo Math.floor
  const minutes = Math.floor(time / 60);
  //resto da divisão
  const seconds = time % 60;
  //padStar verifica se a string tem 2 caracters
  const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
  const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');

  //função para iniciar a contagem regressiva
  function startCoutdown() {
    //setando estado de verificação do butão como true
    setIsActive(true);
  };

  //função para para o time quando botão "Abandonar" for pressionado
  //como useEffect observa o valor do isActive ele dispara o efeito
  //clearTimout(countdownTimeout) cancela o setTime()
  //o countdown precisa voltar em 25'' quando o ciclo for interrompido 
  function resetCountdown() {
    clearTimeout(coutdownTimeout);
    setHasFinished(true);
    setIsActive(false);
    setTime(25 * 60);
  }

  //2 parametros 1ºo que sera executado(sempre função) useEffect (() =>*{}*, ()) - 2ºquando sera executado(isActive no caso) useEffect (() => {}, *[]*)
  //coutdowntimeout auxiliar na função de contagem, fazendo a função para antes de ser executada mais 1' 
  useEffect(() => {
    if (isActive && time > 0) {
      coutdownTimeout = setTimeout(() => {
        setTime(time - 1)
      }, 1000)
      //verificando se o timer chegou em 0'
    } else if (isActive && time === 0) {
      setHasFinished(true);
      setIsActive(false);
      startNewChallenge();
    }
  }, [isActive, time])

  return (
    <div>
      <div className={styles.countdownContainer} >
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