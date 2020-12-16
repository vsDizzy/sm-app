export default async function load<T>(endpoint: string) {
  const res = await fetch(`data/${endpoint}`)
  return res.json() as Promise<T>
}
