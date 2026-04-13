import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getEnv } from "../api/envApi"
import { decryptEnv } from "../utils/crypto"

export default function View() {
  const { id } = useParams();
  const [privateKey, setPrivateKey] = useState("");
  const [data, setData] = useState<any>(null);
  const [env, setEnv] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (id) getEnv(id).then(setData);
  }, [id]);

  const handleDecrypt = async () => {
    setLoading(true);
    setError("");
    try {
      if (data) {
        const result = await decryptEnv(data, privateKey);
        setEnv(result);
      }
    } catch (e) {
      setError("Failed to decrypt. Check your private key.");
    }
    setLoading(false);
  };

  return (
    <>
      <h1>Decrypt .env</h1>
      <label htmlFor="privkey">Paste Private Key</label>
      <textarea
        id="privkey"
        rows={4}
        value={privateKey}
        onChange={e => setPrivateKey(e.target.value)}
        placeholder="Paste your private key..."
      />
      <button onClick={handleDecrypt} disabled={loading || !privateKey || !data}>
        {loading ? "Decrypting..." : "Decrypt"}
      </button>
      {error && <div style={{color: '#b94a48', marginTop: 8}}>{error}</div>}
      {env && (
        <div style={{marginTop: 18}}>
          <h3>ENV Output</h3>
          <pre>{env}</pre>
        </div>
      )}
    </>
  );
}