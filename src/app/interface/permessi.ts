export interface Permessi {
  id: number;         // Identificatore univoco del permesso
  userId: number;     // Identificatore dell'utente a cui appartiene il permesso
  dataInizio: string; // Data di inizio del permesso (formato stringa)
  dataFine: string;   // Data di fine del permesso (formato stringa)
  motivo: string;     // Motivo del permesso
  stato: string;      // Stato del permesso (Approvato, Rifiutato, In attesa, ecc.)
}
