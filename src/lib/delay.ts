export function delay(
  ms: number,
  callback: () => void,
  abort?: AbortController
) {
  return new Promise((resolve) => {
    const timer = setTimeout(() => {
      callback();
      resolve(ms);
    }, ms);

    // 타이머 중단 및 promise 중단
    abort?.signal.addEventListener('abort', () => {
      clearTimeout(timer);
    });
  });
}
