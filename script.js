const form = document.getElementById('form-rsvp');
const button = document.getElementById('submit-button');
const statusMessage = document.getElementById('form-status');

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwnwF_Vb8ns2osy1qlJ8mAOQ2BtXReWlAWeR-CX6k_7tHqRzeZMTzIsH_Hmrmz-yv0E/exec";

form.addEventListener('submit', function(e) {
  e.preventDefault();

  button.disabled = true;
  button.textContent = 'Enviando...';
  statusMessage.textContent = '';

  const formData = new FormData(form);

  fetch(SCRIPT_URL, {
    method: 'POST',
    body: formData
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Erro de rede: ${response.statusText}`);
      }
      return response.json();
    })
    .then(data => {
      if (data.result === 'success') {
        const nome = document.getElementById('nome').value;
        const presenca = document.getElementById('presenca').value;

        if (presenca === 'sim') {
          alert('UHUL, ' + nome + '! 🤩\n\nSua presença foi confirmada!\nNos vemos na festa! 💖');
          statusMessage.textContent = 'Confirmação enviada! Obrigado!';
        } else if (presenca === 'nao') {
          alert('Que pena, ' + nome + '. 😢\n\nSentiremos sua falta na festa!\nEspero te ver em outra ocasião! 💖');
          statusMessage.textContent = 'Resposta enviada! Obrigado!';
        }

        statusMessage.style.color = 'green';
        form.reset();
      } else {
        throw new Error(data.message || 'Erro desconhecido do script');
      }
    })
    .catch(error => {
      statusMessage.textContent = 'Oops! Algo deu errado: veja a consola (F12) para detalhes.';
      statusMessage.style.color = 'red';
      console.error("Erro no fetch:", error);
    })
    .finally(() => {
      button.disabled = false;
      button.textContent = 'Enviar Confirmação!';
    });
});
