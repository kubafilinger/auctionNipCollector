# auctionNipCollector
Collecting information about sellers on the basis of an auction and krs

###Instalacja i przygotowanie srodowiska
Wymagany jest **node.js** oraz **npm** do poprawnego uruchomienia programu (obie rzeczy instalujemy pobierając plik instalacyjny ze strony [https://nodejs.org/en/])

Najpierw musimy otworzyć config.js i podać dane do mysql. Tworzymy baze danych o nazwie takiej jak podamy w konfiguracji.

###Uruchomienie i instalacja bazy danych

Następnie uruchamiamy progam do update database:
```$xslt
node ./sync.js
```

Teraz jesteśmy już przygotowani do uruchomienia aplikacji i zbierania danych!
```$xslt
node ./app.js
```

Aplikacja będzie zbierać dane i zapisywac do bazy danych do momentu, aż zakończy poszukiwania lub zostanie przerwana

###Wątpliwości
- jak sensownie ograniczyć ilosc requestow aby nie zablokowalo aplikacji (glownie allegro)?
- czy nip BIGINT, czy STRING (bo wyszukiwanie, przy dodawaniu)?