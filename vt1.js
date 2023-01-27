"use strict";
//@ts-check 
// Joukkueen sarja on viite data.sarjat-taulukossa lueteltuihin sarjoihin
// Joukkueen rastileimausten rastit ovat viitteitä data.rastit-Objektissa oleviin rasteihin

// Kirjoita tästä eteenpäin oma ohjelmakoodisi


/**
  * Taso 1
  * Järjestää leimaustavat aakkosjärjestykseen 
  * isoilla ja pienillä kirjaimilla ei ole järjestämisessä merkitystä (case insensitive)
  * Alkuperäistä rakennetta ei saa muuttaa tai korvata vaan järjestäminen tehdään alkup. taulukon kopiolle.
  * Järjestetty lista leimaustavoista näkyy sivulla olevalla lomakkeella
  * @param {Array} leimaustavat-taulukko, jonka kopio järjestetään 
  * @return {Array} palauttaa järjestetyn _kopion_ leimaustavat-taulukosta
*/
function jarjestaLeimaustavat(leimaustavat) {
  let jarjLeimaustavat = Array.from(leimaustavat).sort( (a, b) => a.localeCompare(b));

  return jarjLeimaustavat; // tässä pitää palauttaa järjestetty kopio eikä alkuperäistä
}

/**
  * Taso 1
  * Järjestää sarjat aakkosjärjestykseen sarjan nimen perustella 
  * isoilla ja pienillä kirjaimilla ei ole järjestämisessä merkitystä (case insensitive)
  * Alkuperäistä rakennetta ei saa muuttaa tai korvata vaan järjestäminen tehdään alkup. taulukon kopiolle.
  * Järjestetetyt sarjat näkyvät sivulla olevalla lomakkeella
  * @param {Array} taulukko, jonka kopio järjestetään 
  * @return {Array} palauttaa järjestetyn _kopion_ sarjat-taulukosta
  */
function jarjestaSarjat(sarjat) {

  let jarjSarjat = Array.from(sarjat).sort( (a, b) => a.nimi.localeCompare(b.nimi));

 
  return jarjSarjat;  // tässä pitää palauttaa järjestetty kopio eikä alkuperäistä

}


/**
  * Taso 1
  * Lisää uuden sarjan ja palauttaa tiedon onnistuiko lisääminen vai ei
  * Sarja lisätään vain jos kaikki seuraavat ehdot täyttyvät:
  *  - Toista samannimistä sarjaa ei ole olemassa. Nimien vertailussa
  *    ei huomioida isoja ja pieniä kirjaimia tai nimen alussa ja lopussa välilyöntejä etc. (whitespace). Nimien vertailu on siis caseinsensitive.
  *    sarjan nimi ei voi olla pelkkää whitespacea. 
  * - Sarjan keston täytyy olla kokonaisluku ja suurempi kuin 0
  * - Sarjan uniikki id on luotava seuraavalla tavalla: Käy läpi kaikki sarjat ja etsi suurin id, lisää tähän 1
  *  Uusi sarja tallennetaan sarjat-taulukkoon. Sarjan on oltava seuraavaa muotoa:
  *  {
  *     "id": {Number}, // Jokaisella sarjalle oleva uniikki kokonaislukutunniste, pakollinen tieto
  *     "nimi": {String}, // Sarjan uniikki nimi, pakollinen tieto
  *     "kesto": {Number}, // sarjan kesto tunteina, pakollinen tieto
  *     "alkuaika": {String}, // Sarjan alkuaika, oletuksena ""
  *     "loppuaika": {String}, // Sarjan loppuaika, oletuksena ""
  *     "joukkueet": {Array}, // Taulukko sarjaan kuuluvista joukkueista. Oletuksena tyhjä taulukko []
  *  }
  * Tätä funktiota voi kokeilla, kun lisää sivulla olevalla lomakkeella uuden sarjan
  * @param {Array} sarjat - taulukko johon sarja lisätään 
  * @param {String} nimi - Lisättävän sarjan nimi
  * @param {String} kesto - Sarjan kesto merkkijonona
  * @param {String} alkuaika - Sarjan alkuaika, ei pakollinen
  * @param {String} loppuaika - Sarjan loppuaika, ei pakollinen
  * @return {Boolean} palauttaa true, jos sarja lisättiin tai false, jos lisäämistä ei tehty
  */
