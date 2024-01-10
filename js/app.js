const listaCursos = document.querySelector('#lista-cursos');
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody')
const vaciarCarrito = document.querySelector('#vaciar-carrito')
let articulosCarrito = [];

cargarEventListeners()
function cargarEventListeners(){
     listaCursos.addEventListener('click', agregarCurso);

     carrito.addEventListener('click', eliminarCurso)

     vaciarCarrito.addEventListener('click', ()=>{
          articulosCarrito = [];

          limpiarHTML();
     })

     document.addEventListener('DOMContentLoaded', ()=>{
          articulosCarrito = JSON.parse(localStorage.getItem('articulosCarrito')) || []
          carritoHTML()
     })
}

function agregarCurso(e){
     e.preventDefault();
     if(e.target.classList.contains('agregar-carrito')){
          const cursoSeleccionado = e.target.parentElement.parentElement;
          leerDatosCurso(cursoSeleccionado)
     }
}


function eliminarCurso(e){
     if(e.target.classList.contains('borrar-curso')){
          const cursoId = e.target.getAttribute('data-id');

          articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId)
     }

     carritoHTML();
}

function leerDatosCurso(curso){

     const infoCurso = {
          imagen: curso.querySelector('img').src,
          titulo: curso.querySelector('h4').textContent,
          precio: curso.querySelector('p span').textContent,
          id: curso.querySelector('a').getAttribute('data-id'),
          cantidad: 1
     }

     const existe = articulosCarrito.some(curso => curso.id === infoCurso.id)
     if(existe){
          const cursos = articulosCarrito.map( curso =>{
               if(curso.id === infoCurso.id){
                    curso.cantidad++;
                    return curso;
               } else{
                    return curso;
               }
          })
          articulosCarrito = [...cursos];
     } else{
          articulosCarrito = [...articulosCarrito, infoCurso]
     }

     carritoHTML()
}

function carritoHTML(){

     limpiarHTML()

     articulosCarrito.forEach( curso =>{
          const {imagen,titulo,precio,id,cantidad} = curso;
          const row = document.createElement('tr');
          row.innerHTML = `
          <td><img src="${imagen}" style="width:200px"></td>
          <td>${titulo}</td>
          <td>${precio}</td>
          <td>${cantidad}</td>
          <td><a href="#" class="borrar-curso" data-id="${id}"> X </a></td>
     `;

     contenedorCarrito.appendChild(row)

     })

     sincronizarStorage()

}

function limpiarHTML(){
     while(contenedorCarrito.firstChild){
     contenedorCarrito.removeChild(contenedorCarrito.firstChild)
     }
}

function sincronizarStorage(){
     localStorage.setItem('articulosCarrito', JSON.stringify(articulosCarrito))
}