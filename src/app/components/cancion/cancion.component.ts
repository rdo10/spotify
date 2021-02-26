import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SpotifyService } from '../services/spotify.service';
import { PreviousRouteService } from '../services/previous-route.service';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-cancion',
  templateUrl: './cancion.component.html',
 
})
export class CancionComponent{

  cancion: any = {};
  loading: boolean = true;
  topTracks: any[] = [];

  constructor(private _router: Router, private _PreviousRouteService: PreviousRouteService, private _activatedRoute: ActivatedRoute, private _spotifyService: SpotifyService) {

    this._activatedRoute.params.subscribe(data => {

      this.getCanciones(data.id);
      

    });

  }

  regresar(){

    this._router.navigate([this._PreviousRouteService.previousUrl]);

  }

  getCanciones(id: string){

    this._spotifyService.getCanciones(id).subscribe(data => {

      console.log(this.cancion = data);
      this.loading = false;

    })

  }
  
  




}
