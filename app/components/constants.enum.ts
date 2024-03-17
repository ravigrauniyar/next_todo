/**
 * StatusColor: An enum representing colors for different statuses.
 * 
 * Props:
 * - Completed: Green text style for completed Todo.
 * - Pending: Red text style for completed Todo.
 */
export enum StatusColor {
  Completed = "text-green-600",
  Pending = "text-yellow-600",
}

/**
 * HeaderColor: An enum representing colors for different form titles.
 * 
 * Props:
 * - Update: Yellow text style for update action.
 * - Delete: Red text style for delete action.
 */
export enum HeaderColor {
  Update = "text-yellow-500",
  Delete = "text-red-500",
}

/**
 * FormTitle: An enum representing titles for different forms.
 * 
 * Props:
 * - New: Title for adding a new Todo.
 * - Update: Title for updating an existing Todo.
 */
export enum FormTitle {
  New = "Add Todo",
  Update = "Update Todo",
}
