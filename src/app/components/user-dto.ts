// Esempio di UserDTO.ts in Angular
export interface UserDTO {
    username: string;
    email: string;
    password: string;
    nome: string;
    cognome: string;
    isAdmin?: boolean; // Opzionale, se hai bisogno di distinguere admin da altri utenti
    // Altri campi se necessario
  }
  