
export function allEquals<Type>(array : Type[]) : boolean {
  if (array.length === 0) {
    return false;
  }

  let retVal = true;
  for (let i = 0; i < array.length; i++) {
    if (array[0] !== array[i]) {
      retVal = false;
      break;
    }
  }
  return retVal;
}