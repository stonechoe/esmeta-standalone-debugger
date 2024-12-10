import { useEffect, useState } from "react"

export default function WorkerTest() {
  const [worker] = useState(new Worker(new URL("./apiWorker.ts", import.meta.url)));

  useEffect(() => {
    worker.onmessage = (e) => {
      alert(e.data);
      console.log(e.data);
    }
   }, []);

  return <button onClick={
    () => worker.postMessage({ type: "test" })
  }>
    worker test
  </button>
}