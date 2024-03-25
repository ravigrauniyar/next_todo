"use client";

import _ from "lodash";
import "@/app/globals.css";
import Modal from "./Modal";
import { v4 as uuidv4 } from "uuid";
import { Todo } from "@/drizzle/schema";
import { useParams } from "next/navigation";
import { FormTitle } from "./constants.enum";
import { FormEvent, useEffect } from "react";
import { useTodo } from "@/shared/TodoProvider";
import priorities from "@/utils/PrioritiesData.json";
import { useTodoRouter } from "@/shared/RouterProvider";
import { useDatabase } from "@/shared/DbContextProvider";
import { useFlagStates } from "@/shared/FlagStatesProvider";

/**
 * Form: Represents a form component used for creating or updating todo items.
 *
 * Props:
 * - type: A string representing the type of form (e.g., "New" or "Update").
 *
 * Hooks Used:
 * - useTodoRouter: A hook for handling routing related to todo items.
 * - useParams: A hook for accessing parameters from the URL.
 * - useTodo: A hook for accessing todo-related context or state.
 * - useFlagStates: A hook for accessing flag states related to the form.
 *
 * Methods Used:
 * - createTodo: An asynchronous function for creating a new todo item.
 * - readTodoDetails: An asynchronous function for retrieving details of a todo item.
 * - updateTodo: An asynchronous function for updating a todo item.
 *
 * Components Used:
 * - Modal: A component for displaying a modal window.
 */
export default function Form({ type }: FormProps) {
  // Access router-related functions and parameters from the URL
  const { handleReturn, handleRedirect } = useTodoRouter()!;
  const { readTodoDetails, createTodo, updateTodo } = useDatabase()!;

  const params = useParams<{ id: string }>();

  // Determine the form title based on the form type
  const formTitle = type === "New" ? FormTitle.New : FormTitle.Update;

  // Retrieve the title of the current todo item
  const currentTodoTitle = useTodo()?.todo?.title;

  // Access flag states and the function to update them
  const { flagStates, setFlagStates } = useFlagStates()!;
  const isUpdateModalOpen = flagStates.isUpdateModalOpen;

  // Access todo-related context and state
  const { todoForFormValues, setTodoForFormValues } = useTodo()!;

  // Extract the todo item ID from the URL parameters
  const id = params.id;

  // Fetch todo item details when the component mounts, if it's an update form
  useEffect(() => {
    if (type === "Update" && id) {
      readTodoDetails(id as string).then((todoDetail: Todo | undefined) => {
        if (todoDetail) {
          setTodoForFormValues(todoDetail);
        }
      });
    }
  }, [id, type, setTodoForFormValues, readTodoDetails]);

  /**
   * handleCancel: Handles the cancel action in the form.
   *
   * Returns:
   * - If the form type is "New", calls the handleReturn function.
   * - If the form type is not "New", updates flag states to close the update form.
   */
  const handleCancel = () => {
    return type === "New"
      ? handleReturn()
      : setFlagStates({
          ...flagStates,
          isUpdateFormOpen: false,
        });
  };

  /**
   * handleSubmit: Handles form submission.
   *
   * @param e The form submit event.
   *
   * Actions:
   * - Prevents the default form submission behavior.
   * - If the form type is "New", creates a new todo item and redirects to the todos page.
   * - If the form type is not "New", sets flag states to open the update modal.
   */
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (type === "New") {
      await createTodo({
        ...todoForFormValues,
        id: uuidv4(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });
      handleRedirect("/todos");
    } else {
      setFlagStates({
        ...flagStates,
        isUpdateModalOpen: true,
      });
    }
  };

  /**
   * handleUpdateTodo: Handles updating an existing todo item.
   *
   * Actions:
   * - Updates the todo item with the latest form values and current timestamp.
   * - Updates flag states to close the update form and update modal.
   */
  const handleUpdateTodo = async () => {
    const todo = { ...todoForFormValues, updated_at: new Date().toISOString() };
    await updateTodo(todo);

    setFlagStates({
      ...flagStates,
      isUpdateFormOpen: false,
      isUpdateModalOpen: false,
    });
  };

  // Inline styles for form elements
  const elementStyles =
    "w-full h-[40px] outline-none focus:outline-none px-3 rounded-md";

  return (
    <div className="flex-center h-screen">
      {!isUpdateModalOpen ? (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col bg-gray-600 rounded-sm px-3 py-5 gap-5"
        >
          <div className="text-[30px] font-[500] text-center">{formTitle}</div>
          <input
            type="text"
            value={todoForFormValues.title!}
            className={`${elementStyles} text-black`}
            placeholder="Title"
            onChange={(e) =>
              setTodoForFormValues({
                ...todoForFormValues,
                title: e.target.value,
              })
            }
            required
          />
          <textarea
            className={`${elementStyles} pt-2 text-black min-h-[100px]`}
            value={todoForFormValues.description!}
            placeholder="Description"
            onChange={(e) =>
              setTodoForFormValues({
                ...todoForFormValues,
                description: e.target.value,
              })
            }
          />
          <div className="w-full">
            <div className="mb-2 font-[500]">Priority</div>
            <select
              name="priority"
              value={priorities[todoForFormValues.priority!]}
              id="priority"
              className={`${elementStyles} bg-white text-black`}
              onChange={(e) =>
                setTodoForFormValues({
                  ...todoForFormValues,
                  priority: _.findIndex(
                    priorities,
                    (priority) => priority === e.target.value
                  ),
                })
              }
            >
              {_.map(priorities, (priority, index) => {
                return (
                  <option key={index} value={priority}>
                    {priority}
                  </option>
                );
              })}
            </select>
          </div>
          {type !== "New" && (
            <div className="flex w-full h-[40px] items-center justify-start">
              <input
                type="checkbox"
                className="w-[16px] h-[16px] mr-2 mt-[-3px]"
                checked={todoForFormValues.isCompleted!}
                onChange={() =>
                  setTodoForFormValues({
                    ...todoForFormValues,
                    isCompleted: !todoForFormValues.isCompleted,
                  })
                }
              />
              Completed
            </div>
          )}
          <div className="flex w-full gap-5">
            <button
              type="submit"
              className="btn flex-center bg-gray-500 hover:bg-gray-700"
            >
              Submit
            </button>
            <button
              onClick={handleCancel}
              className="btn flex-center bg-red-500 hover:bg-red-600"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <Modal
          type="Update"
          title={currentTodoTitle!}
          onConfirm={() => handleUpdateTodo()}
          onCancel={() =>
            setFlagStates({
              ...flagStates,
              isUpdateModalOpen: false,
            })
          }
        />
      )}
    </div>
  );
}
