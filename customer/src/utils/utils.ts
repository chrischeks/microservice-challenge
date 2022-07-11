export const generateRandomString = (length: number): string => {
  const dict = '0123456789ABCDEFGHJKLMNOPQRSTUVWXYZ';

  let result = '';
  for (let i = length; i > 0; i -= 1) {
    result += dict[Math.round(Math.random() * (dict.length - 1))];
  }
  return result;
};
