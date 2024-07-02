export interface UserDTO {
  username: string;   // Nome utente dell'utente
  email: string;      // Indirizzo email dell'utente
  password: string;   // Password dell'utente
  nome: string;       // Nome dell'utente
  cognome: string;    // Cognome dell'utente
  isAdmin?: boolean;  // Flag che indica se l'utente è un amministratore (opzionale)
}
