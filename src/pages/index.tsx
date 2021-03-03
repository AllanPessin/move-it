import React from "react"
import { GetServerSideProps } from 'next'
import { CompletedChallenge } from "../components/CompletedChallenge"
import { Countdown } from "../components/Countdown"
import { ExperienceBar } from "../components/ExperienceBar"
import { Profile } from "../components/Profile"
import styles from '../styles/pages/Home.module.css'
import Head from 'next/head'
import { ChallengeBox } from "../components/ChallengeBox"
import { CountdownProvider } from "../contexts/CountdownContext"
import { ChallengesProvider } from "../contexts/ChallengeContext"

interface HomeProps{
  level: number,
  currentExperience: number,
  challengesCompleted: number,
}

export default function Home(props) {
  return (
    <ChallengesProvider 
    level={props.level}
    currentExperience={props.currentExperience}
    challengesCompleted={props.challengesCompleted}
    >
      <div className={styles.container}>
        <Head >
          <title>Inicio | Move It</title>
        </Head>
        <ExperienceBar />
        <CountdownProvider>
          <section>
            <div>
              <Profile />
              <CompletedChallenge />
              <Countdown />
            </div>
            <div>
              <ChallengeBox />
            </div>
          </section>
        </CountdownProvider>
      </div>
    </ChallengesProvider>
  )
}

//ServerSideProps faz requisição a API sem interferir na camada font-end
//sempre sera uma função assincrona 
export const getServerSideProps: GetServerSideProps = async (ctx) => {

  const { level, currentExperience, challengesCompleted } = ctx.req.cookies;

  return {
    props: {
      level: Number(level),
      currentExperience: Number(currentExperience),
      challengesCompleted: Number(challengesCompleted),
    }
  }
}