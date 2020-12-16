import { useEffect, useState } from 'react'

export default function useInit<T>(
  callback: (...args: unknown[]) => T | Promise<T>
) {
  const [state, setState] = useState<T>()

  useEffect(() => {
    async function init() {
      const r = await callback()
      setState(r)
    }

    init()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return state
}
