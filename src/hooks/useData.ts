import load from '../load'
import useInit from './useInit'

export interface ProductionData {
  annual: ProductionDetail[]
  monthly: ProductionDetail[]
  weekly: ProductionDetail[]
  daily: ProductionDetail[]
  hourly: ProductionDetail[]
}

export interface ProductionDetail {
  resulted_yield: number
  grouped_date: string
}

export default function useData() {
  return useInit(() => load<ProductionData>('production_data.json'))
}
