export function validate(password: string, criteria: string) {
  if (criteria === 'length') {
    if (password?.length < 8 || password?.length === undefined) {
      return true;
    } else {
      return false;
    }
  }

  if (criteria === 'hasNumeric') {
    if (
      password?.match(/[0-9]/) === null ||
      password?.match(/[0-9]/) === undefined
    ) {
      return true;
    } else {
      return false;
    }
  }

  if (criteria === 'hasSpecialCharacter') {
    if (
      password?.match(/[?=.*!@#%]/) === null ||
      password?.match(/[?=.*!@#%]/) === undefined
    ) {
      return true;
    } else {
      return false;
    }
  }

  if (criteria === 'hasUpperCase') {
    if (
      password?.match(/[A-Z]/) === null ||
      password?.match(/[A-Z]/) === undefined
    ) {
      return true;
    } else {
      return false;
    }
  }

  if (criteria === 'hasLowerCase') {
    if (
      password?.match(/[a-z]/) === null ||
      password?.match(/[a-z]/) === undefined
    ) {
      return true;
    } else {
      return false;
    }
  }
}
