import styles from './Video.module.scss'
import ReactPlayer from 'react-player'

export function Video({video}) {
  return (
    <ReactPlayer url={video} className={styles.video} width='100%' height={634}/>
  )
}
