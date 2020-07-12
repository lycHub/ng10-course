export type Direction = 'left' | 'right';
export interface TransferItem {
  checked: boolean;
  key: string;
  value: string;
  direction?: Direction;
}
