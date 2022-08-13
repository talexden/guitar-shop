export const getTripleNumberString = (number: number): string => {
  const stringArray = [];
  const stringNumber = String(number).split('').reverse();

  for (let i = 0; i < stringNumber.length; i++) {
    if (!(i % 3) && i > 0) {
      stringArray.push(' ');
    }
    stringArray.push(stringNumber[i]);

  }

  return stringArray.reverse().join('');
};


export const capitalizedString = (textString: string): string => `${textString[0].toUpperCase()}${textString.slice(1)}`;

export const getIntegersArrayFromTo = (from: number, to: number): number[] => {
  const result = [];
  for (let i = from; i < to + 1; i++) {
    result.push(i);
  }

  return result;
};


export const formatDateDDMMMMYYYY = (date: string): string => (
  new Date(date).toLocaleString('ru', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
);

