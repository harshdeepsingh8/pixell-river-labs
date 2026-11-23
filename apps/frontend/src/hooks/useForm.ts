import { useState } from "react";
import type { FormEvent } from "react";
import type { FormErrors, FormResult } from "../types/form";

export function useForm<TValues extends object, TResult>(
  initialValues: TValues,
  submitAction: (values: TValues) => FormResult<TResult> | Promise<FormResult<TResult>>,
  onSuccess?: (data: TResult) => void | Promise<void>,
) {
  const [values, setValues] = useState<TValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function update<K extends keyof TValues>(field: K, value: TValues[K]) {
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

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setMessage("");
    setErrors({});

    try {
      const result = await submitAction(values);

      if (!result.success) {
        setErrors(result.errors);
        setMessage(result.errors.form ?? "");
        return;
      }

      setValues({ ...initialValues });
      setMessage("Added successfully.");

      try {
        await onSuccess?.(result.data);
      } catch {
        setMessage("Saved successfully. Reload the page to see the latest list.");
      }
    } catch {
      setMessage("Could not save. Check that the backend is running.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return {
    values,
    errors,
    message,
    update,
    handleSubmit,
    isSubmitting,
  };
}