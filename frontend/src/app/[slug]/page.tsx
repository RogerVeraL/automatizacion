import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import TodoList from "../../components/TodoList";

type PageProps = {
  params: { slug: string };
};

export default function DynamicPage({ params }: PageProps) {
  const { slug } = params;
  const title = slug.startsWith("pendiente")
    ? "Pendientes"
    : slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 bg-white p-8 min-h-screen">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-black mb-6">{title}</h1>
            {slug.startsWith("pendiente") ? (
              <TodoList
                storageKey={`todo-${slug}`}
                title={title}
                showHeader={false}
              />
            ) : (
              <p className="text-gray-600">
                Contenido de &quot;{title}&quot; en construcción.
              </p>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
