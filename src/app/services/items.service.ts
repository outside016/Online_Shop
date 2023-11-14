import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Items} from "../models/items";

@Injectable({
  providedIn: 'root'
})
export class ItemsService{

  url: string = "http://localhost:3000/items"

constructor(private http: HttpClient) {
}
getItems(){
 return this.http.get<Items[]>(this.url)
}

getItem(id:number){
   return this.http.get<Items[]>(`${this.url}/${id}`)
}

}
