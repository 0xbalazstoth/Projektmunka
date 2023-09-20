-   Email kliens fejlesztése, ahol lesz egy Fullstack webes alkalmazás (React, NodeJS, NoSQL MongoDB adatbázis) és egy cross-platform mobilalkalmazás (Flutter, Dart), ahol lesz egy AI scam szűrő, mely értesíti a felhasználót, hogy gyanús emailt talált.
    -   IMAP kliens
        -   https://www.npmjs.com/package/imapflow; https://www.npmjs.com/package/node-imap
        -   https://dev.to/heyvenatdev/how-internet-message-access-protocol-imap-works-in-node-js-1jh5
        -   https://emailengine.app/
        -   Először létrehozni "box"-okat (inbox, spam, stb), majd azokba rakni a beérkező leveleket.
-   Tulajdonképpen egy plusz réteg, mely megvédi a felhasználót a gyanús emailektől.
-   Az AI modell fejlesztése pytorch segítségével fog megtörténni, amely során adat gyűjtés is fontos szerepet játszik.
    -   https://www.kaggle.com/datasets/ozlerhakan/spam-or-not-spam-dataset/code?datasetId=91827&sortBy=voteCount
    -   https://github.com/OmkarPathak/Playing-with-datasets/blob/master/Email%20Spam%20Filtering/emails.csv
    -   Spam score header beállítása:
        ```
        X-Spam-Flag: YES
        X-Spam-Score: 999
        X-Spam-Level: *****
        X-Spam-Status: Yes
        ```
-   Felhasználói és fejlesztői dokumentációval.
-   Az alkalmazások közötti kommunikáció API-val lehetséges.
-   Környezet kiépítése.
-   Összehasonlítások elkészítése más-más email kliens szolgáltatókkal.
-   Egyéb ötletek:
    -   Több email szervert támogatna egyidőben

# Webalkalmazás

-   [ ] No-password autentikáció
    -   [ ] Regisztráció után, generál egy egyszer használatos kódot, amit össze kell kötni a mobilalkalmazással.
    -   [ ] Belépéskor csakis a mobilalkalmazás által generált kóddal lehet belépni.

# Mobilalkalmazás

-   [ ] Autentikátor
    -   [ ] Az egyszer használatos kóddal összekötve már tudja használni a fiókot.
    -   [ ] Kódot generál, ami 60 másodpercig érvényes.

# AI

-   [x] Scam AI
    -   [x] Flask API
-   [ ] Email:Jelszó / Felhasználónév:Jelszó detektáló AI
    -   [ ] Így csak úgy tudja elolvasni az aktuális felhasználó, ha kér egy új kódot, és azzal fel tudja oldani az emailt.

Ezek helyett:

-   Hálózati Technológiák
-   Programozási paradigmák és adatszerkezetek
-   Adatbázis és Big Data technológiák
-   Korszerű operációs rendszerek
-   Patronálás
