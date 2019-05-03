
/********************  Que es un Observable?  ********************/

/* 
Un observable representa una secuencia o fuente de datos que puede llegar con el tiempo. 
Puede crear un observable desde casi cualquier cosa, pero el caso de uso más común en RxJS es de eventos.
Esto puede ser cualquier cosa, desde movimientos del mouse, clics de botones, entrada en un campo de texto o incluso cambios de ruta. 
La forma más fácil de crear un observable es a través de las funciones de creación integradas. 
Por ejemplo, podemos usar la función de ayuda fromEvent para crear un observable de eventos de clic del mouse:
*/

// import the fromEvent operator
import { fromEvent } from 'rxjs';

// grab button reference
const button = document.getElementById('myButton');

// create an observable of button clicks
const myObservable = fromEvent(button, 'click');


 
// En este punto tenemos un observable pero no está haciendo nada. 
// Esto se debe a que los observables son fríos, o no activan a un producer (como conectar a un event listener), hasta que haya una SUBSCRIPTION


/********************  SUBSCRIPTION  ********************/

/*
Las suscripciones son las que ponen todo en movimiento. Puedes pensar en esto como un grifo, tienes un chorro de agua listo para ser aprovechado (observable), alguien 
solo necesita girar la manija. En el caso de los observables, ese rol pertenece al suscriptor.
Para crear una suscripción, debe llamar al método de suscripción, suministrando una función (u objeto), también 
conocido como observador. Aquí es donde puede decidir cómo reaccionar (reactive programming) a cada evento. 
Revisemos lo que sucede en el escenario anterior cuando se crea una suscripción:
*/

// for now, let's just log the event on each click
const subscription = myObservable.subscribe(event => console.log(event));

/*
En el ejemplo anterior, llamar a myObservable.subscribe() hará lo siguiente:

1. Configurar un detector de eventos en nuestro botón para hacer clic en eventos.
2. Llamar a la función que pasamos al método de suscripción (observador) en cada evento de click.
3. Devuelva un subscription object con un unsubscribe que contenga una lógica de limpieza, como eliminar los escuchas de eventos apropiados.

El método de suscripción también acepta un object map para manejar el caso de error o finally. 
Es probable que no use esto tanto como simplemente para proporcionar una función, pero es bueno tener en cuenta si surge la necesidad:
*/

// instead of a function, we will pass an object with next, error, and complete methods
const subscription = myObservable.subscribe({
  // on successful emissions
  next: event => console.log(event),
  // on errors
  error: error => console.log(error),
  // called once on completion
  complete: () => console.log('complete!')
});

// Es importante tener en cuenta que cada suscripción creará un nuevo contexto de ejecución. 
// Esto significa que llamar a suscribirse una segunda vez creará un nuevo detector de eventos:

// addEventListener called
const subscription = myObservable.subscribe(event => console.log(event));

// addEvent listener called again!
const secondSubscription = myObservable.subscribe(event => console.log(event));

// clean up with unsubscribe
subscription.unsubscribe();
secondSubscription.unsubscribe();

/*
De forma predeterminada, una suscripción crea una conversación uno a uno, unilateral, entre el observable y el observador. 
Esto es como tu jefe (el observable) gritándote (emitiéndote) a ti (el observador) por fusionar una RP mala. Esto también se conoce como unicasting. 
Si prefiere un escenario de conversación en la conferencia (uno observable, muchos observadores), adoptará 
un enfoque diferente que incluye multicasting con subjects (ya sea explícitamente o detrás de escena).
Vale la pena señalar que cuando discutimos una fuente observable que emite datos a los observadores, este es un modelo basado en empuje. 
La fuente no sabe o le importa lo que los suscriptores hacen con los datos, simplemente los empuja hacia abajo en la línea.
Mientras que trabajar en una secuencia de eventos es agradable, solo es muy útil por sí mismo. Lo que hace a RxJS el "lodash para eventos" es su ...
*/

/********************  Operators  ********************/

/* 
Los operadores ofrecen una forma de manipular los valores de una fuente, devolviendo un observable de los valores transformados.  
Muchos de los operadores de RxJS te resultarán familiares si está acostumbrado a los métodos de JavaScripts Array.
Por ejemplo, si desea transformar los valores emitidos de una fuente observable, puede usar el mapa:
*/

// import the from operator
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
/*
 *  'of' allows you to deliver values in a sequence
 *  In this case, it will emit 1,2,3,4,5 in order.
 */
const dataSource = of(1, 2, 3, 4, 5);

// subscribe to our source observable
const subscription = dataSource
  .pipe(
    // add 1 to each emitted value
    map(value => value + 1)
  )
    // log: 2, 3, 4, 5, 6
  .subscribe(value => console.log(value));

