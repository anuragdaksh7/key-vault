import { useState } from "react"
import { encryptEnv } from "../utils/crypto"
import { shareEnv } from "../api/envApi"

export default function Share() {
  const [env, setEnv] = useState("");
  const [pubKey, setPubKey] = useState("");
  const [link, setLink] = useState("");
  const [loading, setLoading] = useState(false);

  const handleShare = async () => {
    setLoading(true);
    const encrypted = await encryptEnv(env, pubKey);
    const res = await shareEnv(encrypted);
    setLink(`${window.location.protocol}//${window.location.host}/view/${res.id}`);
    setLoading(false);
  };

  return (
    <>
      <h1>Share .env Securely</h1>
      <label htmlFor="env">Paste .env</label>
      <textarea
        id="env"
        rows={8}
        value={env}
        onChange={e => setEnv(e.target.value)}
        placeholder="Paste your .env file here..."
      />
      <label htmlFor="pubkey">Receiver Public Key</label>
      <textarea
        id="pubkey"
        rows={4}
        value={pubKey}
        onChange={e => setPubKey(e.target.value)}
        placeholder="Paste receiver's public key..."
      />
      <button onClick={handleShare} disabled={loading || !env || !pubKey}>
        {loading ? "Sharing..." : "Share"}
      </button>
      {link && (
        <div style={{marginTop: 18}}>
          <h3>Share Link</h3>
          <pre>{link}</pre>
        </div>
      )}
    </>
  );
}