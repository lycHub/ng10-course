export interface HeroArg {
  name: string;
  job: string;
  sort: 'desc' | 'asc';
}

export interface Hero {
  id: string;
  name: string;
  phone: number;
  createTime: number;
  gender: string;
  genderText: string;
  job: string;
  jobText: string;
  role: string;
  age?: number;
  email?: string;
  brief?: string;
}
