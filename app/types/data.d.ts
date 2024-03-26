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

/**
 * TodoDTO: Represents a todo item stored in a DrizzleTodoDTO database.
 *
 * Properties:
 * - id: A string representing the unique identifier for the todo item.
 * - title: A string representing the title of the todo item.
 * - description: A string representing the description of the todo item.
 * - priority: A number representing the priority level of the todo item.
 * - isCompleted: A boolean indicating whether the todo item is completed or not.
 * - created_at: A string representing the timestamp indicating when the todo item was created.
 * - updated_at: A string representing the timestamp indicating when the todo item was last updated.
 */
type TodoDTO = {
  id: string;
  title: string;
  description: string;
  priority: number;
  isCompleted: boolean;
  created_at: string;
  updated_at: string;
};

/**
 * PrismaDbProps: Defines the interface for interacting with a Prisma database in the context of managing todo items.
 */
type PrismaDbProps = {
  /**
   * createTodo: Creates a new todo item in the Prisma database.
   *
   * @param todo A TodoDTO object representing the todo item to be created.
   */
  createTodo: (todo: TodoDTO) => Promise<void>;

  /**
   * readTodos: Retrieves all todo items from the Prisma database.
   *
   * @returns A Promise that resolves to an array of TodoDTO objects.
   */
  readTodos: () => Promise<TodoDTO[]>;

  /**
   * readTodoDetails: Retrieves details of a specific todo item from the Prisma database.
   *
   * @param id The ID of the todo item to retrieve details for.
   * @returns A Promise that resolves to a TodoDTO object if found, otherwise null.
   */
  readTodoDetails: (id: string) => Promise<TodoDTO | null>;

  /**
   * updateTodo: Updates an existing todo item in the Prisma database.
   *
   * @param todo A TodoDTO object representing the updated todo item.
   */
  updateTodo: (todo: TodoDTO) => Promise<void>;

  /**
   * deleteTodo: Deletes a todo item from the Prisma database.
   *
   * @param id The ID of the todo item to delete.
   */
  deleteTodo: (id: string) => Promise<void>;
};
