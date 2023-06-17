const express = require('express');
const app = express();
const path = require('path');
const port = 8081;
const connection = require('./database/database');
const Pergunta = require('./database/Pergunta');
const Resposta = require('./database/Resposta');

// database
connection
	.authenticate()
	.then(() => console.log('Banco de dados conectado.'))
	.catch(err => console.log(err));

//
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// rotas
app.get('/', (req, res) => {
	Pergunta.findAll({ raw: true, order: [['id', 'DESC']] }).then(perguntas => {
		res.render('index', { perguntas: perguntas });
	});
});

app.get('/perguntar', (req, res) => res.render('perguntar'));

app.post('/salvarpergunta/', (req, res) => {
	const titulo = req.body.titulo;
	const descricao = req.body.descricao;
	Pergunta.create({ titulo: titulo, descricao: descricao })
		.then(() => res.redirect('/'))
		.catch(err => res.send('erro: ' + err));
});

app.get('/pergunta/:id', (req, res) => {
	const id = req.params.id;
	Pergunta.findOne({
		where: { id: id },
		raw: true,
	}).then(pergunta => {
		Resposta.findAll({
			where: { perguntaId: id },
			raw: true,
			order: [['id', 'DESC']],
		}).then(respostas => {
			if (pergunta != undefined)
				res.render('pergunta', { pergunta: pergunta, respostas: respostas });
			else res.redirect('/');
		});
	});
});

app.post('/salvarresposta', (req, res) => {
	const corpo = req.body.resposta;
	const id = req.body.id;
	Resposta.create({ corpo: corpo, perguntaId: id })
		.then(() => {
			res.redirect('/pergunta/' + id);
		})
		.catch(err => res.send('erro: ' + err));
});

//
app.listen(port, () => console.log('Servidor rodando!'));
