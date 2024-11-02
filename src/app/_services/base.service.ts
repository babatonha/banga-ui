import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  baseUrl= "https://localhost:7079/api/";
  hubUrl = "https://localhost:7079/"
constructor() { }

}
