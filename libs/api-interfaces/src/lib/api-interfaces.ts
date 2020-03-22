export interface Theme {
  id: number;
  name: string;
  answer: string;
  questions: string[];
}

export type ThemeDTO = Omit<Theme, 'id'>;
