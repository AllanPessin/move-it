import { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { ChallengeContext } from './ChallengeContext';

interface CountdownContextData {
  minutes: number;
  seconds: number;
  hasFinished: boolean;
  isActive: boolean;
  startCoutdown: () => void;
  resetCountdown: () => void;
}

interface CountdownProviderProps {
  children: ReactNode;
}

export const CountdownContext = createContext({} as CountdownContextData)

export function CountdownProvider({ children }: CountdownProviderProps) {

  //useEffect roda 1' mesmo após o isActive se tornar false
  let coutdownTimeout: NodeJS.Timeout;

  //Contex API implementada no ChallengeContext e envolta da aplicação para todos os
  //componentes terem acesso
  const { startNewChallenge } = useContext(ChallengeContext)
  //estado para quando o time chegar em 0'
  const [hasFinished, setHasFinished] = useState(false);

  //declarando stado
  //iniciar uma contagem regressiva de 1 segundo
  const [time, setTime] = useState(25 * 60);

  //estado para armazenar se botão coutdown esta ativo ou não
  const [isActive, setIsActive] = useState(false)

  //arredondar numero para baixo Math.floor
  const minutes = Math.floor(time / 60);
  //resto da divisão
  const seconds = time % 60;

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
    setHasFinished(false);
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
    <CountdownContext.Provider value={{
      minutes,
      seconds,
      hasFinished,
      isActive,
      startCoutdown,
      resetCountdown,
    }}>
      {children}
    </CountdownContext.Provider>
  )
}