export const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

/*
Ограничения на Пароль: лат. символы (1 upper, 1 lower мин.), 8 символов мин., 1 цифра мин.
  (?=.*\d)          // should contain at least one digit
  (?=.*[a-z])       // should contain at least one lower case
  (?=.*[A-Z])       // should contain at least one upper case
  [a-zA-Z0-9]{8,}   // should contain at least 8 from the mentioned characters
*/
// export const PASSWORD_8CH_AZ_1DIGIT_REGEXP = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
// Любая последовательность лат. букв и цифр длиной 8 или более
// export const PASSWORD_8CH_AZ = /[a-zA-Z0-9]{8,}/;
// Строка длиной 8 или более символов
export const PASSWORD_8CH = /^.{8,}$/;


export function isEmailValid(value: string) {
  return EMAIL_REGEXP.test(value);
}

export function isPasswordValid(value: string) {
  return PASSWORD_8CH.test(value);
}

