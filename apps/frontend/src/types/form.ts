export type FormErrors = Record<string, string>;

export type FormResult<T> =
  | { success: true; data: T }
  | { success: false; errors: FormErrors };