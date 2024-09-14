import {
  HttpErrorResponse,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
 } from "@angular/common/http";
import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { MessageService } from "primeng/api";

 import { catchError, throwError } from "rxjs";
 
 export const ErrorInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
 ) => {


  //const toastr = inject(MessageService);
  const router = inject(Router);

  
  return next(req).pipe(
   catchError((error: HttpErrorResponse) => {
     if(error){
      switch(error.status) {
        case 400: 
          if(error.error.errors){
            const modelStateErrors = [];
            for(const key in error.error.errors){
              if(error.error.errors[key]){
                modelStateErrors.push(error.error.errors[key]);
              }
            }

            throw modelStateErrors;
          }else{
           // toastr.add({ severity: 'error', summary: 'Error', detail: error.error });
          }
          break;
        case 401: 
         // const errorMessage = error.url?.includes('/login') ? "Wrong username or password" : "Unauthorized";
        //  toastr.add({ severity: 'error', summary: 'Error', detail: errorMessage});
          router.navigate(['/login']);
          break;
        case 404: 
            //toastr.add({ severity: 'error', summary: 'Error', detail: "No data found" });
          break;
        case 500: 
          //  toastr.add({ severity: 'error', summary: 'Error', detail: error.error });
          break;
        default:
           // toastr.add({ severity: 'error', summary: 'Error', detail: "Something unexcepted happened, Please contact Admin" });
          break;
      }
    }
    return throwError(() => error);
   }),
  );
 };