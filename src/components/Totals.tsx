import { ReactNode } from 'react'
import useInit from '../hooks/useInit'
import load from '../load'
import styles from './Totals.module.scss'

interface Aggregates {
  total_production: number
  total_saved: number
  reduction_co2: number
  reduction_km: number
  reduction_flights: number
}

export default function Totals() {
  const data = useInit<Aggregates>(() => load<Aggregates>('aggregates.json'))

  return (
    <section className={styles.totals}>
      <div className="block widget">
        <div>
          <div className={styles.title}>Total produced</div>
          {data && (
            <Card pic="energy" desc="kWh">
              <div className={styles.num1}>
                {data && data.total_production?.toFixed(3)}
              </div>
            </Card>
          )}
        </div>
        <div>
          <div className={styles.title}>Total saved</div>
          {data && (
            <Card pic="piggy-bank" desc="Based on 0.23€ per kWh">
              <div className={styles.num1}>{`${Math.trunc(
                data.total_saved
              )} €`}</div>
            </Card>
          )}
        </div>
      </div>
      <div className="widget">
        <div className={styles.title}>Total CO2 reduction</div>
        <div className="block">
          {data && (
            <>
              <Card pic="leaf" desc="Travelled kilometers">
                <div className={styles.num2}>
                  {data.reduction_co2?.toFixed(3)}
                </div>
              </Card>
              <Card pic="car" desc="Savings in kg CO2">
                <div className={styles.num2}>
                  {data.reduction_km?.toFixed(3)}
                </div>
              </Card>
              <Card pic="plane" desc="Flights from Paris - NYC">
                <div className={styles.num2}>
                  {`${Math.trunc(data.reduction_flights)}`}
                </div>
              </Card>
            </>
          )}
        </div>
      </div>
    </section>
  )
}

function Card({
  pic,
  desc,
  children,
}: {
  pic: string
  desc: string
  children: ReactNode
}) {
  return (
    <div className={styles.card}>
      <div>
        <img src={`images/${pic}.svg`} alt={pic} />
      </div>
      {children}
      <div>{desc}</div>
    </div>
  )
}
