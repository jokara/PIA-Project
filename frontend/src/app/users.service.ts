import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http'
import { summaryFileName } from '@angular/compiler/src/aot/util';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  uri = 'http://localhost:4000'

  constructor(private http: HttpClient) { }

  login(username, password) {
    const data = {
      username: username,
      password: password
    };

    return this.http.post(`${this.uri}/login`, data);
  }

  register(req) {
    const data = {
      req: req
    };
    return this.http.post(`${this.uri}/register`, data);
  }

  registerUser(user) {
    const data = {
      user: user
    };
    return this.http.post(`${this.uri}/registerUser`, data);
  }
  obrisiDatogKorisnika(username) {
    const data = {
      username: username
    };
    return this.http.post(`${this.uri}/obrisiKorisnika`, data);
  }

  obrisiKorisnikovZahtev(username) {
    const data = {
      username: username
    };
    return this.http.post(`${this.uri}/obrisiZahtevKorisnika`, data);
  }



  dohvatiBrojMejlova(mail) {
    const data = {
      mail: mail
    };

    return this.http.post(`${this.uri}/brojIstihMejlova`, data);
  }

  dohvatiLozinku(username) {
    const data = {
      username: username
    };
    return this.http.post(`${this.uri}/staraLozinka`, data);
  }

  novaLozinka(username, password) {
    const data = {
      username: username,
      password: password
    };
    return this.http.post(`${this.uri}/postaviNovuLozinku`, data);
  }

  sviKorisnickiZahtevi() {
    return this.http.get(`${this.uri}/dohvatiSveZahteveZaReg`);
  }

  sviKorisnici() {
    return this.http.get(`${this.uri}/dohvatiSveKorisnike`);
  }

  sveAnkete() {
    return this.http.get(`${this.uri}/dohvatiSveAnkete`);
  }

  sviTestovi() {
    return this.http.get(`${this.uri}/dohvatiSveTestove`);
  }

  svePopunjeneTestove(username) {
    const data = {
      username: username
    };

    return this.http.post(`${this.uri}/dohvatiSvePopunjeneTestove`, data);
  }



  svePopunjeneAnkete(username) {
    const data = {
      username: username
    };

    return this.http.post(`${this.uri}/dohvatiSvePopunjeneAnkete`, data);
  }

  podaciKorisnika(username) {
    const data = {
      username: username
    };

    return this.http.post(`${this.uri}/dohvatiPodatkeKorisnika`, data);
  }

  dodajNovuResenuAnketu(poll) {
    const data = {
      poll: poll
    };
    return this.http.post(`${this.uri}/novaAnketaResena`, data);
  }

  dodajAnketuKreatora(poll) {
    const data = {
      poll: poll
    };
    return this.http.post(`${this.uri}/novaAnketaKreator`, data);
  }

  dodajTestKreatora(test) {
    const data = {
      test: test
    };
    return this.http.post(`${this.uri}/noviTestKreator`, data);
  }


  obrisiStaruResenuAnketu(id, username) {
    const data = {
      id: id,
      username: username
    };
    return this.http.post(`${this.uri}/obrisiAnketuResenu`, data);
  }

  dodajNoviReseniTest(test) {
    const data = {
      test: test
    };
    return this.http.post(`${this.uri}/noviTestResen`, data);
  }

  obrisiStariReseniTest(id, username) {
    const data = {
      id: id,
      username: username
    };
    return this.http.post(`${this.uri}/obrisiTestResen`, data);
  }

  sveKreatoroveAnkete(username) {
    const data = {
      username: username
    };
    return this.http.post(`${this.uri}/dohvatiSveKreatoroveAnkete`, data);
  }

  sviKreatoroviTestovi(username) {
    const data = {
      username: username
    };
    return this.http.post(`${this.uri}/dohvatiSveKreatoroveTestove`, data);
  }

  sviTestoviSaId(id) {
    const data = {
      id: id
    };
    return this.http.post(`${this.uri}/dohvatiSveTestoveSaId`, data);
  }

  sveAnketePoId(id) {
    const data = {
      id: id
    };
    return this.http.post(`${this.uri}/dohvatiSveAnketeSaId`, data);
  }


  obrisiTest(id) {
    const data = {
      id: id
    };
    return this.http.post(`${this.uri}/obrisiTestKreatora`, data);
  }

  obrisiTestoveReseneKreator(id) {
    const data = {
      id: id
    };
    return this.http.post(`${this.uri}/obrisiOstaleTestoveResene`, data);
  }

  obrisiAnketuKreator(id) {
    const data = {
      id: id
    };
    return this.http.post(`${this.uri}/obrisiAnketuJednuKreatora`, data);
  }

  obrisiAnketeReseneKreator(id) {
    const data = {
      id: id
    };
    return this.http.post(`${this.uri}/obrisiOstaleAneketeResene`, data);
  }


  /*news(){
    return this.http.get(`${this.uri}/news`);
  }

  newsByUser(username){
    const data = {
      username: username
    };

    return this.http.post(`${this.uri}/newsByUser`, data);
  }*/
}