function lisaaSarja(sarjat, nimi, kesto, alkuaika, loppuaika) {

  // Tsekataan onko nimi ja kesto täytetty tai onko nimi sama kuin 
  // sarjat listassa  
  if ( !kesto ) {
    return false;
  }

  for (let s of sarjat) {
    if (nimi == s.nimi || !nimi) {
      console.log("EI SAMANNIMISIÄ TAI TYHJÄÄ");
      return false;
    }
  }
  
  //Luodaan id joka ei ole sama mitä muilla sarjoilla on
  function id(sarjat){
  
    let maxValue = sarjat[0].id;
    for (let sarja of sarjat) {
      if(sarja.id > maxValue) {
        maxValue = sarja.id;
    }   
  }  return maxValue+1;
      
  }
  // Luodaan uusi sarjaobjekti johon liitetään syötetyt tiedot
  let uusisarja = {
    "nimi": nimi,
    "kesto": parseInt(kesto),
    "alkuaika": alkuaika,
    "loppuaika": loppuaika,
    "id": id(sarjat),
    "joukkueet": []
  };
  
  
  // Pushataan uusi sarja olemassaoleviin sarjoihin 
 sarjat.push(uusisarja);
  return true;
  

}

/**
  * Taso 1
  * Poistaa joukkueen id:n perusteella data-rakenteesta ja palauttaa muuttuneen datan
  * @param {Object} joukkueet - taulukko josta joukkue poistetaan
  * @param {String} id - poistettavan joukkueen id
  * @return {Boolean} true, jos poisto onnistui tai false, jos poistettavaa joukkuetta ei löytynyt
  */
function poistaJoukkue(joukkueet, id) {
  let index = -1;
  //Käydään rakenne läpi ideen perustella ja jos löytyy sama id merkitään se indeksi
  for (let i in joukkueet) {
      if (joukkueet[i].id == id) {
          index = i;
         
      }
      if (index > -1) {
        joukkueet.splice(index, 1);
        return true;
    }
  }


  return false;

 
}

/**
  * Taso 3
  * Järjestää rastit taulukkoon aakkosjärjestykseen rastikoodin perustella siten, että 
  * numeroilla alkavat rastit ovat kirjaimilla alkavien jälkeen. 
  * isoilla ja pienillä kirjaimilla ei ole järjestämisessä merkitystä (case insensitive)
  * @param {Object} rastit - Objekti, jonka sisältämistä rastiobjekteista muodostetaan järjestetty taulukko
  * @return {Array} palauttaa järjestetyn taulukon, joka sisältää kaikki rastiobjektit. Rastiobjektit ovat muotoa:
                                                     {
                                                        "id": rastit-objektissa käytetty kunkin rastiobjektin avain
                                                        "koodi": rastikoodi merkkijonona
                                                        "lat:: latitude liukulukuna
                                                        "lon": longitude liukulukuna
                                                     } 
  */
function jarjestaRastit(rastit) {

  let numerolliset = [];
  let kirjaimelliset = [];

  // Etsitään rastit jotka alkavat kirjaimella ja ne jotka alkavat
  // numerolla. Lisätään ne omiin taulukoihin 
  for (let j in rastit) {
    if (isNaN(rastit[j].koodi.charAt(0))) {
      kirjaimelliset.push(rastit[j]);
     
    } else {
      numerolliset.push(rastit[j]);
    
    }
  }



 // Sortataan kirjaimella alkavat koodit erikseen
  kirjaimelliset.sort((a, b) => a.koodi.localeCompare(b.koodi));

 // Sortataan numerolla alkavat koodit erikseen
  numerolliset.sort((a,b) => a.koodi.localeCompare(b.koodi));
 
  // Yhdistetään kirjaimella ja numerolla alkavat koodit 
  let jarjestetytrastit = kirjaimelliset.concat(numerolliset);

  let jarjrastit = [];
 // Luodaan rastit haluttuun muotoon uusina objekteina
  for (let i in jarjestetytrastit) {
    let uusirasti = {
      "id": i,
      "koodi": jarjestetytrastit[i].koodi,
      "lat": jarjestetytrastit[i].lat,
      "lon": jarjestetytrastit[i].lon
    };
    // Pushataan jokainen oikeassa muodossa oleva rasti listaan
    jarjrastit.push(uusirasti);
    
  }
 
 // Palautetaan lista joka on järjestetty 
 return jarjrastit;

}


