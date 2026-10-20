import { useState } from "react";
import type { FormEvent } from "react";
import type { FormErrors, FormResult } from "../types/form";

export function useForm<TValues extends object, TResult>(
  initialValues: TValues,
  submitAction: (values: TValues) => FormResult<TResult>,
  onSuccess?: (data: TResult) => void,
) {
  const [values, setValues] = useState<TValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [message, setMessage] = useState("");

  function update<K extends keyof TValues>(
    field: K,
    value: TValues[K],
  ) {
    setValues((previous) => ({
      ...previous,
      [field]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [String(field)]: "",
    }));

    setMessage("");
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");

    const result = submitAction(values);

    if (!result.success) {
      setErrors(result.errors);
      return;
    }

    setErrors({});
    setValues({ ...initialValues });
    setMessage("Added successfully.");
    onSuccess?.(result.data);
  }

  return {
    values,
    errors,
    message,
    update,
    handleSubmit,
  };
}