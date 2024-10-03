const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

// Validação de DDDs válidos no Brasil
const validDDD = ["11", "21", "31", "61", "71", "81"]; // Exemplo, adicionar todos os DDDs válidos aqui

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/submit', (req, res) => {
    const { nomeAluno, nascimento, nomeMae, nomePai, ddd, telefone, email, serie, turno, atividades } = req.body;

    // Validação dos campos obrigatórios
    if (!nomeAluno || !nascimento || !nomeMae || !nomePai || !ddd || !telefone || !email) {
        return res.send('Erro: Todos os campos são obrigatórios.');
    }

    // Validação do nascimento
    const regexData = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
    if (!regexData.test(nascimento)) {
        return res.send('Erro: Data de nascimento inválida. Use o formato dd/mm/aaaa.');
    }

    // Validação do e-mail
    const regexEmail = /\S+@\S+\.\S+/;
    if (!regexEmail.test(email)) {
        return res.send('Erro: E-mail inválido.');
    }

    // Validação do DDD
    if (!validDDD.includes(ddd)) {
        return res.send('Erro: DDD inválido.');
    }

    // Validação das atividades extracurriculares (máximo 3)
    if (atividades && atividades.length > 3) {
        return res.send('Erro: Máximo de 3 atividades extracurriculares.');
    }

    // Se tudo estiver válido
    res.send('<h1>Sucesso no cadastro!</h1><p>Obrigado por enviar o formulário.</p>');
});

// Bota o servidor pra rodar
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
