import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useGetTodos } from '@/hooks/useTodos';
import { CheckCircle, List } from 'lucide-react';
import { useNavigate } from 'react-router';
import { TODO } from '@/routes/routes.json';

export default function Home() {
  const { todoList } = useGetTodos(true);
  const navigate = useNavigate();
  const totalTodos = todoList?.data?.length || 0;
  const completedTodos = todoList?.data?.filter((t) => t.done).length || 0;

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-sky-400 to-indigo-500 text-white p-12 md:p-24 rounded-b-3xl">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h1 className="text-4xl md:text-6xl font-extrabold">
            Organize Your Tasks <br /> Effortlessly
          </h1>
          <p className="text-lg md:text-2xl text-white/80">
            Keep track of everything you need to do, stay focused, and get
            things done.
          </p>
          <div className="flex justify-center gap-4">
            <Button
              size="lg"
              className="bg-white text-sky-600 hover:bg-white/90 cursor-pointer"
              onClick={() => navigate(`${TODO.route}`)}
            >
              Get Started
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-black dark:text-white hover:bg-white/10 cursor-pointer"
              onClick={() =>
                window.open(`${import.meta.env.VITE_BACKEND_URL}/docs`)
              }
            >
              Api Doc
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-6xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
        <Card className="bg-sky-50 dark:bg-sky-900 border-none shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <List className="w-5 h-5 text-sky-500" /> Total Todos
            </CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold">{totalTodos}</CardContent>
        </Card>

        <Card className="bg-emerald-50 dark:bg-emerald-900 border-none shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-500" /> Completed
            </CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold">
            {completedTodos}
          </CardContent>
        </Card>

        <Card className="bg-purple-50 dark:bg-purple-900 border-none shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Pending Tasks
            </CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold">
            {totalTodos - completedTodos}
          </CardContent>
        </Card>

        <Card className="bg-yellow-50 dark:bg-yellow-900 border-none shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Productivity
            </CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold">
            {totalTodos > 0
              ? Math.round((completedTodos / totalTodos) * 100)
              : 0}
            %
          </CardContent>
        </Card>
      </section>

      {/* CTA Section */}
      <section className="text-center mt-20 mb-12 px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Ready to get started?
        </h2>
        <p className="text-lg text-muted-foreground mb-6">
          Create your first todo and organize your life today!
        </p>
        <Button
          size="lg"
          className="bg-sky-500 text-white hover:bg-sky-600 cursor-pointer"
          onClick={() => navigate(`${TODO.route}`)}
        >
          Add Your First Todo
        </Button>
      </section>
    </div>
  );
}
