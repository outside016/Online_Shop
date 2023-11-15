import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {Items} from "../models/items";
import {catchError, EMPTY, Observable} from "rxjs";
import {ItemsService} from "./items.service";
import {Injectable} from "@angular/core";

@Injectable({providedIn: "root"})
export class ItemsResolver implements Resolve<Items[]> {
  constructor(private ItemsService: ItemsService,
              private router: Router) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Items[]> {
    return this.ItemsService.getItem(route.params?.['id']).pipe(
      catchError(() => {
        this.router.navigate(['items']);
        return EMPTY
      })
    )
  }
}
