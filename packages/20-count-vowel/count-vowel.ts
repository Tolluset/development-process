/*
 * 母音を数えよう
 * 要件:
 * 入力された文字列の母音を数えて返す
 *
 * 例:
 * "vowel" => 2
 * "Nabe Atsu" => 4
 */

export const countVowel = (word: string) => {
  const vowels = ['a', 'e', 'i', 'o', 'u'];

  return word
    .toLowerCase()
    .split('')
    .filter((char) => vowels.includes(char)).length;
};
