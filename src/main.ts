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
  name?: string = undefined;
  name$ = new ReplaySubject<string>(1);
  setValueBad(name?: string) {
    this.name = name;
  }
  getValueBad() {
    return this.name?.length;
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
    this.storeService.setValueBad(this.name);
  }
}

@Component({
  selector: 'app-two',
  standalone: true,
  template: `
    <h1>Component two</h1>
    <button (click)="cal()">Calculate size</button><br/>
  
  `,
  imports: [FormsModule, AsyncPipe],
})
export class ComponentTwo {
  name?: string = undefined;
  size?: number = undefined;
  storeService = inject(StoreService);
  cal() {
    this.size = this.storeService.getValueBad();
  }
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