/**
  * Taso 3
  * Lisää joukkueen data-rakenteeseen ja palauttaa muuttuneen datan
  * Joukkue lisätään vain jos kaikki seuraavat ehdot täyttyvät:
  *  - Toista samannimistä joukkuetta ei ole olemassa. Nimien vertailussa
  *    ei huomioida isoja ja pieniä kirjaimia tai nimen alussa ja lopussa välilyöntejä etc. (whitespace). Nimien vertailu on siis caseinsensitive.
  *    Joukkueen nimi ei voi olla pelkkää whitespacea. 
  *  - Leimaustapoja on annettava vähintään yksi kappale. Leimaustapojen
  *     on löydyttävä data.leimaustavat-taulukosta
  *  - Jäseniä on annettava vähintään kaksi kappaletta. 
  *  - Saman joukkueen jäsenillä ei saa olla kahta samaa nimeä (caseinsensitive)
  *  - Sarjan id, jota vastaava sarja on löydyttävä data.sarjat-objektin sarjoista
  *
  *  Uusi joukkue tallennetaan data.joukkueet-taulukkoon. Joukkueen on oltava seuraavaa muotoa:
  *  {
  *     "id": {Number}, // jokaisella joukkueella oleva uniikki kokonaislukutunniste
  *     "nimi": {String}, // Joukkueen uniikki nimi
  *     "jasenet": {Array}, // taulukko joukkueen jäsenien nimistä
  *     "leimaustapa": {Array}, // taulukko joukkueen leimaustapojen indekseistä (kts. data.leimaustavat)
  *     "rastileimaukset": {Array}, // taulukko joukkueen rastileimauksista. Oletuksena tyhjä eli []
  *     "sarja": {Object}, // viite joukkueen sarjaan, joka löytyy data.sarjat-taulukosta
  *     "pisteet": {Number}, // joukkueen pistemäärä, oletuksena 0
  *     "matka": {Number}, // joukkueen kulkema matka, oletuksena 0
  *     "aika": {String}, // joukkueen käyttämä aika "h:min:s", oletuksena "00:00:00"
  *  }
  * @param {Object} Objekti, jonka joukkueet-taulukkoon joukkue lisätään 
  * @param {String} nimi - Lisättävän joukkueen nimi
  * @param {Array} leimaustavat - Taulukko leimaustavoista
  * @param {String} sarja - Joukkueen sarjan id-tunniste
  * @param {Array} jasenet - joukkueen jäsenet
  * @return {Object} palauttaa aluperäisen datan
  */
