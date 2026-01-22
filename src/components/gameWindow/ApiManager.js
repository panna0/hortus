export async function fetchAnalysis(apiUrl, { timeout = 5000, headers = {} } = {}) {
  const controller = new AbortController();
  const signal = controller.signal;
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const res = await fetch(apiUrl, {
      method: "GET",
      headers: {
        Accept: "application/json",
        ...headers,
      },
      signal,
      credentials: "same-origin", 
    });
    clearTimeout(timeoutId);

    if (!res.ok) {
      throw new Error(`HTTP ${res.status} - ${res.statusText}`);
    }

    const data = await res.json();
    console.log("ecco cosa stampa", data)
    return data;
  } catch (err) {
    clearTimeout(timeoutId);
    console.error("error:", err);
    throw err;
  }
}

export async function getRandomPensiero(apiUrl, opts = {}) {
  const fallback = opts.fallback || "Benvenuto — buona esplorazione!";
  try {
    const data = await fetchAnalysis(apiUrl, opts);
    const arr = data?.analisi_ia?.pensieri_criptici;
    if (Array.isArray(arr) && arr.length > 0) {
      return arr[Math.floor(Math.random() * arr.length)];
    }
    return fallback;
  } catch (err) {

    return fallback;
  }
}