import { Component, OnInit } from '@angular/core';
import { BackendService } from '../service/backend.service';
import { IProduct } from '../modal/product';


@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {
  
  i=0
  interval:any
  pageNumber = 1;

  ProductList : IProduct[] = [];

  //loader
  show:boolean= true;
  moreDeals : boolean =true;

  constructor(private backend : BackendService) { }

  async ngOnInit() {
    
    // this is for initial api hit
 this.hitLatestDealsApi()  
 // this is for hitting api every minute
 this.hitApiEveryMinute()

  }

async hitLatestDealsApi()
{
  this.show=true;
  
  this.backend.getLatestDeals(this.pageNumber).subscribe((data)=>
  {
    this.show=false; 
      this.ProductList = [];
    (data as IProduct[]).forEach(element => { 
        this.ProductList.push(element)        
    });      

    if((data as IProduct[]).length%30 == 0)
    {
      this.moreDeals = true;
    }
    else
    {
      this.moreDeals = false;
    }
  })  
}

  async hitApiEveryMinute(){

    this.interval=setInterval(async()=>{
      this.i++;
      this.hitLatestDealsApi()
      // let product =await  this.backend.FetchProduct(this.Link);
     /* Do something here */
    }
    ,10*6000)
  }

  onWindowScroll() {
    this.backend.getLatestDeals(++this.pageNumber).subscribe((data)=>
      {
        (data as IProduct[]).forEach(element => {
          this.ProductList.push(element)
        }); 
      }) 
  }

  MoreDeal(direction : string)
  {
    if(direction === 'next')
    {
      window.scroll(0,0)
      this.backend.getLatestDeals(++this.pageNumber).subscribe((data)=>
      {
        this.ProductList = [];
        (data as IProduct[]).forEach(element => {
          this.ProductList.push(element)
        });      
      }) 
    }else if(direction === 'previous')
    {
      window.scroll(0,0)
      this.backend.getLatestDeals(--this.pageNumber).subscribe((data)=>
      {        
        this.ProductList = [];
        (data as IProduct[]).forEach(element => {
          this.ProductList.push(element)
        });      
      }) 
    }
  }
}