import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class TestserviceService {
subject = new Subject<number>();

  constructor() { 

     
    // subject.subscribe({
    //   next: (v) => console.log(`observerA: ${v}`)
    // });
    // subject.subscribe({
    //   next: (v) => console.log(`observerB: ${v}`)
    // });
    
    // subject.next(1);
    // subject.next(2);
  }
  publish(){
    this.subject.next(1)
  }

}