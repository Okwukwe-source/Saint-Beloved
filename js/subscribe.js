 // subscribe.js — Saint Beloved
// Handles email subscription via MailerLite API.

const MAILERLITE_API_KEY = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0IiwianRpIjoiNTBmYThkMTk2ZDE1MjYxMjQzODA5N2JhNGVjNWY1NjhhMzdiMDVkNmQyNWQ2YmUwZjIzZTRmZjI2M2QxYWQ2YWFiOTBkNDExY2NkZmJjMmQiLCJpYXQiOjE3ODU4Nzg3NzcuMzY1MDA2LCJuYmYiOjE3ODU4Nzg3NzcuMzY1MDA4LCJleHAiOjQ5NDE1NTIzNzcuMzU4NzUsInN1YiI6IjI1NzQ0NzQiLCJzY29wZXMiOltdfQ.DSCEn3G_EQeNTEpAtrVkj0Hgkt9sImAB0wof_Fgh_5mqGr_PUwKF4_G5R0bP_akoowKmD-EBeK-UxCcbn5JoCJByy7qcHSl4exe_dlbiSBTlpHsugJbfkLdOJuXmG6EWSO14GKlCh9IIiEqRpId91bsLRdQXlRS3c1r2zXSlnj_bt41Az_mN99h2hOW3iNx1kMMg8lIllICXdivqAI7E3OgePF-56q0W8emxc6pA2ibJz0qsx6i22a_WethYlPHqJiTAqb0QqfhqiOkvIDBjSpiCDcEaU-9YexoEOqFNgaX-AOXagbcvj-iAuwx3bnwhWKeNrlh1UpyuTF7lZ--9kgKNomWkFCFV-kuHLteCV1sFvQFTg7hZSkcd5IpbQlr7tYsY6vmivC-w_gCUS2TzICk7vXPXIILYy3_PV0XT1WvafNaHWJI8xevTqRyRfIHwDBJ9G0RW8B6DagOS9K7rgnoxMcKDD5J-2tjZ4PNjkPo3tIHKulpx26Rmmn9PRXokYk-Irx55zVSSFlmSgHiTFl65U_WRi8NvfH761q20bx7CQnPzX2a__fiuyHuj7LQzPGOECffOCL4bA3GST8ZOjs0_K4UAy-QhNl6xLnsVrMCJdeRJQbCpYManvLfsDq6PXhTzTw1UnBGzznvXaGPlZ7CIr4bUJRGShM1gBoqCyOw';
const MAILERLITE_GROUP_ID = '194908230902613974';

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
