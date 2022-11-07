export const stringToList = (a: string) => {
  a = a.replace("[", '');
  a = a.replace("]", "");
  a = a.replace("/'/g", "");
  let aList = a.split(",");
  return aList as string[];
};

export const getAllMatchesWithSubstring = (words: string[], substrings: string[]) => {
  let res = [];

  for (let word of words) {
    for (let substring of substrings) {
      if (word.includes(substring)) {
        res.push(word);
        break;
      }
    }
  };

  return res as string[];
};
