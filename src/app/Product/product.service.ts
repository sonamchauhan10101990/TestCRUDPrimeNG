import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";


@Injectable({
    providedIn:'root'
})

export class ProductService{
    readonly url ="http://localhost:3000/"
    constructor(private http:HttpClient){}

    getProducts():Observable<any>{ 
        
        return this.http.get(this.url + "ProData");
     }
     
     SaveEditProduct(postData:any, modalType:any):Observable<any>{
        if(modalType == 'Add'){
        return this.http.post(this.url + "ProData", postData);
        }else{
            return this.http.put(this.url + "ProData/" + postData.id, postData);
        }
     }
     DeleteProduct(productId:number){
        return this.http.delete(this.url + "ProData/" +productId);
     }
}