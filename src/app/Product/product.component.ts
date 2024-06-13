import { Component, OnInit } from '@angular/core';
import { ProductService } from './product.service';
import { Product } from './product';
import { PrimeIcons } from 'primeng/api';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  products:Product[]=[];
  displayAddEditModal=false;
  selectedProduct:any=null;
  constructor(private productService:ProductService) { }

  ngOnInit(): void {
    this.getProductList();
  }

  getProductList(){
      this.productService.getProducts().subscribe(
        response=>{
          this.products=response;
        },
        error=>{
          console.log("Error Occured");
         }
      )
  }

  showAddModal(){
    this.displayAddEditModal=true;
    this.selectedProduct=null;
  }
  hideAddModal(isClosed:boolean){
    this.displayAddEditModal=!isClosed;
  }
 
  SaveOrUpdateProduct(newData:any){
    this.products.unshift(newData);
    }

 
  showEditModal(product:Product){
    this.displayAddEditModal = true;
    this.selectedProduct = product;
    
  }

  DeleteProduct(product:Product){
    this.productService.DeleteProduct(product.id).subscribe(
      response=>{
        this.products=this.products.filter(data => data.id !== product.id); 
        alert("Data has been deleted Succesfully")
      },
      error=>{
        console.log("Error Occured");
       }
    )
  }
  

}
