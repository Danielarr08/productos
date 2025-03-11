import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductoService } from '../app/services/producto.service';

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ejemplo3';
  isEditing = false; // Controla si se está editando un producto

  producto = {
    id: '',
    descripcion: '',
    precio: 0
  };

  productos = [
    { id: '1', descripcion: 'Sabritas', precio: 20 },
    { id: '2', descripcion: 'Coca-Cola 600ml', precio: 18 },
    { id: '3', descripcion: 'Jugo de naranja', precio: 25 },
    { id: '4', descripcion: 'Agua embotellada', precio: 12 },
    { id: '5', descripcion: 'Galletas Oreo', precio: 15 }
  ];

  constructor(@Inject(ProductoService) private productoService: ProductoService) {}

  // Función para agregar un producto
  agregarProducto() {
    if (!this.producto.id) {
      alert('El ID debe ser proporcionado');
      return;
    }

    // Verificar que el ID no esté repetido
    for (let i = 0; i < this.productos.length; i++) {
      if (this.producto.id === this.productos[i].id) {
        alert('El ID ya existe');
        return;
      }
    }

    this.productos.push({
      id: this.producto.id,
      descripcion: this.producto.descripcion,
      precio: this.producto.precio
    });

    this.productoService.agregarProducto(this.producto);
    this.limpiarFormulario(); // Llamar a la función de limpiar
  }

  // Función para seleccionar un producto y habilitar edición
  seleccionarProducto(productoSeleccionado: { id: string; descripcion: string; precio: number }) {
    this.producto.id = productoSeleccionado.id;
    this.producto.descripcion = productoSeleccionado.descripcion;
    this.producto.precio = productoSeleccionado.precio;
    this.isEditing = true; // Bloquear edición del ID
  }

  // Función para modificar un producto
  modificarProducto() {
    for (let i = 0; i < this.productos.length; i++) {
      if (this.producto.id === this.productos[i].id) {
        this.productos[i].descripcion = this.producto.descripcion;
        this.productos[i].precio = this.producto.precio;

        this.productoService.modificarProducto(this.producto);
        this.limpiarFormulario(); // Reiniciar formulario después de modificar
        return;
      }
    }

    alert('El ID no existe');
  }

  // Función para eliminar un producto
  eliminarProducto(id: string) {
    for (let i = 0; i < this.productos.length; i++) {
      if (id === this.productos[i].id) {
        this.productos.splice(i, 1);

        this.productoService.eliminarProducto(this.producto);
        this.limpiarFormulario(); // Reiniciar formulario después de eliminar
        return;
      }
    }

    alert('El ID no existe');
  }

  // Función para limpiar el formulario
  limpiarFormulario() {
    this.producto = {
      id: '',
      descripcion: '',
      precio: 0
    };
    this.isEditing = false; // Permitir que se ingrese un nuevo ID
  }
}
