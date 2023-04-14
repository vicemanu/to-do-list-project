import { useEffect, useState } from 'react'
import './admin.css'

import { auth, data } from '../../firebase'
import { signOut } from 'firebase/auth'

import { addDoc, collection } from 'firebase/firestore'

export default function Admin() {

    const [tarefa, setTarefa] = useState('')
    const [user, setUser] = useState({})

useEffect(()=> {
    async function loadTarefas() {
        const userDetail = localStorage.getItem("@detailUser")
        setUser(JSON.parse(userDetail))
    }
    loadTarefas()
},[])



    async function handleRegister(e) {
        e.preventDefault()

        if(tarefa === '') {
            alert("Digite sua tarefa...")
            return;
        }

        await addDoc(collection(data,"tarefas"), {
            tarefa: tarefa ,
            created: new Date(),
            userUid: user?.uid
        })
        .then(()=> {
            console.log("TAREFA REGISTRADA")
            setTarefa("")
        })
        .catch((error)=> {
            console.log("ERRO AO REGISTRAR" + error)
        })
    }

    async function headleLogout() {
        await signOut(auth);
    }

    return(
    <div className='admin'>
        <h1>Minhas Tarefas</h1>

        <form className='home__form-home' onSubmit={handleRegister}>
            <textarea placeholder='Digite sua tarefa...'
            value={tarefa}
            onChange={e => {setTarefa(e.target.value)}}
            />

            <button className='btn-register' type='submit'> Registrar tarefa</button>
        </form>

        <article className='list'>
            <p>Estudar Javascript</p>

            <div>
                <button>Editar</button>
                <button className='btn-delete'>Concluir</button>
            </div>
        </article>

        <button className='btn-logout' onClick={headleLogout}>Sair</button>
    </div>
    )
}