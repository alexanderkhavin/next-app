// app/page.tsx
import ApplicationTable from "@/widgets/ApplicationTable/ui/ApplicationTable";
import LayoutWithSidebar from "../widgets/LayoutWithSidebar";

export default function Home() {
  const mock = [
    {
    id: 1,
    status: 'approved',
    date: '2025-08-27',
    type: 'Доступ в инспекцию',
    branch: 'KO',
    signer: 'xcjvjvxjc'
}
  ]
  return (
    <LayoutWithSidebar>
      <div>
        <h1 className="text-2xl font-bold mb-4">Добро пожаловать!</h1>
        <p className="text-gray-600 dark:text-gray-300">
          Это ваш основной контент, который теперь будет сдвигаться вместе с сайдбаром.
        </p>
        {/* Добавьте больше контента для теста */}
        <div className="mt-6 space-y-4">

          <ApplicationTable applications={mock} />
        </div>
      </div>
    </LayoutWithSidebar>
  );
}