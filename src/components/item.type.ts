export const itemTypes = [
  "selles",
  "dejoune",
  "dodo",
  "reveil",
  "sortie",
  "biberon",
  "goûter",
] as const;

export const itemTypeBackgroundColors = {
  selles: "bg-green-200",
  dejoune: "bg-yellow-200",
  dodo: "bg-blue-200",
  reveil: "bg-red-200",
  sortie: "bg-purple-200",
  biberon: "bg-pink-200",
  goûter: "bg-orange-200",
} as const;

export type ItemType = typeof itemTypes[number];

export type Item = {
  id: string;
  type: ItemType;
  time: string;
  biberonSize?: string;
};
