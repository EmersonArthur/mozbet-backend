const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

let usuarios = {
  "123": { saldo: 1000 }
};

app.post("/apostar", (req, res) => {
  const { userId, valor } = req.body;
  if (!usuarios[userId]) {
    return res.status(404).json({ mensagem: "Usuário não encontrado" });
  }

  if (usuarios[userId].saldo < valor) {
    return res.status(400).json({ mensagem: "Saldo insuficiente" });
  }

  // Simula vitória ou derrota
  const ganhou = Math.random() > 0.5;
  const retorno = ganhou ? valor * 2 : 0;
  usuarios[userId].saldo = usuarios[userId].saldo - valor + retorno;

  res.json({
    mensagem: ganhou
      ? `Você ganhou! Novo saldo: ${usuarios[userId].saldo}`
      : `Você perdeu! Novo saldo: ${usuarios[userId].saldo}`
  });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
