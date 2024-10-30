import { disassembleToGroups, assemble } from 'es-hangul';

// 텍스트가 실제로 써지는 효과를 구현하기 위한 함수
export function textStream(text: string) {
  const result: string[] = [];

  let lastText: string = '';
  const textArrayGroups = disassembleToGroups(text);
  textArrayGroups.forEach((group) => {
    let temp: string = '';
    group.forEach((_, j) => {
      temp = assemble(group.slice(0, j + 1));
      result.push(lastText + temp);
    });
    lastText += temp;
  });

  return result;
}
