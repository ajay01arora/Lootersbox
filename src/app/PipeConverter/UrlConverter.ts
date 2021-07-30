import { Pipe, PipeTransform } from "@angular/core";
import { IProduct } from '../modal/product';

@Pipe({
    name: "urlConverter"
})

export class UrlConverter implements PipeTransform
{
    transform(product : IProduct) : string
    {
        let retVal : string = product.url;
        if(product.logo === "amazon")
        {
            if(product.url.indexOf('tag=') === -1)
            {
                if(product.url.indexOf('?') === -1)
                {
                    retVal = product.url+'?tag=lootersbox-21';
                }
                else
                {
                    retVal = product.url+'&tag=lootersbox-21';
                }

            }else
            {
                let temp = product.url.split('tag=',3);
                let temp1 = temp[1].split('21',2);
                retVal = temp1.length > 1 ? temp[0]+'tag=lootersbox-21'+temp1[1] : temp[0]+'tag=lootersbox-21';            
            }
        }
        else if(product.logo === "flipkart")
        {
            retVal = "https://inr.deals/track?id=com416068710&src=backend&url="+product.url;
        }               
        
        return retVal;

    }
}