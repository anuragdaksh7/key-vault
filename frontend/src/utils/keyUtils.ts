export async function importPublicKey(pem: string) {
  const binary = pemToArrayBuffer(pem)

  return crypto.subtle.importKey(
    "spki",
    binary,
    { name: "RSA-OAEP", hash: "SHA-256" },
    true,
    ["encrypt"]
  )
}

export async function importPrivateKey(pem: string) {
  const binary = pemToArrayBuffer(pem)

  return crypto.subtle.importKey(
    "pkcs8",
    binary,
    { name: "RSA-OAEP", hash: "SHA-256" },
    true,
    ["decrypt"]
  )
}

function pemToArrayBuffer(pem: string) {
  const b64 = pem.replace(/-----(BEGIN|END)[^]+?-----/g, "").replace(/\s/g, "")
  const binary = atob(b64)
  return Uint8Array.from(binary, c => c.charCodeAt(0))
}