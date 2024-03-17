type FormProps = {
  type: string;
};

type ModalTypeProps = {
  type: string;
  title: string;
  onConfirm: () => void;
  onCancel: () => void;
};

type ModalProps = {
  header: string;
  body: string;
};

type ProviderProps = {
  children: React.ReactNode;
};

type FlagStates = {
  isUpdateModalOpen: boolean;
  isUpdateFormOpen: boolean;
  isDeleteModalOpen: boolean;
};
