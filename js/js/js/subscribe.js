// subscribe.js — Saint Beloved

const BREVO_API_KEY = 'YOUR_BREVO_API_KEY_HERE';
const BREVO_LIST_ID = 0;

async function handleSubscribe(formId, noteId) {
  const form = document.getElementById(formId);
  const note = document.getElementById(noteId);
  if (!form || !note) return;

  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    const emailInput = form.querySelector('input[type="email"]');
    const btn = form.querySelector('button[type="submit"]');
    const email = emailInput.value.trim();

    if (!email) return;

    btn.textContent = 'Subscribing...';
    btn.disabled = true;
    note.textContent = '';
    note.className = 'subscribe-note';

    try {
      const response = await fetch('https://api.brevo.com/v3/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'api-key': BREVO_API_KEY,
        },
        body: JSON.stringify({
          email: email,
          listIds: [BREVO_LIST_ID],
          updateEnabled: true,
        }),
      });

      if (response.ok || response.status === 204) {
        note.textContent = 'You\'re in. Essays will find you.';
        note.className = 'subscribe-note success';
        emailInput.value = '';
      } else {
        const data = await response.json();
        if (data.code === 'duplicate_parameter') {
          note.textContent = 'You\'re already subscribed.';
          note.className = 'subscribe-note success';
        } else {
          throw new Error(data.message || 'Something went wrong.');
        }
      }
    } catch (err) {
      console.error('Subscribe error:', err);
      note.textContent = 'Something went wrong. Try again.';
      note.className = 'subscribe-note error';
    } finally {
      btn.textContent = 'Subscribe';
      btn.disabled = false;
    }
  });
}

handleSubscribe('subscribe-form-home', 'subscribe-note-home');
handleSubscribe('subscribe-form-essay', 'subscribe-note-essay');
