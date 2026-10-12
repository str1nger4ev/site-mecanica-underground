document.getElementById('recrutamentoForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const btnEnviar = document.getElementById('btnEnviar');
    const statusDiv = document.getElementById('mensagemStatus');

    // Pegando os valores dos inputs
    const nome = document.getElementById('nome').value;
    const passaporte = document.getElementById('passaporte').value;
    const discordId = document.getElementById('discordId').value;
    const horarioRecrutamento = document.getElementById('horarioRecrutamento').value;
    const disponibilidade = document.getElementById('disponibilidade').value;
    const jaTrabalhou = document.getElementById('jaTrabalhou').value;

    // Webhook configurado
    const webhookURL = 'https://discord.com/api/webhooks/1559303477354700810/d041qfAmVFCZrrslpWsrmw76LcYU-XR6UHVrC7q71Mw9WeTN_d2ojy581ngSWHtujTpn';

    // Formatando a mensagem em Embed do Discord
    const payload = {
        embeds: [{
            title: "🚗 Nova Inscrição - Recrutamento Mecânica",
            color: 15844367, // Cor amarela/laranja
            fields: [
                { name: "Nome Completo (In-game)", value: nome, inline: true },
                { name: "Passaporte (In-game)", value: passaporte, inline: true },
                { name: "ID Discord", value: discordId, inline: true },
                { name: "Horário p/ Recrutamento", value: horarioRecrutamento, inline: false },
                { name: "Disponibilidade (Dias/Horários)", value: disponibilidade, inline: false },
                { name: "Já trabalhou como mecânico?", value: jaTrabalhou, inline: true }
            ],
            footer: {
                text: "Mecânica RP - Sistema de Recrutamento"
            },
            timestamp: new Date().toISOString()
        }]
    };

    btnEnviar.disabled = true;
    btnEnviar.textContent = 'Enviando Inscrição...';

    fetch(webhookURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    .then(response => {
        if (response.ok) {
            statusDiv.textContent = '✅ Sua inscrição foi enviada com sucesso! Aguarde o contato no Discord.';
            statusDiv.className = 'hidden sucesso';
            statusDiv.style.display = 'block';
            document.getElementById('recrutamentoForm').reset();
        } else {
            throw new Error('Erro na resposta do servidor.');
        }
    })
    .catch(error => {
        console.error(error);
        statusDiv.textContent = '❌ Ocorreu um erro ao enviar sua inscrição. Tente novamente mais tarde.';
        statusDiv.className = 'hidden erro';
        statusDiv.style.display = 'block';
    })
    .finally(() => {
        btnEnviar.disabled = false;
        btnEnviar.textContent = 'Enviar Inscrição';
    });
});