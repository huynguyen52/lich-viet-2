type date = `${number}-${number}`;

export function getSolarDateEvent(day: date) {
  switch (day) {
    case '1-1':
      return 'Tết Dương lịch';
    case '14-2':
      return 'Lễ tình nhân (Valentine)';
    case '27-2':
      return 'Ngày thầy thuốc Việt Nam';
    case '8-3':
      return 'Ngày Quốc tế Phụ nữ';
    case '26-3':
      return 'Ngày thành lập Đoàn TNCS Hồ Chí Minh';
    case '1-4':
      return 'Ngày Cá tháng Tư';
    case '30-4':
      return 'Ngày giải phóng miền Nam';
    case '1-5':
      return 'Ngày Quốc tế Lao động';
    case '7-5':
      return 'Ngày chiến thắng Điện Biên Phủ';
    case '13-5':
      return 'Ngày của mẹ';
    case '19-5':
      return 'Ngày sinh chủ tịch Hồ Chí Minh';
    case '1-6':
      return 'Ngày Quốc tế thiếu nhi';
    case '17-6':
      return 'Ngày của cha';
    case '21-6':
      return 'Ngày báo chí Việt Nam';
    case '28-6':
      return 'Ngày gia đình Việt Nam';
    case '11-7':
      return 'Ngày dân số thế giới';
    case '27-7':
      return 'Ngày Thương binh liệt sĩ';
    case '28-7':
      return 'Ngày thành lập công đoàn Việt Nam';
    case '19-8':
      return 'Ngày tổng khởi nghĩa';
    case '2-9':
      return 'Ngày Quốc Khánh';
    case '10-9':
      return 'Ngày thành lập Mặt trận Tổ quốc Việt Nam';
    case '1-10':
      return 'Ngày quốc tế người cao tuổi';
    case '10-10':
      return 'Ngày giải phóng thủ đô';
    case '13-10':
      return 'Ngày doanh nhân Việt Nam';
    case '20-10':
      return 'Ngày Phụ nữ Việt Nam';
    case '31-10':
      return 'Ngày Halloween';
    case '9-11':
      return 'Ngày pháp luật Việt Nam';
    case '20-11':
      return 'Ngày Nhà giáo Việt Nam';
    case '23-11':
      return 'Ngày thành lập Hội chữ thập đỏ Việt Nam';
    case '1-12':
      return 'Ngày thế giới phòng chống AIDS';
    case '19-12':
      return 'Ngày toàn quốc kháng chiến';
    case '24-12':
      return 'Ngày lễ Giáng sinh';
    case '22-12':
      return 'Ngày thành lập quân đội nhân dân Việt Nam';
    default:
      return undefined;
  }
}
