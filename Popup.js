document.addEventListener('DOMContentLoaded', function() {
    const apiKeyInput = document.getElementById('api-key');
    const saveButton = document.getElementById('save-api-key');
    const statusElement = document.getElementById('status');
    
    // Gespeicherten API-Schlüssel laden
    chrome.storage.sync.get(['apiKey'], function(result) {
      if (result.apiKey) {
        apiKeyInput.value = result.apiKey;
      }
    });
    
    // API-Schlüssel speichern
    saveButton.addEventListener('click', function() {
      const apiKey = apiKeyInput.value.trim();
      
      if (apiKey) {
        chrome.storage.sync.set({apiKey: apiKey}, function() {
          statusElement.textContent = 'API-Schlüssel gespeichert!';
          statusElement.style.color = 'green';
          
          setTimeout(() => {
            statusElement.textContent = '';
          }, 2000);
        });
      } else {
        statusElement.textContent = 'Bitte gib einen API-Schlüssel ein!';
        statusElement.style.color = 'red';
      }
    });
  });