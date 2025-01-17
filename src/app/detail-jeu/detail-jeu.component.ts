import { Component, OnInit } from '@angular/core';
import {JeuService} from '../_services/jeu.service';
import {Jeu} from '../jeu/jeu';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {Commentaire} from '../jeu/commentaire';
import {TriCommentaireService} from '../_services/tri-commentaire.service';
import {Statistique} from '../jeu/statistique';
import {Tarif} from '../jeu/tarif';
import {first} from 'rxjs/operators';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {UserInfo} from '../_models/user-info';
import {Mecanic} from '../_models/mecanic';
import {AuthentificationService} from '../_services/authentification.service';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-detail-jeu',
  templateUrl: './detail-jeu.component.html',
  styleUrls: ['./detail-jeu.component.css']
})
export class DetailJeuComponent implements OnInit {
  user_id = this.authService.userValue.id;
  jeux: Jeu;
  jeu: Jeu[];
  comm: Commentaire[];
  jeux$: Observable<Jeu[]>;
  sort: number = undefined;
  statistiques: Statistique;
  tarif: Tarif;

  displayModal3: boolean;
  displayModal: boolean;
  displayModal2: boolean;

  val = 1;
  loading: boolean;
  user: UserInfo;
  error = '';
  jeu_id: number;
  mecanic: Mecanic[];

  form: any = {
  };
  returnUrl: string;

  formulaire = new FormGroup({
    note: new FormControl('', [Validators.required, Validators.minLength(1)]),
    commentaire: new FormControl('', [Validators.required, Validators.minLength(2)])
  });


  constructor(private route: ActivatedRoute,
              private router: Router,
              private jeuService: JeuService,
              private triCommentaireService: TriCommentaireService,
              private authService: AuthentificationService,
              private titleService: Title) {
  }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.jeu_id = +this.route.snapshot.paramMap.get('id');
    this.jeuService.getJeuById(id).subscribe(
      val => {
        this.jeux = val;
      }
    );
    this.jeux$ = this.jeuService.getJeux();
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
    this.loading = true;
    this.titleService.setTitle('Détails du jeu');

  }

  ModifierComm(jeux: Commentaire): void {
    const link = ['/jeux/edit', jeux.id];
    this.router.navigate(link);
  }

  /*AjouterComm(jeux: Commentaire): void {
    const link = ['/jeux/edit', jeux.id];
    this.router.navigate(link);
  }*/


  TriDateComm(commentaires: Commentaire[]): void {
    if (this.sort === undefined || this.sort === -1) {
      this.sort = 1;
    } else if (this.sort === 1) {
      this.sort = undefined;
    }
    this.comm = this.triCommentaireService.getCommByDate( commentaires, this.sort);
  }

  showModalDialog(): void {
    this.displayModal = true;
  }

  // tslint:disable-next-line:typedef
  showModalDialog2() {
    this.displayModal2 = true;
  }

  showModalDialog3(): void{
    this.displayModal3 = true;
  }

  get note(): AbstractControl {
    return this.formulaire.get('note');
  }

  get commentaire(): AbstractControl {
    return this.formulaire.get('commentaire');
  }


  get date_com(): Date {
    return new Date();
  }


  // tslint:disable-next-line:typedef
  onSubmit() {
    this.form = {...this.form, ...this.formulaire.value};
    this.loading = true;
    console.log(this.jeu_id);
    this.triCommentaireService.ajouterComm(this.form.note, this.form.commentaire, this.jeu_id , this.date_com)
      .pipe(first())
      .subscribe(
        () => {
          this.router.navigate([this.returnUrl]);
        },
        error => {
          console.log('Erreur: ', error);
          this.loading = false;
        }
      );
    console.log(this.formulaire.value);
  }

  goBack(): void{
    const lien = ['/jeux'];
    this.router.navigate(lien);
  }
}
