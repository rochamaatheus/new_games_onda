import type { HouseName, Response } from '../types';

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

/**
 * Algoritmo do "Banquete de Seleção": 
 * Redistribui todos os participantes garantindo que as equipes tenham o mesmo número de pessoas,
 * mas respeitando ao máximo as preferências (scores) de cada um.
 */
export const redistributeHouses = (responses: Response[]): Response[] => {
  const houseNames: HouseName[] = ['AGOLGO', 'FILINI', 'KALIDA', 'PERIPOU', 'KONIPAK', 'OCTANI'];
  const total = responses.length;
  if (total === 0) return [];

  // Define o tamanho alvo de cada equipe
  const targetSize = Math.floor(total / houseNames.length);
  const extraSlotsCount = total % houseNames.length;

  const houseCapacities: Record<HouseName, number> = {
    AGOLGO: targetSize, FILINI: targetSize, KALIDA: targetSize, 
    PERIPOU: targetSize, KONIPAK: targetSize, OCTANI: targetSize
  };
  
  // Distribui os slots extras
  for (let i = 0; i < extraSlotsCount; i++) {
    houseCapacities[houseNames[i]]++;
  }

  // Ordena os participantes por "convicção" (quem tem a maior nota absoluta primeiro)
  // Isso ajuda a dar prioridade para quem "claramente" pertence a uma casa.
  const sortedParticipants = [...responses].sort((a, b) => {
    const aMax = Math.max(...(Object.values(a.full_scores || { AGOLGO: 0 }) as number[]));
    const bMax = Math.max(...(Object.values(b.full_scores || { AGOLGO: 0 }) as number[]));
    return bMax - aMax;
  });

  const currentHouseCounts: Record<HouseName, number> = {
    AGOLGO: 0, FILINI: 0, KALIDA: 0, PERIPOU: 0, KONIPAK: 0, OCTANI: 0
  };

  const redistributed: Response[] = [];

  sortedParticipants.forEach(participant => {
    const scores = participant.full_scores || {};
    
    // Lista de casas ordenada pela preferência do participante
    const preferences = (Object.entries(scores) as [HouseName, number][])
      .sort((a, b) => {
        if (b[1] !== a[1]) return b[1] - a[1];
        return Math.random() - 0.5; // Empate: 50/50
      })
      .map(entry => entry[0] as HouseName);

    // Se o participante não tiver scores por algum motivo, usa ordem aleatória
    const searchOrder = preferences.length > 0 ? preferences : [...houseNames].sort(() => Math.random() - 0.5);

    let assigned = false;
    for (const houseId of searchOrder) {
      if (currentHouseCounts[houseId] < houseCapacities[houseId]) {
        redistributed.push({ ...participant, house_id: houseId });
        currentHouseCounts[houseId]++;
        assigned = true;
        break;
      }
    }

    // Fallback de emergência (não deve acontecer com o cálculo de capacidade)
    if (!assigned) {
      for (const houseId of houseNames) {
        if (currentHouseCounts[houseId] < houseCapacities[houseId]) {
          redistributed.push({ ...participant, house_id: houseId });
          currentHouseCounts[houseId]++;
          assigned = true;
          break;
        }
      }
    }
  });

  return redistributed;
};
