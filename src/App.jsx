import { useState } from 'react';
import { Button, Container, TextField, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useEffect } from 'react';




function App() {
const [client, setClient]=useState([])
const [name,setName]=useState('')
const [email,setEmail]=useState('')
const [id,setId]=useState(0)
const [editId,setEditId]=useState(null)
const [darkMode,setDarkmode]=useState(false)

useEffect(()=>{
  document.body.style.backgroundColor= darkMode?'#333':'#fff'
  document.body.style.color= darkMode? '#fff': '#333'
},[darkMode])

const adicionar = (e) =>{
  e.preventDefault()/*Coloquei o preventDefault para impedir o comportamento padrão do formulário
  de recarregar a página.*/
    setId(id + 1)
    setClient(client.concat({id,name,email}))
    setName('')
    setEmail('')
}

const remover = (id) =>{
  setClient(client.filter((clients)=>clients.id !== id))
}

const editar = (client) =>{
  setName(client.name)
  setEmail(client.email)
  setEditId(client.id)//Aqui estamos pegando o id do usuário que queremos editar.
}

const atualizar =(e)=>{
  e.preventDefault()//impedindo o funcionamento padrão do formulário
    setClient(client.map((cl)=>(cl.id === editId? {...cl,name,email}: cl)))
    setName('')
    setEmail('')
    setEditId(null)
}
return(
 <Container maxWidth='md' sx={{marginTop:'50px'}}>
    <Button variant='contained' color='primary' onClick={()=>setDarkmode(!darkMode)} >
      {darkMode===false?'Dark mode':'Clear mode '}
    </Button>
    <Typography variant='h4' gutterBottom>
      Cadastro de usuários
    </Typography>
    <form onSubmit={editId===null?adicionar:atualizar} >{/* se não tiver nada para atualizar então adicione */}
      <TextField label="Nome" required fullWidth variant='outlined' margin='normal' value={name} onChange={(e)=>setName(e.target.value)}
      />
      <TextField label="E-mail" type='email' margin='normal' required fullWidth variant='outlined' value={email} onChange={(e)=>setEmail(e.target.value)}
      />
      <Button type='submit' variant='contained' color='primary' sx={{marginTop:'20px'}} fullWidth>
        {editId===null?'Adicionar':'Atualizar'}
      </Button>
    </form>
    <TableContainer component={Paper}>
        <Table  aria-label="simple table">
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
                <TableCell>{clients.name}</TableCell>
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
)
}

export default App;