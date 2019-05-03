# VSCode-pro

## Extensiones

* [Bookmarks](https://marketplace.visualstudio.com/items?itemName=alefragnani.Bookmarks)

* [Bracket Pair Colorizer 2](https://marketplace.visualstudio.com/items?itemName=CoenraadS.bracket-pair-colorizer-2)

* [Color Highlight](https://marketplace.visualstudio.com/items?itemName=naumovs.color-highlight)

* [Liveserver](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)

* [Material Icon Theme](https://marketplace.visualstudio.com/items?itemName=PKief.material-icon-theme)

* [Material Theme](https://marketplace.visualstudio.com/items?itemName=Equinusocio.vsc-material-theme)

* [Paste JSON as Code](https://marketplace.visualstudio.com/items?itemName=quicktype.quicktype)

* [TODO Highlight](https://marketplace.visualstudio.com/items?itemName=wayou.vscode-todo-highlight)

* [TODO Tree](https://marketplace.visualstudio.com/items?itemName=Gruntfuggly.todo-tree)




##

Ctrl + b : ocultar barra lateral izquierda

Ctrl + ç : comentar codigo

Ctrl + shift + a : comentar codigo seleccionado

Alt + ↑ / ↓ : desplaza lineas de codigo

Ctrl + click derecho : Te lleva a la dirección, sino la crea

F12 / Alt + F12 : Ir a definición

Ctrl + shift + k : Borrar linea

Ctrl + shift + L : Borrar lineas seleccionadas

Ctrl + K Z : Modo ZEN

Ctrl + w : Cerrar tab

Ctrl + K  Ctrl + W : Cerrar todas

Ctrl + TAB : Cambiar de tab


Shift + Alt + Down Arrow : Copy line





# RxJS


¿Que es RxJS?

Es una implementación de JavaScript de la biblioteca ReactiveX, una biblioteca para componer programas basados en eventos asíncronos mediante el uso de secuencias observables. ReactiveX en sí es una abstracción de la biblioteca que puede utilizar en diferentes plataformas y con diferentes idiomas.


RxJS tiene que ver con la programación asíncrona con flujos observables o secuencias de eventos. Imagina un array que se rellena y cambia con el tiempo. Opuesto al array que tiene una limitación de tamaño, un flujo puede continuar infinitamente en el futuro. Con RxJS también podemos trabajar con eventos, promesas, arrays regulares o arrays similares.

¿Que tiene en especial Rx y RxJS?
RxJS nos permite usar operaciones asíncronas que generalmente devuelven un solo valor en combinación con flujos (o eventos)


El productor es la fuente de valores para el observable. Puede ser un array, iterador, web socket, eventos, etc.
Un observable es básicamente un enlace entre Productor y Observer. El observable avisará al Observer cada vez que el Productor tenga nuevos valores para enviar.


El observador es solo un objeto con 3 métodos:

-next

-error

-complete


El uso de Observable Producer pasa valores al método next () en el objeto Observer.
La mayoría de las veces usaremos solo dos de esos términos: Observable y Observer, solo por simplicidad. Sin embargo, es bueno saber que Observable es solo una función que conecta a Observer y Producer.

En ReactiveX un observador se suscribe a un observable. Luego, ese observador reacciona a cualquier elemento o secuencia de elementos que emita el observable. Este patrón facilita las operaciones concurrentes porque no necesita bloquear mientras espera que el Observable emita objetos, sino que crea un centinela en forma de observador que está listo para reaccionar adecuadamente en cualquier momento futuro en que el Observable lo haga.

Una vez que ocurre un error, Observable deja de llamar al método next (). Además, el método complete () no se ejecutará después de eso.



https://enriqueoriol.com/blog/2019/04/aprende-rxjs-3.html?gclid=EAIaIQobChMIv6TgiJ3_4QIVEyjTCh0VYwjmEAAYASAAEgL3EvD_BwE


