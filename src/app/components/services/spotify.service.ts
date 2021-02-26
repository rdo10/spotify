import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  public credentials = {

    clientId: 'b6d0e11f9e4a4018a92573a41c4989b5',
    clientSecret: 'babfadc68ae8498a99b2eb671d6fd4ef',
    accessToken: ''

  };

  public poolURlS = {

    authorize: 'https://accounts.spotify.com/es-ES/authorize?client_id=' +
      this.credentials.clientId + '&response_type=token' +
      '&redirect_uri=' + encodeURIComponent('http://localhost:4200/') +
      '&expires_in=3600',
    refreshaAcessToken: 'https://accounts.spotify.com/api/token'


  };

  constructor(private _httpClient: HttpClient) {

    this.upDateToken()

  }

  upDateToken() {
    this.credentials.accessToken = sessionStorage.getItem('token') || '';
  }

  getInfo(query: string) {

    const URL = `https://api.spotify.com/v1/${query}`;
    const HEADER = { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + this.credentials.accessToken }) };

    return this._httpClient.get(URL, HEADER);

  }

  checkTokenSpoLogin() {

    this.checkTokenSpo() || (sessionStorage.setItem('refererURL', location.href), window.location.href = this.poolURlS.authorize);

  }

  checkTokenSpo() {

    return !!this.credentials.accessToken;

  }

  tokenRefreshURL() {

    this.checkTokenSpo() && alert('Expiro la sesión');

    this.credentials.accessToken = '';
    sessionStorage.removeItem('token');
    this.checkTokenSpoLogin();

  }

  getNewReleases() {

    return this.getInfo('browse/new-releases?limit=20&offset=0').pipe(map((data: any) => data.albums.items));

  }

  getCanciones(v: string) {
    return this.getInfo(`search?q=${v}&type=track&limit=15`).pipe(map((data: any) => data.tracks.items));
  }


  getArtistas(v: string) {

    return this.getInfo(`search?q=${v}&type=artist&limit=20&offset=0`).pipe(map((data: any) => data.artists.items));

  }

  getArtista(v: string) {

    return this.getInfo(`artists/${v}`);

  }

  getTopTracks(v: string) {

    return this.getInfo(`artists/${v}/top-tracks?country=us`);

  }






}
