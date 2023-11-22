import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Items} from "../models/items";

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  url: string = "http://localhost:3000/items"
  urlBasket: string = "http://localhost:3000/basket"

  constructor(private http: HttpClient) {
  }

  getItems() {
    return this.http.get<Items[]>(this.url)
  }

  getItem(id: number) {
    return this.http.get<Items[]>(`${this.url}/${id}`)
  }

  postItem(item: Items) {
    return this.http.post<Items>(this.url, item)
  }

  deleteItem(id: number) {
    return this.http.delete<any>(`${this.url}/${id}`)
  }

  updateItem(item: Items) {
    return this.http.put<Items>(`${this.url}/${item.id}`, item)
  }

  postItemToBasket(item: Items) {
    return this.http.post<Items>(this.urlBasket, item)
  }

  getItemsFromBasket() {
    return this.http.get<Items[]>(this.urlBasket)
  }

  updateBasket(item: Items) {
    return this.http.put<Items>(`${this.urlBasket}/${item.id}`, item)
  }

  deleteItemFromBasket(id: number) {
    return this.http.delete<any>(`${this.urlBasket}/${id}`)
  }


}
