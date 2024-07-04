# Frontend del Sistema di Gestione Ferie e Permessi

Questo progetto rappresenta il frontend di un'applicazione per la gestione delle ferie e dei permessi dei dipendenti di un'azienda. È sviluppato in Angular e si interfaccia con il backend tramite API RESTful.

## Tecnologie Utilizzate
- Angular
- TypeScript
- HTML/CSS
- RxJS
- Bootstrap (o un altro framework CSS)

## Prerequisiti
- Node.js e npm (Node Package Manager)
- Angular CLI

## Configurazione
1. Clona il repository sul tuo ambiente locale.
2. Esegui `npm install` per installare tutte le dipendenze.
3. Configura i servizi nel frontend per collegarsi agli endpoint corrispondenti nel backend (`AuthService`, `FerieService`, `PermessoService`, etc.).

## Avvio dell'Applicazione
- Esegui `ng serve` per avviare l'applicazione frontend. Naviga su `http://localhost:4200/` per visualizzare l'applicazione nel browser.

## Funzionalità Principali
- **Login e Registrazione**
  - Utilizza il servizio `AuthService` per effettuare il login e la registrazione degli utenti.

- **Gestione delle Ferie**
  - Utilizza il servizio `FerieService` per visualizzare, aggiungere, approvare e rifiutare le richieste di ferie.

- **Gestione dei Permessi**
  - Utilizza il servizio `PermessoService` per visualizzare, aggiungere, approvare e rifiutare le richieste di permessi.

- **Gestione degli Utenti**
  - Utilizza il servizio `UserService` per visualizzare l'elenco degli utenti e gestire le loro informazioni.

## Struttura del Progetto
- `src/app/components`: Contiene i componenti Angular per le diverse funzionalità dell'applicazione.
- `src/app/services`: Contiene i servizi Angular per la comunicazione con il backend.
- `src/app/interfaces`: Contiene le interfacce TypeScript per rappresentare i dati trasferiti tra frontend e backend.


## Test degli Account
Per testare l'applicazione, puoi utilizzare i seguenti account di prova:

- **ADMIN**: 
  - Email: `admin_user@example.com`
  - Password: `admin1`
  
- **Dipendente creato dall'admin**: 
  - Email: `userByAdmin@test.com`
  - Password: `User1`
  
  È l'admin a creare le credenziali per i dipendenti.

## Link Repository Backend
Il repository del backend può essere trovato al seguente link: [EasyHR_Back Repository](https://github.com/yourusername/EasyHR_Back)

Per ulteriori dettagli sugli endpoint disponibili e sugli schemi delle richieste e delle risposte del backend, consulta la [documentazione API su Postman](https://documenter.getpostman.com/view/33267926/2sA3dyhApC).