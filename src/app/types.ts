export interface Base<T> {
  code: number;
  message: string;
  data?: T;
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

interface LoginType {
  user: Hero;
  token: string;
}

export interface LoginArg {
  name: string;
  password: string;
}
