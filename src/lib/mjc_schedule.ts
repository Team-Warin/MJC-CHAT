import * as cheerio from 'cheerio';

// 년도와 월을 기준으로 해당 학기의 학사 일정을 크롤링하는 라이브러리
export async function getSchedule({
  year,
  month,
}: {
  year: number;
  month: number;
}) {
  // 학기 계산
  const hakgi = (month: number): number => {
    if ([3, 4, 5, 6, 7, 8].includes(month)) return 1;
    if ([9, 10, 11, 12, 1, 2].includes(month)) return 2;
    return 1;
  };

  // 학사 일정 크롤링
  const res = await fetch(
    `https://www.mjc.ac.kr/collegeService/schedule.do?menu_idx=104&year=${year}&hakgi=${hakgi(
      month
    )}`
  );

  // 크롤링한 데이터를 파싱
  const $ = cheerio.load(await res.text());
  const schedule = $('.memo')
    .text()
    .replace(/\t|\s+$/g, '')
    .split('\n\n');

  const result: {
    date: string;
    content: string;
  }[] = [];

  schedule.forEach((item) => {
    if (!item) return;

    const temp: {
      date: string;
      content: string;
    } = {
      date: '',
      content: '',
    };
    item.split('\n').forEach((item) => {
      if (!item) return;
      if (temp.date === '') temp.date = item;
      else temp.content += item;
    });
    result.push(temp);
  });

  return result;
}
