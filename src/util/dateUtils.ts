const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const getMonthString = (month: string | number) => {
  const monthNum = typeof month === 'number' ? month : parseInt(month);
  return monthNames[monthNum - 1];
};

export const getDayString = (day: string | number) => {
  const dayNum = typeof day === 'number' ? day : parseInt(day);
  switch (dayNum) {
    case 1:
    case 21:
    case 31:
      return `${dayNum}st`;
    case 2:
    case 22:
      return `${dayNum}nd`;
    case 3:
    case 23:
      return `${dayNum}rd`;
    default:
      return `${dayNum}th`;
  }
};
