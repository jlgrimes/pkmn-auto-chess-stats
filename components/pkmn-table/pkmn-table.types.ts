export type PokemonTableEntry = {
  index: string;
  name: string;
  abilityName: string;
  abilityPower: number;
  tier: number;
  types: string[];
  hp: number;
  attack: number;
  defense: number;
  specialDefense: number;
  maxTier: number;
};

export type Pokemon = {
  index: string;
  name: string;
  category: string;
  tier: number;
  additionalPick: string;
  type1: string;
  type2: string;
  type3: string;
  type4: string;
  bst: number;
  hp: number;
  attack: number;
  defense: number;
  specialDefense: number;
  attackRange: number;
  maxPP: number;
  ability: string;
  family: string;
  familyType1: string;
  familyType2: string;
  familyType3: string;
  familyType4: string;
  duo: string;
  regional: string;
  numStages: string;
};

export type PkmnTableSort = {
  by: keyof Pokemon;
  order: 'asc' | 'desc';
};
