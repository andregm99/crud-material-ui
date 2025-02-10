import { useState } from 'react'
import './App.css'
import { Button, Container, IconButton, TextField, Typography } from '@mui/material'
import List from '@mui/material/List';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import * as React from 'react';

function App() {
  const [client, setClient] = useState([]);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [id, setId] = useState(0);
  const [editId, setEditId] = useState(null); // Estado para controlar o cliente em edição

  // Função para adicionar cliente
  const Adicionar = () => {
    if (!nome || !email) {
      alert('Digite o seu nome e email');
    }else if(!email.includes('@')){
      alert('Digite um e-mail válido')
    } 
    else {
      setId(id + 1);
      setClient(client.concat({ nome, email, id}));
      setNome('');
      setEmail('');
    }
  };

  // Função para remover cliente
  const remover = (id) => {
    var filtered = client.filter((clients) => clients.id !== id);
    setClient(filtered);
  };

  // Função para editar cliente
  const editar = (cliente) => {
    setNome(cliente.nome);
    setEmail(cliente.email);
    setEditId(cliente.id); // Marca que estamos editando este cliente
  };

  // Função para atualizar os dados do cliente editado
  const atualizar = () => {
    if (!nome || !email) {
      alert('Digite o nome e email');
      return;
    }

    const updatedClients = client.map((cl) =>
      cl.id === editId ? { ...cl, nome, email } : cl
    );

    setClient(updatedClients);
    setNome('');
    setEmail('');
    setEditId(null); // Reseta a edição
  };

  return (
    <Container maxWidth="xs" sx={{ marginTop: '50px' }}>
      <Typography variant="h4" gutterBottom>
        Cadastro de Usuário
      </Typography>
      <form>
        <TextField
          label="Nome"
          variant="outlined"
          fullWidth
          margin="normal"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          
        />
        <TextField
          label="E-mail"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ marginTop: '20px' }}
          onClick={editId !== null ? atualizar : Adicionar} // Verifica se estamos editando ou adicionando
        >
          {editId !== null ? 'Atualizar' : 'Cadastrar'}
        </Button>
      </form>

      {client.map((clients) => (
        <List
          sx={{ bgcolor: 'gainsboro', marginTop: '2rem', padding: '1em', borderRadius:'2em' }}
          key={clients.id}
        >
          Nome: {clients.nome} <br /> Email: {clients.email}
          <IconButton onClick={() => editar(clients)}>
            <EditIcon/>
          </IconButton>
          <IconButton onClick={() => remover(clients.id)}>
            <DeleteIcon />
          </IconButton>
        </List>
      ))}
    </Container>
  );
}

export default App;
