# Mesterséges intelligencia alapú spam szűrőfejlesztés neuro-lingvisztikus megközelítéssel, PyTorch keretrendszerrel

## Absztrakt

-   A tanulmány bemutatja a PyTorch-alapú mesterséges intelligencia spam szűrő fejlesztését, melynek alapját a neuro-lingvisztikus megközelítések képezik, azaz a természetes nyelvi feldolgozás (NLP). Olyan modell került lefejlesztésre, mely segítségével könnyedén ki lehet szűrni a gyanúsnak tűnő üzeneteket.

## Bevezetés

-   A digitális kommunikáció mára már szinte elengedhetetlenné vált az emberek mindennapi életében. Sajnos ezzel párhuzamosan a spam üzenetek terjedése is exponenciálisan növekszik, ezzel kihívást állítva a rendszerekre, amelyek a nemkívánatos tartalmakat szűrik. Kritikus fontosságú, hogy az adott szoftver amit használunk az üzenetek küldésére és fogadására, az megbízhatóan szűrje azokat.
-   A tanulmány azt mutatja be, hogy hogyan alkalmazható a PyTorch keretrendszer és a természetes nyelvi feldolgozási megközelítések összehangoltan egy intelligens spam szűrő rendszer kialakítására. Képes felismerni és tanulni az általunk megadott bemeneti adatok alapján, hogy azok általános vagy épp gyanús üzeneteket jelentenek-e.

## Módszertan

### 1. Adatgyűjtés és előkészítés

-   Első és legfontosabb az adatgyűjtés, hiszen ez az alapja a mesterséges intelligenciának, ezek alapján tud tanulni. A gyűjtött adatok tartalmazzák a spam és nem spam kategóriák reprezentatív mintáit. Az adatforrás felépítése tartalmazza az üzenetet és a besorolást. A besorolás lehetséges értékei 0 és 1, ahol a 0-ás érték jelöli az általános üzenetet és az 1-es érték, hogy gyanús, vagyis spam üzenet.
-   Az adatok előkészítése során a felesleges részeit az üzenetnek el kell távolítani.
