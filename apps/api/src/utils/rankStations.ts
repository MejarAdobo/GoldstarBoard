import { getAllStationsForLeaderboard } from "@goldstarboard/db-services/station/queries";

type RankedStation = Awaited<ReturnType<typeof getAllStationsForLeaderboard>>[number] & { rank: number };

export const rankByStars = async () => {
  const stations = await getAllStationsForLeaderboard();
  const sorted = [...stations].toSorted((a, b) => b.stats!.star - a.stats!.star);
  const allEqual = sorted.every((s) => s.stats!.star === sorted[0]!.stats!.star);

  if (allEqual) {
    return sorted
      .toSorted((a, b) => a.name.localeCompare(b.name))
      .map((s) => Object.assign({}, s, { rank: 0 }) as RankedStation);
  }

  return sorted.map((station, _, arr) => {
    const rank = arr.filter((s) => s.stats!.star > station.stats!.star).length +
      arr.filter((s) => s.stats!.star === station.stats!.star).length;
    return Object.assign({}, station, { rank }) as RankedStation;
  });
};

export const rankByStreak = async () => {
  const stations = await getAllStationsForLeaderboard();
  const sorted = [...stations].toSorted((a, b) => {
    if (b.stats!.hotStreak !== a.stats!.hotStreak) {
      return b.stats!.hotStreak - a.stats!.hotStreak;
    }
    return a.stats!.coldStreak - b.stats!.coldStreak;
  });

  const allEqual = sorted.every(
    (s) =>
      s.stats!.hotStreak === sorted[0]!.stats!.hotStreak &&
      s.stats!.coldStreak === sorted[0]!.stats!.coldStreak,
  );

  if (allEqual) {
    return sorted
      .toSorted((a, b) => a.name.localeCompare(b.name))
      .map((s) => Object.assign({}, s, { rank: 0 }) as RankedStation);
  }

  return sorted.map((station, _, arr) => {
    const rank =
      arr.filter(
        (s) =>
          s.stats!.hotStreak > station.stats!.hotStreak ||
          (s.stats!.hotStreak === station.stats!.hotStreak &&
            s.stats!.coldStreak < station.stats!.coldStreak),
      ).length +
      arr.filter(
        (s) =>
          s.stats!.hotStreak === station.stats!.hotStreak &&
          s.stats!.coldStreak === station.stats!.coldStreak,
      ).length;
    return Object.assign({}, station, { rank }) as RankedStation;
  });
};
