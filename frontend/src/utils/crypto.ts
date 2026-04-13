import { importPrivateKey, importPublicKey } from "./keyUtils"

export async function encryptEnv(env: string, pubKeyPem: string) {
  const pubKey = await importPublicKey(pubKeyPem)

  const aesKey = crypto.getRandomValues(new Uint8Array(32))

  const { ciphertext, nonce } = await encryptAES(env, aesKey)

  const encryptedKey = await crypto.subtle.encrypt(
    { name: "RSA-OAEP" },
    pubKey,
    aesKey
  )

  return {
    env: btoa(String.fromCharCode(...ciphertext)),
    key: btoa(String.fromCharCode(...new Uint8Array(encryptedKey))),
    nonce: btoa(String.fromCharCode(...nonce))
  }
}

export async function decryptEnv(data: { key: string; env: string; nonce: string }, privateKeyPem: string) {
  const privateKey = await importPrivateKey(privateKeyPem)

  const encKey = Uint8Array.from(atob(data.key), c => c.charCodeAt(0))
  const ciphertext = Uint8Array.from(atob(data.env), c => c.charCodeAt(0))
  const nonce = Uint8Array.from(atob(data.nonce), c => c.charCodeAt(0))

  const aesKey = await crypto.subtle.decrypt(
    { name: "RSA-OAEP" },
    privateKey,
    encKey
  )

  const decrypted = await decryptAES(ciphertext, nonce, aesKey)

  return new TextDecoder().decode(decrypted)
}

async function encryptAES(text: string, key: BufferSource) {
  const iv = crypto.getRandomValues(new Uint8Array(12))

  const cryptoKey = await crypto.subtle.importKey(
    "raw",
    key,
    "AES-GCM",
    false,
    ["encrypt"]
  )

  const encrypted = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    cryptoKey,
    new TextEncoder().encode(text)
  )

  return {
    ciphertext: new Uint8Array(encrypted),
    nonce: iv
  }
}

async function decryptAES(ciphertext: BufferSource, nonce: BufferSource, key: BufferSource) {
  const cryptoKey = await crypto.subtle.importKey(
    "raw",
    key,
    "AES-GCM",
    false,
    ["decrypt"]
  )

  return await crypto.subtle.decrypt(
    { name: "AES-GCM", iv: nonce },
    cryptoKey,
    ciphertext
  )
}
