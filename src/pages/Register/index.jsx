
import { useState } from 'react'
import '../Home/home.css'
import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../../firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'


export default function Register() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')


  const navigate = useNavigate();

   async function handleRegister(e) {
      e.preventDefault();

      if(email !== '' && password !== '') {
        await createUserWithEmailAndPassword(auth, email, password)
        .then(()=> {
          navigate('/admin', {replace: true})
        })
        .catch(()=>{
          console.log("ERRO AO CADASTRAR")
        })

      }else {
        alert("Preencha todos os campos! ")
      }
    }



    return (

      <div className='home'>
        <h1>Cadastre-se</h1>
        <span>Vamos criar sua conta!</span>

        <form className='home__form-home'
        onSubmit={handleRegister}
        >
          <input type="text" placeholder='Digite seu email...'
          value={email}
          onChange={e => setEmail(e.target.value)}/>

          <input type="password"
          placeholder='*******'
          value={password}
          onChange={e => setPassword(e.target.value)}/>

          <button type='submit'>Registrar</button>
        </form>

        <Link to="/">
          Já possui uma conta? faça login!
        </Link>
      </div>
    )
  }

