import style from '@/styles/support.module.css';

export const status: {
  [key: number]: {
    color: 'primary' | 'warning' | 'success';
    text: string;
    style: string;
  };
} = {
  0: { color: 'primary', text: '등록됨', style: style.accept },
  1: { color: 'warning', text: '처리중', style: style.waiting },
  2: { color: 'success', text: '완료', style: style.complete },
};

export function timeForToday(value: Date) {
  const today = new Date();
  const timeValue = new Date(value);

  const betweenTime = Math.floor(
    (today.getTime() - timeValue.getTime()) / 1000 / 60
  );
  if (betweenTime < 1) return '방금전';
  if (betweenTime < 60) {
    return `${betweenTime}분전`;
  }

  const betweenTimeHour = Math.floor(betweenTime / 60);
  if (betweenTimeHour < 24) {
    return `${betweenTimeHour}시간전`;
  }

  const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
  if (betweenTimeDay < 365) {
    return `${betweenTimeDay}일전`;
  }

  return `${Math.floor(betweenTimeDay / 365)}년전`;
}
