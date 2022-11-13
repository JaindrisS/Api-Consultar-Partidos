export interface Team {
  name: string;
  status?: boolean;
  games: Array<Games>;
}

export interface Games {
  rival: string;
  goalsConceded: number;
  goalsScored: number;
  date: Date;
  points: number;
}
