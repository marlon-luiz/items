import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Item } from './item.model';

@Injectable()
export class ItemService {
  private get items(): Item[] {
    return JSON.parse(localStorage.getItem('items') || '[]') || [];
  }

  private set items(items: Item[]) {
    localStorage.setItem('items', JSON.stringify(items));
  }

  getItems(): Observable<Item[]> {
    return new Observable((observer) => {
      observer.next(this.items.map((item, index) => ({ ...item, id: index })));
    });
  }

  getItem(id: number): Observable<Item> {
    return new Observable((observer) =>
      observer.next({ ...this.items[id], id })
    );
  }

  addItem(item: Item) {
    const items = this.items;
    items.push(item);

    this.items = items;
  }

  alterItem(id: number, item: Item) {
    const items = this.items;
    items[id] = item;

    this.items = items;
  }

  removeItem(id: number) {
    const items = this.items;

    this.items = items.filter((_, index) => index !== id);
  }
}
