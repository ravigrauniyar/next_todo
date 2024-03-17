"use client";

import { useEffect } from "react";
import Form from "@/components/Form";
import { todoExample, useTodo } from "@/shared/TodoProvider";

/**
 * NewTodo: Represents the component for creating a new todo item.
 *
 * Hooks Used:
 * - useTodo: A hook for accessing todo-related context or state.
 *
 * Actions:
 * - Sets the form values to default using `todoExample` when the component mounts.
 *
 * Returns:
 * - A page title and the form component for creating a new todo item.
 */
export default function NewTodo() {
  // Accessing todo-related context
  const { setTodoForFormValues } = useTodo()!;

  // Set default form values when the component mounts
  useEffect(() => {
    setTodoForFormValues(todoExample);
  }, [setTodoForFormValues]);

  return (
    <>
      <title>New | TODO</title>
      <Form type="New" />
    </>
  );
}
