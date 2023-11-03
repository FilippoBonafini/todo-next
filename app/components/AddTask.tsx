'use client'
import { AiOutlinePlusCircle } from 'react-icons/ai'
import Modal from './Modal';

import { FormEventHandler, useState } from 'react';
import { addTodo } from '@/api';
import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';

const AddTask = () => {
    const router = useRouter();
    const [modalOpen, setModalOpen] = useState<boolean>(false)
    const [newTaskValue, setNewTaskValue] = useState<string>('');
    const handleSubmitNewTodo: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        await addTodo({
            id: uuidv4(),
            text: newTaskValue,
        });
        setNewTaskValue('');
        setModalOpen(false)
        router.refresh();
    }

    return (
        <div>
            <button className="btn btn-primary w-full" onClick={() => setModalOpen(true)}>
                <span className='text-lg'>
                    Crea Task
                </span>
                <AiOutlinePlusCircle className="ml-1" size={20} />
            </button>
            <Modal modalOpen={modalOpen} setModalOpen={setModalOpen} >
                <form onSubmit={handleSubmitNewTodo}>
                    <h3 className='font-bold text-lg'>Aggiungi</h3>
                    <div className='modal-action'>
                        <input
                            value={newTaskValue}
                            onChange={(e) => setNewTaskValue(e.target.value)}
                            type="text"
                            className="input input-bordered w-full max-w-full" />
                        <button
                            type='submit'
                            className='btn'>
                            Aggiungi
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    )
}

export default AddTask;