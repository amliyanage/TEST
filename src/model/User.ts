export interface User {
    id?: string;
    uid: string; 
    name: string; 
    given_name?: string; 
    middle_name?: string; 
    family_name?: string;
    nickname?: string; 
    email: string; 
    phone_number?: string;
    comment?: string;
    picture?: string;
    directory?: string;
    metadata?: { [key: string]: any };
    tags?: string[]; 
  }
  