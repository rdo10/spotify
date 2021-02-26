import { Component, Output } from '@angular/core';
import { SpotifyService } from '../services/spotify.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: []
})
export class SearchComponent {

  private _timeWaitSearch: any;

  @Output() searchArtis: any[] = [];
  @Output() searchSongs: any[] = [];
  loading: boolean = false;

  constructor(private _spotifyService: SpotifyService) { }

  BuscarArtista(v: string) {

    clearTimeout(this._timeWaitSearch);

    this._timeWaitSearch = setTimeout(() => {

      this.loading = true;

      this._spotifyService.getArtistas(v).subscribe((data: any) => {

        this.searchArtis = data;
        this.loading = false;


      }, error => {

        error.status == 401 || error.status == 400 && (this._spotifyService.tokenRefreshURL());

      });


    }, 500);

  }

   BuscarCancion(search2:string){
    clearTimeout(this._timeWaitSearch);

    this._timeWaitSearch = setTimeout(() => {

      this.loading = true;

      this._spotifyService.getCanciones(search2).subscribe((data: any) => {

        this.searchSongs = data;
        this.loading = false;


      }, error => {

        error.status == 401 || error.status == 400 && (this._spotifyService.tokenRefreshURL());

      });


    }, 500);
   }

}
