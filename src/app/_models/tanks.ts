export class Tanks{
    id:number;
    tank_capacity:number;
    product_id:number;
    tank_title: string;
    product_title: string;
    
    constructor(data?: any) {
        if (data) {
          this.id = parseInt(data.id, 10);
          this.tank_capacity = data.tank_capacity || 0;
          this.product_id = data.product_id || 0;
          this.tank_title = data.tank_title || '';
          this.product_title = data.product_title || '';

        } else {
          this.id = 1;
          this.tank_capacity = 0;
          this.product_id = 0;
          this.tank_title = '';
          this.product_title = '';
        }
      }
}