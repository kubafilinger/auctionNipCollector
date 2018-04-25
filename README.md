# auctionNipCollector
Program powstał w celu realizacji części zadania z Hackathonu Hackyeah 2017 realizowanym w Krakowie.

###Cel
Celem programu jest kolekcjonowanie produktów z portali aukcyjnych (głównie Allegro, ponieważ udostępnia łatwe w obsłudze endpointy), oraz zbieranie informacji o sprzedawcach. Z portali aukcyjnych pobierany jest numer NIP sprzedawcy, a po nim odbywają sie zapytania do KRS w celu uzyskania większej ilości informacji.

###Instalacja i przygotowanie środowiska
Wymagany jest **node.js** oraz **npm** do poprawnego uruchomienia programu (obie rzeczy instalujemy pobierając plik instalacyjny ze strony [https://nodejs.org/en/])

Gdy mamy zainstalowanego **node.js** to uruchamiamy:
```
npm install
```
Spowoduje to zainstalowanie potrzebnych paczek, dzieki którym program może działać. 

Teraz musimy otworzyć config.js i podać dane do mysql. Tworzymy baze danych o nazwie takiej jak podamy w konfiguracji.

###Uruchomienie i instalacja bazy danych

Następnie uruchamiamy program do update database:
```$xslt
node ./sync.js
```

Teraz jesteśmy już przygotowani do uruchomienia aplikacji i zbierania danych!
```$xslt
node ./app.js  keyword
```

Jako `keyword` podajemy słowo, po którym program będzie wyszukiwał produkty. Aplikacja będzie zbierać dane i zapisywac do bazy danych do momentu, aż zakończy poszukiwania lub zostanie przerwana.

###Plany rozwojowe
1. Zwiększenie liczby bibliotek do pobierania informacji o produktach oraz sprzedawcach (w tej chwili są tylko dwie: allegro oraz mojepanstwo.pl)
2. Stworzenie interfejsów dla bibliotek, aby każda biblioteka do serwisu aukcyjnego oraz do informacji KRS miała te same metody.