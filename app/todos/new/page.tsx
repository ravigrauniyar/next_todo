"use client";

import { useEffect } from "react";
import Form from "@/components/Form";
import { todoExample, useTodo } from "@/shared/TodoProvider";

export default function New() {
  const { setTodoForFormValues } = useTodo()!;
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
