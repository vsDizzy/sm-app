import useInit from '../hooks/useInit'
import load from '../load'
import styles from './UserMenu.module.scss'

interface SystemInfo {
  name: string
}

export default function UserMenu() {
  const si = useInit<SystemInfo>(() => load('system_info.json'))

  return (
    <div className={styles.menu}>
      <img src="images/menu.svg" alt="menu" />
      <div>
        {si?.name}
        <img src="images/user-avatar.svg" alt="avatar" />
      </div>
    </div>
  )
}
