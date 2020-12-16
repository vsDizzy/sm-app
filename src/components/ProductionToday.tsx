import { useEffect, useState } from 'react'
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts'
import { ProductionDetail } from '../hooks/useData'
import useStyle from '../hooks/useStyle'
import styles from './ProductionToday.module.scss'

export default function ProductionToday({
  data,
}: {
  data?: ProductionDetail[]
}) {
  const total = useTotal(data)
  const gridStroke = useStyle('--Monkey-Taupe-Grey')
  const areaStroke = useStyle('--Monkey-Orange-Oetang')

  return (
    <div className={`${styles.today} widget`}>
      <div className={styles.title}>Production today</div>
      <div className={styles.total}>{total && `${total.toFixed(3)} kWh`}</div>
      <AreaChart width={400} height={225} data={data}>
        <CartesianGrid vertical={false} stroke={gridStroke} />
        <XAxis
          dataKey="grouped_date"
          tickLine={false}
          tickFormatter={(x) => {
            const d = new Date(x)
            return `${d.getHours()}u`
          }}
          minTickGap={24}
        />
        <YAxis
          dataKey="resulted_yield"
          tickLine={false}
          minTickGap={24}
          width={32}
        />
        <Area
          dataKey="resulted_yield"
          stroke={areaStroke}
          strokeWidth="2px"
          fill={areaStroke}
          fillOpacity="0.2"
          animationDuration={0}
        />
      </AreaChart>
    </div>
  )
}

function useTotal(data?: ProductionDetail[]) {
  const [total, setTotal] = useState<number>()

  useEffect(() => {
    if (!Array.isArray(data)) {
      return
    }

    const total = data.map((x) => x.resulted_yield).reduce((a, c) => a + c)
    setTotal(total)
  }, [data])

  return total
}
