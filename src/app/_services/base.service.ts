import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  baseUrl= "https://api.easyestate.online/api/";
  hubUrl = "https://localhost:7079/hubs/"
constructor() { }

}
