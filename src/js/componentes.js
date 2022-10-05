import { Todo } from '../classes'
import { todoList } from '..';
//Referencias en el html
const divTodoList =         document.querySelector('.todo-list'),
      txtInput =            document.querySelector('.new-todo'),
      btnDeteleCompleted =  document.querySelector('.clear-completed'),
      ulFiltros =           document.querySelector('.filters'),
      anchorFiltros =       document.querySelectorAll('.filtro')



export const crearTodoHtml = ( todo ) => {

    const htmlTodo = `
    <li class="${ todo.completado ? 'completed' : '' }" data-id="${ todo.id }">
            <div class="view">
                <input class="toggle" type="checkbox" ${ todo.completado ? 'checked' : ''}>
                <label>${todo.tarea}</label>
                <button class="destroy"></button>
            </div>
        <input class="edit" value="Create a TodoMVC template">
    </li> `;

    const div = document.createElement('div');
    div.innerHTML = htmlTodo;

    divTodoList.append( div.firstElementChild );
    return div.firstElementChild;
}

//Eventos
txtInput.addEventListener('keyup', (  event ) => {
   if( event.keyCode === 13 && txtInput.value.length > 0 ) {
     const nuevoTodo = new Todo( txtInput.value )
     todoList.nuevoTodo( nuevoTodo );
     crearTodoHtml(nuevoTodo);
     txtInput.value = '';
   }
})

divTodoList.addEventListener('click', event => {
    const nameElement = event.target.localName;
    const todoElement = event.target.parentElement.parentElement;
    const todoId = todoElement.getAttribute('data-id');

    if ( nameElement.includes('input')){
        todoList.marcarCompletado ( todoId );
        todoElement.classList.toggle('completed')
    }

    if ( nameElement.includes('button')){
        todoList.eliminarTodo ( todoId );
        divTodoList.removeChild( todoElement )
    }

})

btnDeteleCompleted.addEventListener('click', () => {
    todoList.eliminarCompletados();
    for( let i = divTodoList.children.length-1; i >= 0; i-- ){
        const element = divTodoList.children[i];

        if(element.classList.contains('completed')){
            divTodoList.removeChild(element)
        }
    }
})

ulFiltros.addEventListener('click', (event) => {
    const filtro = event.target.text;
    if( !filtro ) return;
    
    anchorFiltros.forEach( elem => elem.classList.remove('selected'))
    event.target.classList.add('selected')

    for( const elemento of divTodoList.children){
        elemento.classList.remove('hidden')
        const completado = elemento.classList.contains('completed');

        switch( filtro ) {
            case 'Pendientes':
                if( completado ) {
                    elemento.classList.add( 'hidden' )
                }
                break;
            case 'Completado':
                if( !completado ) {
                    elemento.classList.add( 'hidden' )
                    }
                break;
        }
    }
})