function lisaaJoukkue(data, nimi, leimaustavat, sarja, jasenet) {

  //Apufunktio tarkistamaan onko syötetty kaksi samannimistä jäsentä.
  function checkDuplicates(arra) {
    return new Set(arra).size !== arra.length;
  }

  // Tarkistetaan onko nimi tyhjä
  if ( !nimi.trim().toLowerCase() ) {
    console.log("Nimi täytyy lisätä");
    return data;
  }

  // Tarkistetaan että edes yksi leimaustapa on valittu
  if (leimaustavat.length === 0) {
    console.log("Vähintään yksi leimaustapa pitää olla!");
    return data;
  }

  if (jasenet.length === 0 || jasenet.length === 1) {
    console.log("Liian vähän jäseniä, vähintään 2 pitää lisätä");
    return data;
  }

  // Tarkistetaan onko samannimisiä jo
  for (let j of data.joukkueet) {
    if (nimi.trim().toLowerCase() == j.nimi) {
      console.log("Samanniminen on jo!");
      return data;
    }
  }

  if (checkDuplicates(jasenet) === true) {
    console.log("Et voi lisätä kahta samannimistä jasenta!");
    return data;
  }

  
  
  console.log(sarja);
 
  function oikeasarja(data) {
    let oikea = "";
    for ( let s of data.sarjat) {
      if (sarja == s.id) {
        oikea = s;
      } 
    }
    return oikea;
  }

  // Etsitään oikeat indexit data.leimaustavat 
  function oikeatleimaustavat(data) {
    let oikee = [];
    for ( let l of data.leimaustavat) {
      for ( let ll of leimaustavat) {
        if (ll == l) {
          oikee.push(data.leimaustavat.indexOf(l));
        }
      }
    }
   
    return oikee;
  }
  
  // Id generointi
  function id(data){
  
    let maxValue = data.joukkueet[0].id;
    for (let jj of data.joukkueet) {
      if(jj.id > maxValue) {
        maxValue = jj.id;
    }   
  }  return maxValue+1;
      
  }

  // Poistetaan tyhjä jasen listasta
  let siistitytjasenet = jasenet.filter(item => item);
  
  
  // UUSI JOUKKUE
  let uusijoukkue = {
    "id": id(data),
    "nimi": nimi,
   "jasenet": siistitytjasenet,
    "leimaustapa": oikeatleimaustavat(data),
    "rastileimaukset": [],
    "sarja": oikeasarja(data),
    "pisteet": 0,
    "matka": 0,
    "aika": "00:00:00"
  };
  
  

  
  data.joukkueet.push(uusijoukkue);
  return data;

}


/**
  * Taso 3
  * Laskee joukkueen käyttämän ajan. Tulos tallennetaan joukkue.aika-ominaisuuteen.
  * Käytä merkkijonoa, jossa aika on muodossa "hh:mm:ss". Esim. "07:30:35"
  * Jos aikaa ei kyetä laskemaan, funktio palauttaa tyhjän merkkijonon ""
  * Aika lasketaan viimeisestä (ajan mukaan) LAHTO-rastilla tehdystä leimauksesta alkaen aina
  * ensimmäiseen (ajan mukaan) MAALI-rastilla tehtyyn leimaukseen asti. Leimauksia jotka tehdään
  * ennen viimeistä lähtöleimausta tai ensimmäisen maalileimauksen jälkeen ei huomioida.
  * @param {Object} joukkue
  * @return {Object} joukkue
  */
function laskeAika(joukkue) {

  let rastit = joukkue.rastileimaukset;


  // Järjestetään rastileimaukset ajan mukaan nousevaan järjestyksen
  let jarjleimaukset = Array.from(rastit).sort( (a, b) => a.aika.localeCompare(b.aika));

  // Tehdään tyhjä taulukko johon lisätään ajat ja koodit
  let ajat = [];
  for (let j of jarjleimaukset) {
    // Hypätään niiden rastileimausten ohi joissa puuttuvia tietoja
    if (j.rasti === undefined || j.rasti.lat === undefined)
    {
      
      continue;
    }

   let u = [];
   //Lisätään aika ja koodi tyhjään taulukkoon
   u.push(j.aika);
   u.push(j.rasti.koodi);
   // Lisätään taulukko ajat taulukkoon
   ajat.push(u);
  }
  let lahto = "";
  let maali = "";
  // Jos rastileimauksia on nolla ajaksi lisätään "00:00:00"
  if (ajat.length === 0) {
    joukkue.aika ="00:00:00";
    return joukkue;
  } else if (ajat.length > 0){
    // Käydään läpi kaikki ajat
    for (let i = 0; i < ajat.length; i++) {
      // Jos tarkasteltava koodi on "LAHTO" ja seuraava koodi on "LAHTO" siirrytään seuraavaan
      if (ajat[i][1] === "LAHTO" && ajat[i+1][1] === ajat[i][1]) {
        continue;
      } 
      //Jos tarkasteltava koodi on "LAHTO" ja seuraava koodi ei ole "LAHTO" lisätään 
      //tarkasteltava aika lahto:ön
      else if (ajat[i][1] === "LAHTO" && ajat[i+1][1] != ajat[i][1]) {
  
        lahto = ajat[i][0];
        continue;
        // Jos tarkasteltava koodi on "MAALI" lisätään tarkasteltava
        // aika maali:in ja lopetetaan aikojen läpikäyminen
      } else if (ajat[i][1] === "MAALI" && lahto.length > 0) {
        maali = ajat[i][0];
        break;
      }
     

    }
    // Muutetaan lahto ja maaliajat Date muotoon
    let lahtoaika = new Date(lahto);
    let maaliaika = new Date(maali);
    //Lasketaan erotus ajoista
    let aika = ((maaliaika.getTime() - lahtoaika.getTime()));
 
    // Muutetaan aika tunneiksi, minuuteiksi ja sekunneiksi
    let hours = `0${new Date(aika).getHours() -2}`.slice(-2);
    let minutes = `0${new Date(aika).getMinutes()}`.slice(-2);
    let seconds = `0${new Date(aika).getSeconds()}`.slice(-2);
  
    let lopullinenaika = `${hours}:${minutes}:${seconds}`;
 
    joukkue.aika = lopullinenaika;
 
  }
 
  return joukkue;
}


