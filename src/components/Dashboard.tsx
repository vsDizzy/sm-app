import useData from '../hooks/useData'
import useMobile from '../hooks/useMobile'
import DesktopHeader from './DesktopHeader'
import { MobileFooter } from './MobileFooter'
import MobileHeader from './MobileHeader'
import Production from './Production'
import ProductionToday from './ProductionToday'
import Totals from './Totals'
import UserMenu from './UserMenu'

export default function Dashboard() {
  const data = useData()
  const mobile = useMobile()

  return mobile ? (
    <>
      <MobileHeader />
      <Totals />
      <ProductionToday data={data?.hourly} />
      <Production data={data} />
      <MobileFooter />
    </>
  ) : (
    <>
      <UserMenu />
      <DesktopHeader />
      <div className="block">
        <Totals />
        <ProductionToday data={data?.hourly} />
      </div>
      <Production data={data} />
    </>
  )
}
