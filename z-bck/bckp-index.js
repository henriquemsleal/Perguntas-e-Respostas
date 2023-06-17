const express = require('express');
const app = express();
const path = require('path');
const port = 8081;

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => res.send('index'));

app.get('/:nome/:lang', (req, res) => {
	const nome = req.params.nome;
	const lang = req.params.lang;
	const msg = false;
	const produtos = [
		{ nome: 'Café', preco: 8 },
		{ nome: 'Leite', preco: 6 },
		{ nome: 'Chocolate', preco: 10 },
		{ nome: 'Vinho', preco: 40 },
		{ nome: 'Queijo', preco: 30 },
		{ nome: 'Salame', preco: 45 },
	];
	res.render('index', { nome: nome, lang: lang, msg: msg, produtos: produtos });
});

app.listen(port, () => console.log('Servidor rodando!'));
