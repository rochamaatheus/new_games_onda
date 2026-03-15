export type HouseName = 'AGOLGO' | 'FILINI' | 'KALIDA' | 'PERIPOU' | 'KONIPAK' | 'OCTANI';

export interface House {
  id: HouseName;
  name: HouseName;
  mascot: string;
  colors: string[];
  traits: string[];
  description: string;
}

export interface Question {
  id: number;
  text: string;
  options: {
    text: string;
    points: Partial<Record<HouseName, number>>;
  }[];
}

export interface Response {
  id?: string;
  name: string;
  house_id: HouseName;
  created_at?: string;
}
