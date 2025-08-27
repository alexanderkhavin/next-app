// app/page.tsx
import LayoutWithSidebar from "./components/LayoutWithSidebar";

export default function Home() {
  return (
    <LayoutWithSidebar>
      <div>
        <h1 className="text-2xl font-bold mb-4">Добро пожаловать!</h1>
        <p className="text-gray-600 dark:text-gray-300">
          Это ваш основной контент, который теперь будет сдвигаться вместе с сайдбаром.
        </p>
        {/* Добавьте больше контента для теста */}
        <div className="mt-6 space-y-4">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
              <p>Карточка контента #{i + 1}</p>
            </div>
          ))}
        </div>
      </div>
    </LayoutWithSidebar>
  );
}