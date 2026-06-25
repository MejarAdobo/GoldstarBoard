import * as cheerio from "cheerio";

// Doc: this function should only look for gold star img
export const parseHTML = (html: string) => {
  const $ = cheerio.load(html);

  let haveGoldStar = false;

  if ($("img.goldstar-station").length > 0) {
    haveGoldStar = true;
  }

  return haveGoldStar;
};
