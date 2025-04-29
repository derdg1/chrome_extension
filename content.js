async function summarizeWithAI(text) {
  try {
    // API-Schlüssel aus dem Storage laden
    const result = await chrome.storage.sync.get(['apiKey']);
    const apiKey = result.apiKey;
    
    if (!apiKey) {
      return "Bitte füge deinen API-Schlüssel in den Einstellungen der Extension ein.";
    }
    
    const response = await fetch("https://api.openai.com/v1/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo-instruct",
        prompt: `Fasse den folgenden Text kurz und prägnant zusammen:\n\n${text}`,
        max_tokens: 150
      })
    });
    
    const data = await response.json();
    if (data.choices && data.choices.length > 0) {
      return data.choices[0].text.trim();
    } else {
      throw new Error("Keine Antwort erhalten");
    }
  } catch (error) {
    console.error("Fehler bei der KI-Anfrage:", error);
    return "Fehler bei der Zusammenfassung: " + error.message;
  }
}