import TodoList from "../TodoList";

const Pendientes = () => {
  return (
    <TodoList
      storageKey="todo-pendientes"
      title="Pendientes"
      showHeader={false}
    />
  );
};

export default Pendientes;
