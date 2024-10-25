import * as hangul from 'hangul-js';

// 텍스트가 실제로 써지는 효과를 구현하기 위한 함수
export function textStream(text: string) {
  const result: string[] = [];

  let lastText: string = '';
  const textArray = text.split('');
  textArray.forEach((char) => {
    const disassembled = hangul.disassemble(char);

    let temp: string = '';
    disassembled.forEach((_, j) => {
      temp = hangul.assemble(disassembled.slice(0, j + 1));
      result.push(lastText + temp);
    });
    lastText += temp;
  });

  return result;
}
