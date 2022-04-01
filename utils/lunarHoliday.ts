type date = `${number}-${number}`;

export function getLunarDateEvent(day: date) {
  switch (day) {
    case '1/1':
      return 'Tết Nguyên Đán';
    case '15/1':
      return 'Tết Nguyên Tiêu (Lễ Thượng Nguyên)';
    case '3/3':
      return 'Tết Hàn Thực';
    case '10/3':
      return 'Giỗ Tổ Hùng Vương';
    case '15/4':
      return 'Lễ Phật Đản';
    case '5/5':
      return 'Tết Đoan Ngọ';
    case '15/7':
      return 'Lễ Vu Lan';
    case '15/8':
      return 'Tết Trung Thu';
    case '9/9':
      return 'Tết Trùng Cửu';
    case '10/10':
      return 'Tết Thường Tân';
    case '15/10':
      return 'Tết Hạ Nguyên';
    case '23/12':
      return 'Tiễn Táo Quân về trời';
    default:
      return undefined;
  }
}
