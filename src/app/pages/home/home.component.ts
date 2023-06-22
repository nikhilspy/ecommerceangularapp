import { Component, OnInit } from '@angular/core';
import { Subscriber } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  productList: any[]=[];
  cartobj: any={
      "CartId": 0,
      "CustId": 1,
      "ProductId": 0,
      "Quantity": 0,
      "AddedDate": "2023-06-21T11:49:04.162Z"
    
  }

  constructor(private productService: ProductService){

  }

  ngOnInit(): void {
    this.loadAllProducts();
  }

  loadAllProducts(){
    this.productService.getAllProducts().subscribe((result:any)=>{
      this.productList = result.data;
    })
  }

  addItemToCart(productId: number){
    this.cartobj.ProductId = productId;
    this.productService.addTocart(this.cartobj).subscribe((result:any)=>{
      if(result.result){
        alert("Product Added To Cart");
        this.productService.cartAddedSubject.next(true);
      }
  })


}

}
