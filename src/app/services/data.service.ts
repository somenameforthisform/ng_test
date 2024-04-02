import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { RateCalendar, Rate } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  
  private rateCalendar = new BehaviorSubject<RateCalendar>(new Map());
  
  constructor() { }

  getRateCalendar(): Observable<RateCalendar>{
    return this.rateCalendar.asObservable()
  }

  addRate(date: string, rate: Rate): void {
      this.rateCalendar.next(this.rateCalendar.value.set(date, rate));
  }
}
