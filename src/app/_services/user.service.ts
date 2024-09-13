import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { UserDetails } from "../_models/user-details";

@Injectable({
    providedIn: 'root'
  })
  export class UserService {

    constructor(private baseService: BaseService,
        private http: HttpClient) { }

    
    getAllUsers(){
        return this.http.get<any>(`${this.baseService.baseUrl}User/`);
    }

    getUser(id: number){
      return this.http.get<any>(`${this.baseService.baseUrl}User/${id}`);
    }

    createUser(user: UserDetails){
      return this.http.put<any>(`${this.baseService.baseUrl}User/`, user);
    }

    blockUser(userId: number, isBlocked: boolean){
      return this.http.get<any>(`${this.baseService.baseUrl}User/BlockUser/${userId}/${isBlocked}`);
    }

    assignUserRole(userId: number, roleName: string){
      return this.http.get<any>(`${this.baseService.baseUrl}User/AssignUserRole/${userId}/${roleName}`);
    }

  }