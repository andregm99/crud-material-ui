import { useState } from 'react';
import { Button, Container, TextField, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';



function App() {
  const [client, setClient] = useState([]);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [id, setId] = useState(0);
  const [editId, setEditId] = useState(null);

  const validarEmail = (email) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email); // Retorna verdadeiro se o e-mail for válido, falso caso contrário
  };
  // Adicionar cliente
  const Adicionar = () => {
 
    if (!nome || !email) {
      alert('Digite o seu nome e email');
      return;
    } 

    if (!validarEmail(email)) {
      alert('Digite um e-mail válido com domínio');
      return;
    }

    else {
      setId(id + 1);
      setClient(client.concat({nome,email,id}));
      setNome('');
      setEmail('');
    }
  };

  // Remover cliente
  const remover = (id) => {
    setClient(client.filter((clients) => clients.id !== id));
  };

  // Editar cliente
  const editar = (cliente) => {
    setNome(cliente.nome);
    setEmail(cliente.email);
    setEditId(cliente.id);
  };

  // Atualizar cliente editado
  const atualizar = () => {
    if (!nome || !email) {
      alert('Digite o nome e email');
      
    }
    else if (!validarEmail(email)) {
      alert('Digite um e-mail válido com domínio');
      return;
    }
    else{
      setClient(client.map((cl) => (cl.id === editId ? { ...cl, nome, email } : cl)));
      setNome('');
      setEmail('');
      setEditId(null);
    }  
  };

  return (
    <Container maxWidth="md" sx={{ marginTop: '50px' }}>
      <Typography variant="h4" gutterBottom>
        Cadastro de Usuário
      </Typography>
      <form>
        <TextField label="Nome" variant="outlined" fullWidth margin="normal" value={nome} onChange={(e) => setNome(e.target.value)} />
        <TextField label="E-mail" variant="outlined" fullWidth margin="normal" value={email} onChange={(e) => setEmail(e.target.value)} type="email" />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ marginTop: '20px' }}
          onClick={editId !== null ? atualizar : Adicionar}
        >
          {editId !== null ? 'Atualizar' : 'Cadastrar'}
        </Button>
      </form>

      {/* Tabela para exibir os clientes */}
      <TableContainer component={Paper} sx={{ marginTop: '30px' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>ID</strong></TableCell>
              <TableCell><strong>Nome</strong></TableCell>
              <TableCell><strong>Email</strong></TableCell>
              <TableCell><strong>Ações</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {client.map((clients) => (
              <TableRow key={clients.id}>
                <TableCell>{clients.id}</TableCell>
                <TableCell>{clients.nome}</TableCell>
                <TableCell>{clients.email}</TableCell>
                <TableCell>
                  <IconButton onClick={() => editar(clients)} color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => remover(clients.id)} color="error">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default App;