/**
  * Taso 3 ja Taso 5
  *  Järjestää joukkueet järjestykseen haluttujen tietojen perusteella
  *  järjestetään ensisijaisesti kasvavaan aakkosjärjestykseen 
  *  mainsort-parametrin mukaisen tiedon perusteella. mainsort voi olla joukkueen nimi, sarjan nimi, matka, aika tai pisteet
  *  Järjestäminen on tehtävä alkuperäisen taulukon kopiolle. Alkuperäistä ei saa muuttaa tai korvata.
  *  Joukkueen jäsenet järjestetään aina aakkosjärjestykseen. Alkuperäisen joukkueobjektin jäsenten järjestys ei saa muuttua.
  *  Joukkueen leimaustavat järjestetään myös aina aakkosjärjestykseen leimaustapojen nimien mukaan
  *  Isoilla ja pienillä kirjaimilla ei ole missään järjestämisissä merkitystä (case insensitive) eikä myöskään alussa tai lopussa olevalla whitespacella. Vertailu on siis caseinsensitive.
  *  sortorder-parametrin käsittely vain tasolla 5
  *  jos sortorder-parametrina on muuta kuin tyhjä taulukko, käytetään 
  *  sortorderin ilmoittamaa järjestystä eikä huomioida mainsort-parametria: 
  *  ensisijaisesti järjestetään taulukon ensimmäisen alkion tietojen perusteella, 
  *  toissijaisesti toisen jne.
  *  sortorder-taulukko sisältää objekteja, joissa kerrotaan järjestysehdon nimi (key),
  *  järjestyssuunta (1 = nouseva, -1 = laskeva) ja järjestetäänkö numeerisesti (true)
  *  vai aakkosjärjestykseen (false)
  *  Toteuta sortorder-taulukon käsittely siten, että taulukossa voi olla vaihteleva määrä rivejä
  *  Sarja täytyy huomioida erikoistapauksena
  *	 sortorder = [
  *	 {"key": "sarja", "order": 1, "numeric": false},
  *	 {"key": "nimi", "order": 1, "numeric": false},
  *	 {"key": "matka", "order": -1, "numeric": true},
  *	 {"key": "aika", "order": 1, "numeric": false},
  *	 {"key": "pisteet", "order": -1, "numeric": true}
  *	]
  * @param {Object} data - tietorakenne, jonka data.joukkueet-taulukko järjestetään 
  * @param {String} mainsort - ensimmäinen (ainoa) järjestysehto, joka voi olla nimi, sarja, matka, aika tai pisteet  TASO 3
  * @param {Array} sortorder - mahdollinen useampi järjestysehto TASO 5
  * @return {Array} palauttaa järjestetyn ja täydennetyn _kopion_ data.joukkueet-taulukosta
  */
