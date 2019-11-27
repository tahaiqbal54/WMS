import {Dealer} from "./dealer";
import {Product} from "./product";
import {Facility} from "./facility";

export class Territory {

  public territory_id: number;
  public title: string;

  constructor(data?: any) {
    if (data) {
      this.territory_id = parseInt(data.id, 10);
      this.title = data.title || '';
    } else {
      this.territory_id = 0;
      this.title = '';
    }
  }

}
