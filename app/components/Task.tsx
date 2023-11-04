'use client'
import { ITask } from "@/types/tasks";
import { FaRegEdit, FaRegTrashAlt } from 'react-icons/fa';
import Modal from "./Modal";
import { FormEventHandler, useState } from "react";
import { useRouter } from "next/navigation";
import { deleteTodo, editTodo } from "@/api";

interface TaskProps {
    task: ITask;
}

const Task: React.FC<TaskProps> = ({ task }) => {
    const router = useRouter();
    const [openModalEdit, setOpenModalEdit] = useState(false);
    const [openModalDelete, setOpenModalDelete] = useState(false);
    const [taskToEdit, setTaskToEdit] = useState<any>(task.text);
    const [completed, setCompleted] = useState(task.data.complete);

    const handleToggleTodo = async () => {
        const updatedTask = {
            id: task.id,
            text: task.text,
            data: {
                created: task.data.created,
                complete: !completed,
                expiration: task.data.expiration,
                description: task.data.description,
            },
        };

        await editTodo(updatedTask);
        setCompleted(!completed);
        router.refresh();
    };

    const handleSubmitEditTodo: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        const updatedTask = {
            id: task.id,
            text: taskToEdit,
            data: {
                created: task.data.created,
                complete: completed,
                expiration: task.data.expiration,
                description: task.data.description,
            },
        };

        await editTodo(updatedTask);
        setOpenModalEdit(false);
        router.refresh();
    };

    const handleSubmitDeleteTodo: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        await deleteTodo(task.id);
        setOpenModalDelete(false);
        router.refresh();
    };

    return (
        <tr key={task.id}>
            <td>
                <input
                    className="checkbox"
                    type="checkbox"
                    checked={completed}
                    onChange={handleToggleTodo}
                />
            </td>
            <td className="w-full text-xl">
                <span className={completed ? `line-through text-zinc-600` : ``}>{task.text}</span>
            </td>
            <td className="flex gap-5">
                <FaRegEdit
                    onClick={() => setOpenModalEdit(true)}
                    cursor="pointer"
                    className="text-blue-500"
                    size={26}
                />
                <Modal modalOpen={openModalEdit} setModalOpen={setOpenModalEdit}>
                    <form onSubmit={handleSubmitEditTodo}>
                        <h3 className="font-bold text-lg">Modifica</h3>
                        <div className="modal-action">
                            <input
                                required
                                value={taskToEdit}
                                onChange={(e) => setTaskToEdit(e.target.value)}
                                type="text"
                                className="input input-bordered w-full max-w-full"
                            />
                            <button type="submit" className="btn">
                                Salva
                            </button>
                        </div>
                    </form>
                </Modal>
                <FaRegTrashAlt
                    onClick={() => setOpenModalDelete(true)}
                    cursor="pointer"
                    className="text-red-500"
                    size={26}
                />
                <Modal modalOpen={openModalDelete} setModalOpen={setOpenModalDelete}>
                    <form onSubmit={handleSubmitDeleteTodo}>
                        <h3 className="font-bold text-lg">Elimina</h3>
                        <div className="modal-action">
                            <span className="w-full max-w-full text-lg">
                                Confermi la cancellazione?
                            </span>
                            <button type="submit" className="btn">
                                Si
                            </button>
                            <div onClick={() => setOpenModalDelete(false)} className="btn">
                                No
                            </div>
                        </div>
                    </form>
                </Modal>
            </td>
        </tr>
    );
};

export default Task;
