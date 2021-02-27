import styles from '../styles/components/Profile.module.css'

export function Profile() {
  return (
    <div className={styles.profileContainer}>
      <img src="https://pbs.twimg.com/profile_images/1350113791305019393/gjOsq0_a_400x400.jpg" alt="Allan Pessin" />
      <div>
        <strong>Allan da Silva Pessin</strong>
        <p>
          <img src="icons/level.svg" alt="Level" />
            Level 1
        </p>
      </div>
    </div>
  )
}