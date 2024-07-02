export interface Ferie {
  id: number;         // Identificatore univoco delle ferie
  userId: number;     // Identificatore dell'utente a cui appartengono le ferie
  dataInizio: string; // Data di inizio delle ferie (formato stringa)
  dataFine: string;   // Data di fine delle ferie (formato stringa)
  motivo: string;     // Motivo delle ferie
  stato: string;      // Stato delle ferie (Approvata, Rifiutata, In attesa, ecc.)
}
