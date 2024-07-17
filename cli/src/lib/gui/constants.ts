import { FormInputProps } from "./components/forms/form.component";

export const usernameRegex = new RegExp('^[A-Za-z][A-Za-z0-9_]{4,29}$');

// Minimum eight characters, at least one letter and one number
export const passwordRegex = new RegExp('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{6,}$');

export const usernameInput: FormInputProps = {
  name: 'username',
  label: 'Username',
  type: 'text',
  validate: (form) => !usernameRegex.test(form['username']) ? 'Username is not valid' : '',
};

export const passwordInput: FormInputProps = {
  name: 'password',
  label: 'Password',
  type: 'password',
  validate: (form) => !usernameRegex.test(form['password']) ? 'Password is not valid' : '',
};
export const rePasswordInput: FormInputProps = {
  name: 're-password',
  label: 'Repeat Password ',
  type: 'password',
  validate: (form) => form['password'] !== form['re-password']  ? 'Passwords don\'t match' : '',
};