import { Component, OnDestroy } from '@angular/core';
import { MinValidator } from '@angular/forms';
import { Observable, Subscription, interval } from 'rxjs';
import { filter, map, retry, take } from "rxjs/operators";

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnDestroy{

  public intervalSubs: Subscription;

  constructor() {



  //  this.retornaObservable().pipe(
  //    retry(2)
  //  ).subscribe(
  //    valor => console.log('Subs:', valor),
 //     error => console.warn('Error:', error),
  //    () => console.info('Obs terminado')
  //  );
  this.intervalSubs = this.retornaIntervalo()
    .subscribe( console.log )




  }
  ngOnDestroy(): void {
    this.intervalSubs.unsubscribe();
  }

  retornaIntervalo(): Observable<number> {

    return interval(100)
              .pipe(
                //take(12), // La ubicacion del take nos muestra si son 5 0 10 valores
                map( valor => valor + 1 ), // 0 => 1
                filter( valor => (valor % 2 === 0) ? true: false),


              );




  }

  retornaObservable(): Observable<number> {
    let i = -1;

    return new Observable<number>( observer => {

      const intervalo = setInterval( () => {

        i++;
        observer.next(i);

        if ( i === 4 ) {
          clearInterval( intervalo );
          observer.complete(); //Para notoficar final del el valor
        }

        if ( i === 2){
          observer.error( 'i llego al valor de 2');
        }

      }, 1000)
    });


  }

}
