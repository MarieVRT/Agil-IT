import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import {Jeu} from '../jeu/Jeu';
import {Mecanique} from '../jeu/Mecanique';
import {Editeur} from '../jeu/Editeur';
import {Themes} from '../jeu/Themes';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JeuService {

  constructor(private http: HttpClient) { }

  getJeux(): Observable<Jeu>{
    const url = 'http://127.0.0.1:8000/api/jeux/';
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };

    return this.http.get<any>(url, httpOptions)
      .pipe(
        map(res => res.data.item),
        catchError(err => {
          console.log('Erreur http : ', err);
          return of([]);
        }),
      );
  }
  getMecaniques(): Observable<Mecanique[]>{
    const url = 'http://127.0.0.1:8000/api/mecanics/';
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };

    return this.http.get<any>(url, httpOptions)
      .pipe(
        map(res => res.data.item),
        catchError(err => {
          console.log('Erreur http : ', err);
          return of([]);
        }),
      );
  }

  getEditeurs(): Observable<Editeur[]>{
    const url = 'http://127.0.0.1:8000/api/editeurs/';
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };

    return this.http.get<any>(url, httpOptions)
      .pipe(
        map(res => res.data.item),
        catchError(err => {
          console.log('Erreur http : ', err);
          return of([]);
        }),
      );
  }

  getThemes(): Observable<Themes[]>{
    const url = 'http://127.0.0.1:8000/api/themes/';
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };

    return this.http.get<any>(url, httpOptions)
      .pipe(
        map(res => res.data.item),
        catchError(err => {
          console.log('Erreur http : ', err);
          return of([]);
        }),
      );
  }


  /*postData() {
    this.http.post(environment.apiUrl + '/jeux', {
      data: "data",
      to: "to",
      send: "send"
    }, httpOptions).subscribe(rep => {
      console.log(rep);
    });
  }*/
}
