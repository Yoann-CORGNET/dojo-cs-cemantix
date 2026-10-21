import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { ResponseWord } from '../model/responseWord.model';
import { GuessWord } from '../model/guessWord.model';
import { ResponseWordDto } from './dto/responseWord.dto';

@Injectable({
  providedIn: 'root',
})
export class ApiClientService {
  private httpClient = inject(HttpClient);

  public getPokemonValue(guess: GuessWord): Observable<ResponseWord> {
    return this.httpClient.get<ResponseWord>(
      `https://pokeapi.co/api/v2/pokemon/${guess}`,
    );
  }

  public getWordDiff(guess: GuessWord): Observable<ResponseWord> {
    return this.httpClient
      .get<ResponseWordDto>(
        `https://cs-3if1020-progdev-theodo-do-0h23t8q0hprp.yoann-corgnet.deno.net/?word=${guess.value}`,
      )
      .pipe(
        map((response) => ({
          value: response.result * 100,
        })),
      );
  }
}
