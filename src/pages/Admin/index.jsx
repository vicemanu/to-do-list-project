import { useEffect, useState } from 'react'
import './admin.css'

import { auth, data } from '../../firebase'
import { signOut } from 'firebase/auth'

import { addDoc, collection, onSnapshot, query, orderBy, where, doc, deleteDoc, updateDoc } from 'firebase/firestore'

export default function Admin() {

    const [tarefa, setTarefa] = useState('');
    const [user, setUser] = useState({});
    const [listaTarefas, setListaTarefas] = useState([]);
    const [edit, setEdit] = useState([]);

useEffect(()=> {
    async function loadTarefas() {
        const userDetail = localStorage.getItem("@detailUser")
        setUser(JSON.parse(userDetail))

        if(userDetail) {
            const dados = JSON.parse(userDetail)

            const tarefaRef = collection(data, "tarefas")
            const q = query(tarefaRef, orderBy("created", "desc"), where("userUid", "==", dados?.uid))
            const unsub = onSnapshot(q, (snapshot)=> {
                    let lista = [];

                    snapshot.forEach((doc)=> {
                        lista.push ({
                            id: doc.id,
                            tarefa: doc.data().tarefa,
                            userUid: doc.data().userUid
                        })
                    })
                    setListaTarefas(lista);
            })
        }



    }
    loadTarefas()
},[])



    async function handleRegister(e) {
        e.preventDefault()

        if(tarefa === '') {
            alert("Digite sua tarefa...")
            return;
        }


        if(edit?.id) {
            handleUpdateTarefa();
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

    async function deleteTarefa(id) {
        const docRef = doc(data, "tarefas", id)
        await deleteDoc(docRef)
    }

    function editTarefa(item) {
        setTarefa(item.tarefa);
        setEdit(item);
    }


    async function handleUpdateTarefa() {
        const docRef = doc(data, "tarefas", edit?.id)
        await updateDoc(docRef, {
            tarefa: tarefa
        })
        .then(()=> {
            console.log("tarefa atualizada")
            setTarefa('')
            setEdit({})
        })
        .catch(()=> {
            console.log("erro ao atualizar")
            setTarefa('')
            setEdit({})
        })
    }

    return(
    <div className='admin'>
        <h1>Minhas Tarefas</h1>

        <form className='home__form-home' onSubmit={handleRegister}>
            <textarea placeholder='Digite sua tarefa...'
            value={tarefa}
            onChange={e => {setTarefa(e.target.value)}}
            />
                {Object.keys(edit).length > 0 ? (
                    <button className='btn-register' style={{backgroundColor: '#5ab134'}} type='submit'> Atualizar tarefas</button>
                ):(
                    <button className='btn-register' type='submit'> Registrar tarefa</button>
                ) }
            
        </form>

        {listaTarefas.map((item)=> {
            return(
            <article key={item.id} className='list'>
                <p>{item.tarefa}</p>
                <div>
                    <button onClick={()=> editTarefa(item)}>Editar</button>
                    <button onClick={()=> deleteTarefa(item.id)} className='btn-delete'>Concluir</button>
                </div>
            </article>
            )
        })}

       

        <button className='btn-logout' onClick={headleLogout}>Sair</button>
    </div>
    )
}