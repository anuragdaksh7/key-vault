export async function shareEnv(data: Record<string, any>) {
  const res = await fetch(`${import.meta.env.VITE_BASE_URL}/share`, {
    method: "POST",
    body: JSON.stringify(data)
  })
  return res.json()
}

export async function getEnv(id: string) {
  const res = await fetch(`${import.meta.env.VITE_BASE_URL}/env/${id}`)
  return res.json()
}