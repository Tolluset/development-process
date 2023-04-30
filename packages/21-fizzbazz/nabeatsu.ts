/*
 * fizzbazzを書いてみよう
 * 要件
 * 1. 入力された長さの配列を返す
 * 2. 配列は1から始まり、1ずつ増えて行く（例: `[1, 2, ....]`）
 * 3. '3'がつく数字と3の倍数でアホになる（例: `[1, 2, 'aho', 4, ...]`）
 * 4. 5の倍数で犬になる（例: `[1, 2, 'aho', 4, 'bow', ...]`）
 * 5. 3と4の条件を同時に満たす場合、アホな犬になる（例: `[ ..., 13, 14, 'ahobow', 16, ...]`）
 */

export const nabeatsu = (len: number) => {
  const result = [];

  for (let i = 1; i <= len; i++) {
    if (i % 3 === 0 && i % 5 === 0) {
      result.push('ahobow');
    } else if (i % 3 === 0) {
      result.push('aho');
    } else if (i % 5 === 0) {
      result.push('bow');
    } else {
      result.push(i);
    }
  }
  return result;
};
