import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ProductService } from './product.service';
import { Product } from './product';
import { Message, PrimeIcons } from 'primeng/api';
import { FormBuilder, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { MessagesModule } from 'primeng/messages';

@Component({
  selector: 'app-add-edit-product',
  templateUrl: './add-edit-product.component.html',
  styleUrls: ['./add-edit-product.component.scss']
})
export class AddEditProductComponent implements OnInit, OnChanges {
 @Input() displayAddEditModal:boolean=true;
 @Input() selectedProduct:any=null;
 @Input() addMessages:any
 @Output() clickClose:EventEmitter<boolean>=new EventEmitter<boolean>();
 @Output() clickAddEdit:EventEmitter<any>=new EventEmitter<any>();
 modalType='Add';
  
    productForm=this.fb.group({
    title:["", Validators.required],
    price:[0,Validators.required],
    description:[""],
    category:["", Validators.required]
 }) 
 constructor(private fb:FormBuilder, private productService:ProductService, private messagemodule:MessagesModule) { }
 
  ngOnInit(): void {

  }
  ngOnChanges(changes: SimpleChanges): void {
      if(this.selectedProduct){
        this.modalType='Edit';
        this.productForm.patchValue(this.selectedProduct)
      }else{
        this.selectedProduct.reset();
        this.modalType='Add';
      }
  }
  CloseModal(){
    this.productForm.reset();
    this.clickClose.emit(true);
  }
  addEditProduct(){
    this.productService.SaveEditProduct(this.productForm.value, this.modalType).subscribe(
        response=>{

            this.clickAddEdit.emit(response);
            alert("Data has been successfully added");
            this.CloseModal();
           
            
        },
       error=>{
        console.log("Error Occured");
       }
        
    )
  }
 

 
 
 
  

}
