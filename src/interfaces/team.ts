export interface Team {
  name: string;
  games: Array<Games>;
}

interface Games {
  rival: string;
  goalsConceded: number;
  goalsScored: number;
  date: string;
  points: number;
}
