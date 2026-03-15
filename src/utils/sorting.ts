import type { HouseName } from '../types';


export const calculateScores = (answers: Record<number, Partial<Record<HouseName, number>>>) => {
  const scores: Record<HouseName, number> = {
    AGOLGO: 0,
    FILINI: 0,
    KALIDA: 0,
    PERIPOU: 0,
    KONIPAK: 0,
    OCTANI: 0,
  };

  Object.values(answers).forEach((points) => {
    (Object.entries(points) as [HouseName, number][]).forEach(([house, value]) => {
      scores[house] += value;
    });
  });

  return scores;
};

export const findBestHouse = (
  scores: Record<HouseName, number>,
  houseCounts: Record<HouseName, number>
): HouseName => {
  // Sort houses by score descending
  const sortedHousesByScore = (Object.keys(scores) as HouseName[]).sort(
    (a, b) => scores[b] - scores[a]
  );

  const totalMembers = Object.values(houseCounts).reduce((a, b) => a + b, 0);
  const avgMembers = totalMembers / 6;

  // Find the first house that is not "over-filled"
  // Tolerance: a house can have up to 1 member more than the average before we consider it full
  for (const houseId of sortedHousesByScore) {
    if (houseCounts[houseId] <= avgMembers + 1) {
      return houseId;
    }
  }

  // Fallback: if all are balanced or we are in a tight spot, just pick the best score
  return sortedHousesByScore[0];
};
