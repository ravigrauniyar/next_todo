type FormProps = {
  type: string;
  onReturn?: () => void;
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
