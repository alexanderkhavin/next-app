import { RequestType } from "@/shared/ui/Modal/types/modal";

export const requestTypes: RequestType[] = [
  {
    id: 'accessInspection',
    title: 'Заявка на доступ в инспекцию',
    description: 'Доступа к инспекции для сотрудника',
    icon: '🔐',
    fields: [
      {
        name: 'name',
        label: 'ФИО',
        type: 'text',
        required: true
      },
      {
        name: 'supervisorName',
        label: 'Руководитель',
        type: 'text',
        required: true
      },
      {
        name: 'position',
        label: 'Должность',
        type: 'select',
        options: [
            'Специалист 1-категории', 
            'Ведущий специалист', 
            'Старший специалист', 
            'Главный специалист', 
            'Консультант', 
            'Заместитель начальника отдела', 
            'Начальник отдела'],
        required: true
      },
      {
        name: 'department',
        label: 'Отдел',
        type: 'select',
        options: [
            'Руководство', 
            'Отдел администрирования информационных систем №1', 
            'Отдел администрирования информационных систем №2', 
            'Отдел администрирования информационных систем №3', 
            'Отдел администрирования информационных систем №4', 
            'Отдел администрирования технологической инфраструктуры', 
            'Отдел анализа и контроля технологических процессов', 
            'Отдел безопасности', 
            'Отдел информационной безопасности', 
            'Отдел массовой печати и рассылки', 
            'Отдел обработки обращений налогоплательшиков (контакт-центр)',
            'Отдел общего и кадрового обеспечения',
            'Отдел работы с внешними источниками',
            'Отдел технологической поддержки АИС ФНС России',
            'Отдел финансового и хозяйственного обеспечения',
            'Отдел эскплуатации технологической инфраструктуры',
            'Отделение филиала в г. Кемерово',
            'Отделение филиала в г. Новокузнецк',
            'Отделение филиала в г. Прокопьевск',
        ],
        required: true
      },
      {
        name: 'nameESK',
        label: 'Учетная запись в ЕСК (с указанием домена)',
        type: 'text',
        required: true
      },
      {
        name: 'contact',
        label: 'Контактные данные',
        type: 'text',
        required: false
      }
    ]
  },
  {
    id: 'internet',
    title: 'Заявка на интернет',
    description: 'Запрос подключения к интернету или изменения доступа',
    icon: '🌐',
    fields: [
      {
        name: 'location',
        label: 'Местоположение',
        type: 'text',
        required: true
      },
      {
        name: 'speed',
        label: 'Требуемая скорость (Мбит/с)',
        type: 'number',
        required: true
      },
      {
        name: 'purpose',
        label: 'Цель использования',
        type: 'textarea',
        required: false
      }
    ]
  },
  {
    id: 'software',
    title: 'Заявка на ПО',
    description: 'Запрос установки или обновления программного обеспечения',
    icon: '💻',
    fields: [
      {
        name: 'softwareName',
        label: 'Название программного обеспечения',
        type: 'text',
        required: true
      },
      {
        name: 'version',
        label: 'Версия',
        type: 'text',
        required: false
      },
      {
        name: 'justification',
        label: 'Обоснование необходимости',
        type: 'textarea',
        required: true
      }
    ]
  },
  {
    id: 'hardware',
    title: 'Заявка на оборудование',
    description: 'Запрос нового оборудования или ремонта существующего',
    icon: '🖥️',
    fields: [
      {
        name: 'equipmentType',
        label: 'Тип оборудования',
        type: 'select',
        options: ['Компьютер', 'Монитор', 'Принтер', 'Сканер', 'Сетевое оборудование', 'Другое'],
        required: true
      },
      {
        name: 'problem',
        label: 'Описание проблемы или потребности',
        type: 'textarea',
        required: true
      },
      {
        name: 'urgency',
        label: 'Срочность',
        type: 'select',
        options: ['Низкая', 'Средняя', 'Высокая', 'Критическая'],
        required: true
      }
    ]
  }
];