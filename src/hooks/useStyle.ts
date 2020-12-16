import useInit from './useInit'

export default function useStyle(name: string) {
  return useInit(() =>
    getComputedStyle(document.documentElement).getPropertyValue(name)
  )
}
