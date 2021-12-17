import { Platform } from "./types";
export interface Cmd {
  id: number;
  howTo: string;
  command: string;
}
export interface User {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  Platforms: Array<Platform>;
}
export interface CreatePlatform {
  name: string;
  commands?: Array<Cmd>;
}

export interface CreateContact {
  firstname: string;
  lastname: string;
  phoneNumbers: Array<string>;
}

export interface PlatformState {
  platforms: Array<Platform>;
  loading: boolean;
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
  Platforms: PlatformState;
  User: UserState;
  Contacts: ContractsState;
}

export interface CreateSnippet {
  howTo: string;
  command: string;
  platform: string;
}
export interface CreateCmd {
  howTo: string;
  command: string;
  platformId: string;
}

export interface CreatePlatform {
  name: string;
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
  firstname: string;
  lastname: string;
  phoneNumbers: Array<string>;
}
