import * as cheerio from "cheerio";

// Doc: this function should only look for gold star img
export const parseHTML = (html: string) => {
  const $ = cheerio.load(html);

  let haveGoldStar = false;
  let stationOnline = true;

  if ($("img.goldstar-station").length > 0) {
    haveGoldStar = true;
  }

  if ($("circle").length > 0 && $('[style*="background-color: green"]').length > 0) {
    stationOnline = false;
  }

  return { stationOnline, haveGoldStar };
};
