function padTo2Digits(num: any) {
  return num.toString().padStart(2, '0');
}

export function formatDate(date: any, pattern: string) {
  return [
    date.getFullYear(),
    padTo2Digits(date.getMonth() + 1),
    padTo2Digits(date.getDate()),
  ].join(pattern);
}

export function formatDate2(date: any) {
  return [padTo2Digits(date.getMonth() + 1), padTo2Digits(date.getDate())].join(
    '/'
  );
}
export function formatTime(date: any) {
  return [padTo2Digits(date.getHours()), padTo2Digits(date.getMinutes())].join(
    ':'
  );
}

export function randstr() {
  return Math.random().toString(36).replace('0.', '');
}

const NEW_DATE = new Date();

export const INITIAL_DATE = {
  dateString: formatDate(NEW_DATE, '-'),
  day: NEW_DATE.getDate(),
  month: NEW_DATE.getMonth() + 1,
  year: NEW_DATE.getFullYear(),
  timestamp: NEW_DATE.getTime(),
};

export const getDayOfWeek = (date: Date) => {
  switch (date.getDay()) {
    case 0:
      return 'CHỦ NHẬT';
    case 1:
      return 'THỨ HAI';
    case 2:
      return 'THỨ BA';
    case 3:
      return 'THỨ TƯ';
    case 4:
      return 'THỨ NĂM';
    case 5:
      return 'THỨ SÁU';
    case 6:
      return 'THỨ BẢY';
    default:
      return undefined;
  }
};
