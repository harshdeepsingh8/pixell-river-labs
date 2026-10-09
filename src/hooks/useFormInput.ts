import { useState } from "react";

type InputValidator = (value: string) => string | undefined;

/**
 * Manages presentation state for one form input.
 *
 * value: The current input value.
 * setValue: Updates the input value.
 * messages: Validation messages displayed for this input.
 * setMessages: Allows service errors to be displayed.
 * validate: Runs a supplied validator, updates messages,
 *           and returns whether validation passed.
 * reset: Restores the initial value and clears messages.
 *
 * Business rules belong in the supplied validator/service.
 */
export function useFormInput(initialValue = "") {
  const [value, setValue] = useState(initialValue);
  const [messages, setMessages] = useState<string[]>([]);

  function validate(validator: InputValidator): boolean {
    const error = validator(value);

    setMessages(error ? [error] : []);

    return error === undefined;
  }

  function reset() {
    setValue(initialValue);
    setMessages([]);
  }

  return {
    value,
    setValue,
    messages,
    setMessages,
    validate,
    reset,
  };
}