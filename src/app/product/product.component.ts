import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct, Product } from '../modal/product';
import { BackendService } from '../service/backend.service';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  constructor(private activatedRoute : ActivatedRoute, private backend : BackendService, private metaTagService: Meta) { }

  Product : IProduct;
  ngOnInit(): void {
    if(history.state.data !== undefined)
    {
      this.Product = history.state.data.product;  
      this.SetMetaTag();  
    }else
    {
      this.backend.GetLatestDealsByID(this.activatedRoute.snapshot.params.id).subscribe((data)=>
      {
        this.Product = (data as IProduct[])[0]   
        this.SetMetaTag();
      })    
    }

    

  }
  UpdateProduct(product : Product)
  {    
    this.Product = product; 
  }

  SetMetaTag()
  {
    this.metaTagService.addTags([
      { property: 'og:title', content: this.Product.name },
      { property: 'og:description', content: this.Product.name },
      { property: 'og:url', content: 'https://lootersbox.com/product/'+this.Product.id },
      { property: 'og:image', content: 'https://lootersbox.com/deal/'+this.Product.image },
      { property: 'og:site_name', content: 'LootersBox' },
      { property: 'og:image:width', content: '500' },
      { property: 'og:image:height', content: '500' },

      { name: 'twitter:title', content: this.Product.name },
      { name: 'twitter:description', content: this.Product.name },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:image', content: this.Product.image },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' }
    ]);

  }

}