// O si desea filtrar valores específicos, puede usar el filtro:

// import the from operator
import { of } from 'rxjs';
import { filter } from 'rxjs/operators';

const dataSource = of(1, 2, 3, 4, 5);

// subscribe to our source observable
const subscription = dataSource
  .pipe(
    // only accept values 2 or greater
    filter(value => value >= 2)
  )
  // log: 2, 3, 4, 5
  .subscribe(value => console.log(value));

  /*
  En la práctica, si hay un problema que necesita resolver, es más que probable que haya un operador para eso. 
  Y mientras que el número total de operadores puede ser abrumador al comenzar su viaje RxJS, puede reducirlo a un pequeño puñado (y lo haremos) para comenzar a ser efectivo. 
  Con el tiempo, llegará a apreciar la flexibilidad de la biblioteca del operador cuando inevitablemente lleguen escenarios oscuros.
  */

  //  Una cosa que puede haber notado en el ejemplo anterior, es que los operadores existen dentro de un ...



/********************  PIPE  ********************/

/*
La función pipe es la línea de ensamblaje desde su fuente de datos observable a través de sus operadores. 
Al igual que la materia prima en una fábrica pasa por una serie de paradas antes de que se convierta en un producto terminado, los datos 
de origen pueden pasar por una línea de operadores donde puede manipular, filtrar y transformar los datos para adaptarlos a su caso de uso. 
No es raro usar 5 (o más) operadores dentro de una cadena observable, contenida dentro de la función de tubería.
Por ejemplo, una solución de typeahead construida con observables puede usar un grupo de operadores para optimizar tanto el proceso de solicitud como el de visualización:
*/

// observable of values from a text box, pipe chains operators together
inputValue
  .pipe(
    // wait for a 200ms pause
    debounceTime(200),
    // if the value is the same, ignore
    distinctUntilChanged(),
    // if an updated value comes through while request is still active cancel previous request and 'switch' to new observable
    switchMap(searchTerm => typeaheadApi.search(term))
  )
  // create a subscription
  .subscribe(results => {
    // update the dom
  });


 // ¿Pero cómo sabe qué operador se adapta a su caso de uso? La buena noticia es...

 // Los operadores se pueden agrupar en categorías comunes
 
 /*
 La primera parada cuando se busca el operador correcto es encontrar una categoría relacionada. 
 ¿Necesitas filtrar los datos de una fuente? Echa un vistazo a los operadores de filtrado. 
 ¿Está intentando rastrear un error o depurar el flujo de datos a través de su flujo observable? 
 Hay operadores de servicios públicos que harán el truco. Las categorías de operadores incluyen ...
 */





////////////////////////////////////////// CREANDO OPERATORS //////////////////////////////////////////

/*

Estos operadores permiten la creación de un observable desde casi cualquier cosa. Desde genéricos hasta casos de uso específicos, puede convertir todo en una transmisión.
Por ejemplo, supongamos que estamos creando una barra de progreso a medida que un usuario se desplaza por un artículo. 
Podríamos convertir el evento scroll en una secuencia utilizando el operador fromEvent:
*/

fromEvent(scrollContainerElement, 'scroll')
  .pipe(
    // we will discuss cleanup strategies like this in future article
    takeUntil(userLeavesArticle)
  )
  .subscribe(event => {
    // calculate and update DOM
  });

// Los operadores de creación más utilizados son of, from y desde fromEvent.




////////////////////////////////////////// COMBINANDO OPERATORS //////////////////////////////////////////

// Los operadores de combinación permiten la unión de información de múltiples observables. 
// El orden, el tiempo y la estructura de los valores emitidos es la principal variación entre estos operadores.
// Por ejemplo, podemos combinar actualizaciones de múltiples fuentes de datos para realizar un cálculo:

// give me the last emitted value from each source, whenever either source emits
combineLatest(sourceOne, sourceTwo).subscribe(
    ([latestValueFromSourceOne, latestValueFromSourceTwo]) => {
      // perform calculation
    }
  );

// Los operadores de combinación más utilizados son combineLatest, concat, merge, startWith y withLatestFrom. 






////////////////////////////////////////// ERROR HANDLING OPERATORS //////////////////////////////////////////

// Los operadores de manejo de errores brindan formas efectivas de manejar los errores y realizar reintentos en caso de que ocurran.
// Por ejemplo, podemos usar catchError para protegernos contra solicitudes de red fallidas:

source
  .pipe(
    mergeMap(value => {
      return makeRequest(value).pipe(
        catchError(handleErrorByReturningObservable)
      );
    })
  )
  .subscribe(value => {
    // take action
  });

  // El operador de manejo de errores más utilizado es catchError.

  // FILTERING OPERATORS https://www.learnrxjs.io/concepts/rxjs-primer.html

  // 