function jarjestaJoukkueet(data, mainsort="nimi", sortorder=[] ) {
  
  
  let jarjouk = Array.from(data.joukkueet);
   console.log(sortorder["key"]);

function sortByThenBy(array, keys) {
  return array.sort(function (a,b) {
    let r;
    // Käydään sortorderin alkiot läpi järjestyksessä ja tsektaan
    // Onko sarja, jos ei onko string vai number ja mikä order on ja sen mukaan
    //sortataan
    keys.some(function (k) {
      if (k.key == "sarja" && k.order == 1) {
        console.log("SARJASORT1");
        r = a.sarja.nimi.localeCompare(b.sarja.nimi);
        return r;
      }
      if (k.key == "sarja" && k.order == -1) {
        console.log("SARJASORT-1");
        r = b.sarja.nimi.localeCompare(a.sarja.nimi);
        return r;
      }
      if (k.order == 1 && k.numeric == false) {
        console.log(a[k.key]);
      r = a[k.key].localeCompare(b[k.key]);
      console.log(r);
      return r;
      } 
      if (k.order == -1 && k.numeric == false) {
        console.log(a[k.key]);
        r = b[k.key].localeCompare(a[k.key]);
        console.log(r);
        return r;
      }
      if (k.order == 1 && k.numeric == true) {
        console.log("PISTEET");
        r= a[k.key] - b[k.key];
        return r;
      }
      if (k.order == -1 && k.numeric == true) {
        console.log("PISTEET-1");
        r= b[k.key] - a[k.key];
        return r;
      }
      
    });
    return r;
  });
 }
let jarjestauudelleen = sortByThenBy(jarjouk, sortorder);
    
  return jarjestauudelleen;
}

/**
  * Taso 5
  * Laskee joukkueen kulkeman matkan. Matka tallennetaan joukkue.matka-ominaisuuteen liukulukuna
  * Laske kuinka pitkän matkan kukin joukkue on kulkenut eli laske kunkin rastivälin
  * pituus ja laske yhteen kunkin joukkueen kulkemat rastivälit. Jos rastille ei löydy
  * sijaintitietoa (lat ja lon), niin kyseistä rastia ei lasketa matkaan mukaan. Matka
  * lasketaan viimeisestä LAHTO-rastilla tehdystä leimauksesta alkaen aina
  * ensimmäiseen MAALI-rastilla tehtyyn leimaukseen asti. Leimauksia jotka tehdään
  * ennen lähtöleimausta tai maalileimauksen jälkeen ei huomioida.
  * Käytä annettua apufunktiota getDistanceFromLatLonInKm
  * @param {Object} joukkue
  * @return {Object} joukkue
  */
function laskeMatka(joukkue) {

  let rastit = joukkue.rastileimaukset;

  let jarjleimaukset = Array.from(rastit).sort( (a, b) => a.aika.localeCompare(b.aika));


  let koordinaatit = [];
  
 
  if (jarjleimaukset.length === 0) {
    joukkue.matka ="0";
    return joukkue;
  } else if (jarjleimaukset.length > 0){
    for (let i = 0; i < jarjleimaukset.length; i++) {
      // Poistetaan taulukosta turhat rastileimaukset
      if (jarjleimaukset[i].rasti === undefined || jarjleimaukset[i].rasti.koodi === undefined){
        jarjleimaukset.splice(i, 1);
        continue;
      }
      // Poistetaan taulukosta edellinen LAHTO leimaus jos niitä on kaksi peräkkäin
       else if (jarjleimaukset[i].rasti.koodi === "LAHTO" && jarjleimaukset[i+1].rasti.koodi === jarjleimaukset[i].rasti.koodi) {
        jarjleimaukset.splice(i,1);
        continue;
      } 
      // Poistetaan MAALI leimauksen jälkeinen leimaus taulukosta
      else if (jarjleimaukset[i].rasti.koodi === "MAALI") {
        let index = i+1;
        jarjleimaukset.splice(index,1);
      }
    

    }
   
  }
 
  for (let k of jarjleimaukset) {
    let u = [];
    u.push(k.rasti.lat);
    u.push(k.rasti.lon);
    koordinaatit.push(u);
  }
  let matka = "";
  // Käydään koordinaatit läpi ja apufunktion avulla lasketaan
  //etäisyys jokaisen rastin välissä
  for (let e = 0; e < koordinaatit.length-1; e++) {
    matka += getDistanceFromLatLonInKm(koordinaatit[e], koordinaatit[e+1]);
    matka = Math.round(matka * 10) / 10;
   
   }

   // Pyöristetään kokonaislukuun 
   joukkue.matka = Math.round(matka);
	
  
  return joukkue;
}


