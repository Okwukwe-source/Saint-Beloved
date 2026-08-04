 // subscribe.js — Saint Beloved
// Handles email subscription via MailerLite API.

const MAILERLITE_API_KEY = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0IiwianRpIjoiYTdmYWY3ZjVkN2E4MTU5Nzg4ODUxM2U1ZjU2OTY2ZWM2YzdmMmM3MzhmYjIzZWRlZmEzN2NiN2JkYTU4MGM5NTM4YTY3ZmI2MTg2MThhZDQiLCJpYXQiOjE3ODU4MDQ0MjkuNzk4MTAzLCJuYmYiOjE3ODU4MDQ0MjkuNzk4MTA1LCJleHAiOjQ5NDE0NzgwMjkuNzkwNjg2LCJzdWIiOiIyNTcyMjg3Iiwic2NvcGVzIjpbXX0.IKekrrYlrtfNK0QjVgoLnM5sHXVknnprd3qlPBZeiTsk5I3sWrmCQUH0lCH5i-0Q1gD_FyQKOFL_0AXimvhJyYlQCyw9Hkn0udOtUk-ylYTGcNbfFClsB4hAjbgqkc3cE2ERkeTcAgEYWdJVDg5k4Ogknrwtpgo7T6Wvhp8LMaOumBPRSDt5yyWBGkagRMTigSm4j16tsfzZ2-weFT7lTx5zeAVuiP_rDiEESe2O2iWxkH6E-T3npCaV9ZYaIJSTLFPJzkwOumGRj7v10aJxsFIPuCAkLvk_jjOVupWUG3hyKO_oHSlLzn0bbPcVRmMu48GjjdQpW49qR6pdi7Uqc3CjA9oPvPhdCAAVq2wHgP2YhHF77fZofR7ojvtDgkJhkYfmeH9y1xberr7MTxaBc7fjFGNSO5_SSRwjx41Y_HM97SebncddK2JhNI2HDMtwJogjZtLi0R_1ns4PnIkenanCVkqcx0nrKvntMGdoJ-yHobIRi3tE0oJGA6eUvhjRMeJe8DayMrEYJ8-KUEt_YP3upQvlG2xzPmdYCmP3vw52NXJUJO7ccena_9L9-U-1tVXAoddMQ2NfktMVnRx605oRXnIsdFLIVEcmaZpHb19YUMRPrwZu2Q_ID-2oTSJLFyYb9u6rRQm-qU3cjQWogtOJturuZp97xJVQjxeKyCM';
const MAILERLITE_GROUP_ID = '194830162056971369';

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
      const response = await fetch('https://connect.mailerlite.com/api/subscribers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${MAILERLITE_API_KEY}`,
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          groups: [MAILERLITE_GROUP_ID],
        }),
      });

      const data = await response.json();

      if (response.ok || response.status === 201 || response.status === 200) {
        note.textContent = "You're in. Essays will find you.";
        note.className = 'subscribe-note success';
        emailInput.value = '';
      } else {
        throw new Error(data.message || 'Something went wrong.');
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
