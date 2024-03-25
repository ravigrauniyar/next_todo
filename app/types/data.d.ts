/**
 * ProviderProps: Represents props for a provider component.
 *
 * Props:
 * - children: A React node representing the children components.
 */
type ProviderProps = {
  children: React.ReactNode;
};

/**
 * FlagStates: Represents a set of boolean flags for different states.
 *
 * Flags:
 * - isUpdateModalOpen: A flag indicating whether the update modal is open.
 * - isUpdateFormOpen: A flag indicating whether the update form is open.
 * - isDeleteModalOpen: A flag indicating whether the delete modal is open.
 */
type FlagStates = {
  isUpdateModalOpen: boolean;
  isUpdateFormOpen: boolean;
  isDeleteModalOpen: boolean;
};

/**
 * FormProps: Represents props for a form component.
 *
 * Props:
 * - type: A string representing the type of the form.
 */
type FormProps = {
  type: string;
};

/**
 * ModalTypeProps: Represents props for a modal component with specific functionality.
 *
 * Props:
 * - type: A string representing the type of the modal.
 * - title: A string representing the title of the modal.
 * - onConfirm: A function to be called when the user confirms an action in the modal.
 * - onCancel: A function to be called when the user cancels an action in the modal.
 */
type ModalTypeProps = {
  type: string;
  title: string;
  onConfirm: () => void;
  onCancel: () => void;
};

/**
 * ModalProps: Represents props for a modal component.
 *
 * Props:
 * - header: A string representing the header text of the modal.
 * - body: A string representing the body text of the modal.
 */
type ModalProps = {
  header: string;
  body: string;
};

type Todo = {
  id: string;
  title: string;
  description: string;
  priority: number;
  isCompleted: boolean;
  created_at: string;
  updated_at: string;
};