// apufunktioita tasolle 5
/**
  * Laskee kahden pisteen välisen etäisyyden
  */
 function getDistanceFromLatLonInKm(koor1, koor2) {
  let lat1 = koor1[0];
  let lon1 = koor1[1];
  let lat2 = koor2[0];
  let lon2 = koor2[1];
  let R = 6371; // Radius of the earth in km
  let dLat = deg2rad(lat2-lat1);  // deg2rad below
  let dLon = deg2rad(lon2-lon1);
  let a =
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ;
  let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  let d = R * c; // Distance in km
  return d;
}
/**
   Muuntaa asteet radiaaneiksi
  */
function deg2rad(deg) {
  return deg * (Math.PI/180);
}

/**
  * Taso 5
  * Laskee joukkueen saamat pisteet. Pistemäärä tallennetaan joukkue.pisteet-ominaisuuteen
  * Joukkue saa kustakin rastista pisteitä rastin koodin ensimmäisen merkin
  * verran. Jos rastin koodi on 9A, niin joukkue saa yhdeksän (9) pistettä. Jos rastin
  * koodin ensimmäinen merkki ei ole kokonaisluku, niin kyseisestä rastista saa nolla
  * (0) pistettä. Esim. rasteista LÄHTÖ ja F saa 0 pistettä.
  * Samasta rastista voi sama joukkue saada pisteitä vain yhden kerran. Jos
  * joukkue on leimannut saman rastin useampaan kertaan lasketaan kyseinen rasti
  * mukaan pisteisiin vain yhden kerran.
  * Rastileimauksia, jotka tehdään ennen lähtöleimausta tai maalileimauksen jälkeen, ei
  * huomioida.
  * Maalileimausta ei huomioida kuin vasta lähtöleimauksen jälkeen.
  * Jos joukkueella on useampi lähtöleimaus, niin pisteet lasketaan vasta
  * viimeisen lähtöleimauksen jälkeisistä rastileimauksista.
  * Joukkue, jolla ei ole ollenkaan rastileimauksia, saa 0 pistettä
  * @param {Object} joukkue
  * @return {Object} joukkue
  */
function laskePisteet(joukkue) {

  let rastit = joukkue.rastileimaukset;

  let jarjleimaukset = Array.from(rastit).sort( (a, b) => a.aika.localeCompare(b.aika));
  console.log(jarjleimaukset);

  let koodit = [];
  
 // Tehdään samat poistot kun matkan kohdalla
  if (jarjleimaukset.length === 0) {
    joukkue.pisteet = 0;
    return joukkue;
  } else if (jarjleimaukset.length > 0){
    for (let i = 0; i < jarjleimaukset.length; i++) {
      if (jarjleimaukset[i].rasti === undefined || jarjleimaukset[i].rasti.koodi === undefined){
        jarjleimaukset.splice(i, 1);
        continue;
      }
       else if (jarjleimaukset[i].rasti.koodi === "LAHTO" && jarjleimaukset[i+1].rasti.koodi === jarjleimaukset[i].rasti.koodi) {
        jarjleimaukset.splice(i,1);
        continue;
      } else if (jarjleimaukset[i].rasti.koodi === "MAALI") {
        let index = i+1;
        jarjleimaukset.splice(index,1);
      }
    }
  }


  for (let k of jarjleimaukset) {
    koodit.push(k.rasti.koodi);
  }
  
 let pisteet = 0;

 // Poistetaan duplikaatit koska niistä tulee vain yhden kerran pisteet
 let uudetkoodit = [...new Set(koodit)];
 

 for (let u of uudetkoodit) {
  // Jos koodin ensimmäinen merkki on kirjain lisätään pisteisiin 0
  if (isNaN(u.charAt(0))) {
    pisteet += 0;
  } else {
    // Muuten lisätään pisteisiin ensimmäinen merkki joka on muuutettu numeroksi
    pisteet += parseInt(u.charAt(0));
  }
 }

 console.log(joukkue.nimi, pisteet);
 joukkue.pisteet = pisteet;
  return joukkue;
}




