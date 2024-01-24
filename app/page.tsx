import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";

export default async function Home() {
  return (
    <main className="max-w-4xl mx-auto mt-4 px-2">
      <div className="text-center my-5 flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Task List For Developers</h1>
        <AddTodo />
      </div>
      <TodoList />
    </main>
  );
}
