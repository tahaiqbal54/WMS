export class Dispensers{
    id:number;
    dispenser_type:string;
    dispenser_make:string;
    product_ids: string;
    product_titles: string;
    dispenser_qty:number;
    ownership: any;
    title: string;
    
    
    constructor(data?: any) {
        if (data) {
          this.id = parseInt(data.id, 10);
          this.dispenser_type = data.dispenser_type || '';
          this.dispenser_make = data.dispenser_make || '';
          this.product_ids = data.product_ids || '';
          this.product_titles = data.product_titles || '';
          this.ownership = data.ownership || '';
          this.dispenser_qty = data.dispenser_qty || 0;
          this.title = data.title || '';
          

        } else {
          this.id = 1;
          this.dispenser_type = '';
          this.dispenser_make = '';
          this.product_ids = '';
          this.dispenser_qty = 0;
          this.title = '';
          this.product_titles = '';
          this.ownership = '';
          
        }
      }
}