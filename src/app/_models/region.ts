import {Dealer} from "./dealer";
import {Product} from "./product";
import {Facility} from "./facility";

export class Region {
  public region_id: number;
  public title: string;

  constructor(data?: any) {
    if (data) {
      this.region_id = parseInt(data.id, 10);
      this.title = data.title || '';
    } else {
      this.region_id = 0;
      this.title = '';
    }
  }
}
