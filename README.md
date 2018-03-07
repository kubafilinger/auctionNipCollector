# auctionNipCollector
Collecting information about sellers on the basis of an auction and krs

###URL do wyszukiwarki:

https://allegro.pl/listing?string=iphone%20apple&p=2&offerTypeBuyNow=1&vat_invoice=1

`string` - szukany produkt ( w tym przypadku `iphone apple`)

`p` - numer strony

`offerTypeBuyNow` - tylko kup teraz

`vat_invoice` - tylko te za ktore jest faktura vat

###Za pomocą konsoli chrome generujemy JSON z lista produktów: 
`JSON.stringify(window.__listing_ItemsStoreState)`

###Wystarczy ustawic nagłowek 
`Accept: application/vnd.opbox-web.v2+json`

i mamy juz objekt json

Wynik zapisujemy bo potem bedziemy na nim operować w celu pozyskania ID sprzedawcy


###Informacje o sprzedawcy

Znalezione id wklejamy w ten link: http://allegro.pl/company_icon_get_data_ajax.php?user=28121665

Dostajemy informacje: **adres**, **regon**, **nip**, krs (nie zawsze)

##Dane fimy z KRS

http://www.krs-online.com.pl/?p=25&lookn=5540090995

`lookn` - numer NIP

Trzeba wyszukac wszystkie linki w div zaraz pod form w div id="main"


##Dane z API mojepanstwo.pl
https://api-v3.mojepanstwo.pl/dane/krs_podmioty.json?conditions[krs_podmioty.nip]=5540090995

dostajemy zwrotnie JSONa z danymi tej firmy, ktore zapisujemy do bazdy danych