const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

// Validação de DDDs válidos no Brasil
const validDDD = [
    "11", "12", "13", "14", "15", "16", "17", "18", "19", // São Paulo
    "21", "22", "24", // Rio de Janeiro
    "27", "28", // Espírito Santo
    "31", "32", "33", "34", "35", "37", "38", // Minas Gerais
    "41", "42", "43", "44", "45", "46", // Paraná
    "47", "48", "49", // Santa Catarina
    "51", "53", "54", "55", // Rio Grande do Sul
    "61", // Distrito Federal
    "62", "64", // Goiás
    "63", // Tocantins
    "65", "66", // Mato Grosso
    "67", // Mato Grosso do Sul
    "68", // Acre
    "69", // Rondônia
    "71", "73", "74", "75", "77", // Bahia
    "79", // Sergipe
    "81", "82", // Pernambuco e Alagoas
    "83", "84", // Rio Grande do Norte
    "85", "88", // Ceará
    "86", "89", // Piauí
    "87", // Pernambuco (interior)
    "91", "93", "94", // Pará
    "92", "97", // Amazonas
    "95", // Roraima
    "96", // Amapá
    "98", "99"  // Maranhão
];

// Página principal com o formulário
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Manipulação do envio do formulário
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
    let atividadesCount = 0;

    if (atividades) {
        if (Array.isArray(atividades)) {
            atividadesCount = atividades.length;
        } else {
            atividadesCount = 1; // Caso seja apenas uma atividade selecionada, ela será uma string
        }
    }

    if (atividadesCount > 3) {
        return res.send('Erro: Máximo de 3 atividades extracurriculares.');
    }

    // Se tudo estiver válido
    res.send('<h1>Sucesso no cadastro!</h1><p>Obrigado por enviar o formulário.</p>');
});

// Inicia o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
