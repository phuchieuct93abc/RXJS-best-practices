import { AsyncPipe } from '@angular/common';
import { Component, inject, Injectable } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { bootstrapApplication } from '@angular/platform-browser';
import {
  filter,
  map,
  Observable,
  ReplaySubject,
  Subject,
  take,
  tap,
} from 'rxjs';
import 'zone.js';

@Injectable({ providedIn: 'root' })
export class StoreService {
  name$ = new ReplaySubject<string>(1);

  setValue(name?: string) {
    this.name$.next(name!);
  }
  getValue(): Observable<number> {
    return this.name$.asObservable().pipe(map((v) => v?.length));
  }
}

@Component({
  selector: 'app-one',
  standalone: true,
  template: `
    <h1>Component one</h1>
    <input [(ngModel)]="name"/><br/>
    <button (click)="apply()">Set value</button><br/>

   
  `,
  imports: [FormsModule, AsyncPipe],
})
export class ComponentOne {
  name?: string = undefined;
  storeService = inject(StoreService);

  apply() {
    this.storeService.setValue(this.name);
  }
}

@Component({
  selector: 'app-two',
  standalone: true,
  template: `
    <h1>Component two</h1>

    Size reactive{{size$ | async}} 
   
  `,
  imports: [FormsModule, AsyncPipe],
})
export class ComponentTwo {
  name?: string = undefined;
  size?: number = undefined;
  storeService = inject(StoreService);
  size$? = this.storeService.getValue().pipe(filter((v) => v > 0));
}

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
   <app-one></app-one>
   <app-two></app-two>
   
  `,
  imports: [ComponentOne, ComponentTwo],
})
export class App {
  name = 'Angular';
}

bootstrapApplication(App);
