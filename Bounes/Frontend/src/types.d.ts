export interface Cmd {
  id: number;
  howTo: string;
  command: string;
}
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface CreateContact {
  firstname: string;
  lastname: string;
  phoneNumbers: Array<string>;
}

export interface ContactState {
  contacts: Array<Contact>;
  loading: boolean;
}
export interface UserState {
  loading: boolean;
  loggedIn: boolean;
  user: User;
  authToken: string;
}

export interface RootState {
  User: UserState;
  Contacts: ContractsState;
}

export interface patchObj {
  op: string;
  path: string;
  value: string;
}
export interface Login {
  email: string;
  password: string;
}
export interface Registration {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}
export interface Session {
  user: User;
  authToken: string;
}
export interface JWT {
  exp: number;
}

export interface Contact {
  id: number;
  firstName: string;
  lastname: string;
  phoneNumbers: Array<string>;
}
