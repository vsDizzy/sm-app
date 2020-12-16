import { useEffect, useState } from 'react'

function getIsMobile() {
  return /mobile/i.test(navigator.userAgent)
}

export default function useMobile() {
  useEffect(() => {
    window.onresize = () => setIsMobile(getIsMobile())
  }, [])

  const [isMobile, setIsMobile] = useState(getIsMobile())
  return isMobile
}
