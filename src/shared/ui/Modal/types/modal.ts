export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (value: any) => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  closeOnOverlayClick?: boolean;
}

export interface RequestType {
  id: string;
  title: string;
  description: string;
  icon: string;
  fields: Field[];
}

export interface Field {
  name: string;
  label: string;
  type: 'text' | 'textarea' | 'select' | 'number';
  options?: string[];
  required?: boolean;
}