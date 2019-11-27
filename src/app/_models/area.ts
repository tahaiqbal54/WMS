import { Competitors } from './competitors';

export class Area {
    id: any;
    station_id: any;
    competitors: Competitors [];
    trade_area_polygon:any = [];
    constructor(data?: any) {
        if (data) {
          this.id = parseInt(data.id, 10) || 0;
          this.station_id = data.station_id || 0;
          this.trade_area_polygon = data.trade_area_polygon || [];

        this.competitors = [];
        if(data.competitors){
         data.competitors.forEach((competitors) => {
          this.competitors.push(new Competitors(competitors));
      });
    }
        } else {
          this.id = 0;
          this.station_id = 0;
          this.trade_area_polygon = [];
          this.competitors = [];
        }
      }
}