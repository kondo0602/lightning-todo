import { v4 as uuidv4 } from 'uuid';
import { useSyncLocalStorage } from "./hooks/use-sync-local-storage";

export type Todo = {
	id: string;
	task: string;
	note: string;
	completed: boolean;
  completedAt: Date | null;
};

export const useTodoList = () => {

  // 初期化時にcompletedAtが過去日のデータを削除する
  const onInitialize = () => {
    const now = new Date();
    const pastTodos = todos.filter((todo) => todo.completedAt && todo.completedAt < now);
    setTodos(todos.filter((todo) => !pastTodos.includes(todo)));
  };

	const { storedValue: todos, setStoredValue: setTodos } = useSyncLocalStorage(
		"todos",
		[] as Todo[],
    onInitialize,
	);

  const addTodo = (task: string, note: string) => {
    const newTodos = [
      {
        id: uuidv4(),
        task,
        note,
        completed: false,
        completedAt: null,
      },
      ...todos,
    ];
    setTodos(newTodos);
  };

  const unCompleteTodo = (id: string) => {
    setTodos(todos.map((todo) => todo.id === id ? { ...todo, completed: false } : todo));
  };

  const completeTodo = (id: string) => {
    setTodos(todos.map((todo) => todo.id === id ? { ...todo, completed: true } : todo));
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const activeTodos = todos.filter((todo) => !todo.completed);
  const completedTodos = todos.filter((todo) => todo.completed);

  const handleSaveEdit = (id: string, text: string, note: string) => {
    setTodos(todos.map((todo) => todo.id === id ? { ...todo, text: text, note: note } : todo));
  };

  return {
    addTodo,
    unCompleteTodo,
    completeTodo,
    deleteTodo,
    activeTodos,
    completedTodos,
    handleSaveEdit,
  };
};
