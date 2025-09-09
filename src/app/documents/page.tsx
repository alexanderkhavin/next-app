import ApplicationTable from "@/components/ApplicationTable/ApplicationTable";
import LayoutWithSidebar from "../../components/LayoutWithSidebar";

export default function Home() {
  const mock = [
    {
      id: 1,
      status: 'approved',
      date: '2025-08-27',
      type: 'Доступ в инспекцию',
      branch: 'Филиал ФКУ "Налог-Сервис" ФНС России в Кемеровской области',
      signer: 'Янченко Илья Дмитриевич'
    },
    {
      id: 2,
      status: 'notapproved',
      date: '2025-08-26',
      type: 'Доступ в инспекцию',
      branch: 'Филиал ФКУ "Налог-Сервис" ФНС России в Кемеровской области',
      signer: 'Янченко Илья Дмитриевич'
    },
    {
      id: 3,
      status: 'notapproved',
      date: '2025-08-26',
      type: 'Учетная запись',
      branch: 'Филиал ФКУ "Налог-Сервис" ФНС России в Кемеровской области',
      signer: 'Янченко Илья Дмитриевич'
    },
    {
      id: 4,
      status: 'notapproved',
      date: '2025-08-26',
      type: 'Доступ в инспекцию',
      branch: 'Филиал ФКУ "Налог-Сервис" ФНС России в Кемеровской области',
      signer: 'Янченко Илья Дмитриевич'
    },
    {
      id: 5,
      status: 'notapproved',
      date: '2025-08-26',
      type: 'Доступ в инспекцию',
      branch: 'Филиал ФКУ "Налог-Сервис" ФНС России в Кемеровской области',
      signer: 'Янченко Илья Дмитриевич'
    },
    {
      id: 6,
      status: 'notapproved',
      date: '2025-08-26',
      type: 'Доступ в инспекцию',
      branch: 'Филиал ФКУ "Налог-Сервис" ФНС России в Кемеровской области',
      signer: 'Янченко Илья Дмитриевич'
    },
    {
      id: 7,
      status: 'notapproved',
      date: '2025-08-26',
      type: 'Доступ в инспекцию',
      branch: 'Филиал ФКУ "Налог-Сервис" ФНС России в Кемеровской области',
      signer: 'Янченко Илья Дмитриевич'
    },
    {
      id: 8,
      status: 'notapproved',
      date: '2025-08-26',
      type: 'Доступ в инспекцию',
      branch: 'Филиал ФКУ "Налог-Сервис" ФНС России в Кемеровской области',
      signer: 'Янченко Илья Дмитриевич'
    },
    {
      id: 9,
      status: 'notapproved',
      date: '2025-08-26',
      type: 'Доступ в инспекцию',
      branch: 'Филиал ФКУ "Налог-Сервис" ФНС России в Кемеровской области',
      signer: 'Янченко Илья Дмитриевич'
    },
    {
      id: 10,
      status: 'notapproved',
      date: '2025-08-26',
      type: 'Доступ в инспекцию',
      branch: 'Филиал ФКУ "Налог-Сервис" ФНС России в Кемеровской области',
      signer: 'Янченко Илья Дмитриевич'
    },
    {
      id: 11,
      status: 'notapproved',
      date: '2025-08-26',
      type: 'Доступ в инспекцию',
      branch: 'Филиал ФКУ "Налог-Сервис" ФНС России в Кемеровской области',
      signer: 'Янченко Илья Дмитриевич'
    },
    {
      id: 12,
      status: 'notapproved',
      date: '2025-08-26',
      type: 'Доступ в инспекцию',
      branch: 'Филиал ФКУ "Налог-Сервис" ФНС России в Кемеровской области',
      signer: 'Янченко Илья Дмитриевич'
    },
    {
      id: 13,
      status: 'notapproved',
      date: '2025-08-26',
      type: 'Доступ в инспекцию',
      branch: 'Филиал ФКУ "Налог-Сервис" ФНС России в Кемеровской области',
      signer: 'Балмасов Юрий Сергеевич'
    }
  ]
  return (
    <LayoutWithSidebar>
      <div>
        <ApplicationTable applications={mock} />
      </div>
    </LayoutWithSidebar>
  );
}

export const metadata = {
  title: 'Документы',
  description: 'Документы созданных заявок',
};