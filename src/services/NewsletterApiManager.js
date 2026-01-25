// NewsletterApiManager.js
const API_URL = 'https://tua-api-newsletter.com/v1/subscribe'; // Sostituisci con il tuo endpoint

export const subscribeToNewsletter = async (userData) => {
  const payload = {
    email: userData.email,
    attributes: {
      FIRSTNAME: userData.firstName,
      LASTNAME: userData.lastName
    },
    listIds: [7],
    updateEnabled: true
  };

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) throw new Error('Errore iscrizione');
  return await response.json();
};