export const usernameRegex = new RegExp('^[A-Za-z][A-Za-z0-9_]{7,29}$');

// Minimum eight characters, at least one letter and one number
export const passwordRegex = new RegExp('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$');
