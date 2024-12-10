// let ESMetaDebugger: any;
(async () => {
  const module = await import('./esmeta-worker-opt/main.mjs');
  // ESMetaDebugger = module.ESMetaDebugger;
})();

self.onmessage = async function (e) { // Waiting for reception from the main thread
  const receivedData = e.data;

  console.log('ESMetaDebugger', ESMetaDebugger);
  fetch('/dump/Spec.json').then((response) => { console.log(response) })

  // useDebugger().then((d : any) => {
    const processedData = () => (receivedData * 100).toString() + ''.toString();
    postMessage(processedData());
  // });
};