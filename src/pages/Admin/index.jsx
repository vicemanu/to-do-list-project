import { useState } from 'react'
import './admin.css'

import { auth } from '../../firebase'
import { signOut } from 'firebase/auth'

export default function Admin() {

    const [tarefa, setTarefa] = useState('')

    function handleRegister(e) {
        e.preventDefault()
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
            onChange={e => {e.target.value}}
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