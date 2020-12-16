import styles from './MobileFooter.module.scss'

export function MobileFooter() {
  return (
    <div className={`${styles.footer} block`}>
      <Btn val="energy">My energy</Btn>
      <Btn val="system">My system</Btn>
      <Btn val="installer">My installer</Btn>
      <Btn val="account">My account</Btn>
    </div>
  )
}

function Btn({ val, children }: { val: string; children: string }) {
  return (
    <div>
      <div>
        <img src={`images/mobile/${val}.svg`} alt={val}></img>
      </div>
      <div>{children}</div>
    </div>
  )
}
