import { cloneElement, Key, ReactElement, useState } from 'react'
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts'
import useStyle from '../hooks/useStyle'
import styles from './Production.module.scss'

export default function Production({ data }: { data: any }) {
  const [current, setCurrent] = useState<Key>('weekly')
  const gridStroke = useStyle('--Monkey-Taupe-Grey')
  const barStroke = useStyle('--Monkey-Orange-Oetang')

  let lm: number

  return (
    <div className={`${styles.prod} widget`}>
      <div className="flex">
        <div className={styles.title}>Production per</div>
        <img src="images/calendar.svg" alt="calendar" />
      </div>

      <Nav current={current} onChanged={setCurrent}>
        <div key="daily">Day</div>
        <div key="weekly">Week</div>
        <div key="monthly">Month</div>
        <div key="annual">Year</div>
      </Nav>

      <BarChart width={720} height={360} data={data?.[current]}>
        <CartesianGrid vertical={false} stroke={gridStroke} />
        <XAxis
          tickLine={false}
          dataKey="grouped_date"
          minTickGap={24}
          tickFormatter={(x) => {
            const d = new Date(x)
            switch (current) {
              case 'annual':
                return d.getFullYear()
              case 'monthly':
                return d.toLocaleDateString(undefined, { month: 'short' })
              case 'weekly':
              case 'daily':
                const m = d.getMonth()
                if (m === lm) {
                  return d.getDate()
                } else {
                  lm = m
                  return d.toLocaleDateString(undefined, { month: 'short' })
                }
              default:
                return x
            }
          }}
        />
        <YAxis
          tickLine={false}
          dataKey="resulted_yield"
          minTickGap={24}
          width={32}
        />
        <Bar
          dataKey="resulted_yield"
          fill={barStroke}
          stroke={barStroke}
          animationDuration={0}
        />
      </BarChart>
    </div>
  )
}

function Nav({
  current,
  children,
  onChanged,
}: {
  current: Key
  children: ReactElement[]
  onChanged: (val: Key) => void
}) {
  return (
    <nav>
      {children.map((x) =>
        cloneElement(x, {
          className: x.key === current ? styles.active : undefined,
          onClick: () => onChanged(x.key!),
        })
      )}
    </nav>
  )
}
