export function delay(ms: number, callback: () => void) {
  return new Promise((resolve) =>
    setTimeout(() => {
      callback();
      resolve(ms);
    }, ms)
  );
}
