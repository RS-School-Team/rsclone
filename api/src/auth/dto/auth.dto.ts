export interface LoginDTO {
  email: string;
  password: string;
}

export interface RegisterDTO {
  email: string;
  name: { firstName: string; secondName: string };
  password: string;
  manager?: boolean;
}
