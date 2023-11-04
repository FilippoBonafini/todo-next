import { ITask } from "@/types/tasks"
import Task from "./Task"

interface TodoListProps {
    incompleteTasks: ITask[],
    completeTasks: ITask[],
}


const TodoList: React.FC<TodoListProps> = ({ incompleteTasks, completeTasks }) => {
    return (
        <div className="overflow-x-auto">

            {completeTasks.length <= 0 && incompleteTasks.length <= 0 && (
                <h2 className="text-xl font-bold mt-8 mb-4 text-center">Nessun Task.</h2>
            )}

            <table className="table">
                <tbody>
                    {incompleteTasks.map((task) => (
                        <Task key={task.id} task={task} />
                    ))}
                </tbody>
            </table>

            {completeTasks.length > 0 && (
                <h2 className="text-xl font-bold mt-8 mb-4 text-center">Completati</h2>
            )}


            <table className="table">
                <tbody>
                    {completeTasks.map((task) => (
                        <Task key={task.id} task={task} />
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default TodoList