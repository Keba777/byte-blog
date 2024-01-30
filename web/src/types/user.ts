export interface User {
  username: string;
  email: string;
  password: string;
  profilePicture?: FileList;
}

export interface Credential {
  identifier: string;
  password: string;
}
