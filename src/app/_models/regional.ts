import { Territory } from './territory';
export class Regional {
  public title: string;
  public id: number;
  public territory_id: number;

  constructor(data?: any) {
    if (data) {
      this.id = parseInt(data.id, 10);
      this.title = data.title || '';
      this.territory_id = data.title || '';
      if (data.Region) {
        this.id = parseInt(data.Region.id, 10) || 0;
      }
      if (data.Territory) {
        this.territory_id = parseInt(data.Territory.id, 10) || 0;
        this.id = parseInt(data.Territory.region_id, 10) || 0;
      }
    } else {
      this.title = '';
    }
  }
}

export class RegionalTerritory {
  title: string;
  public region_id: number;
  public id: number;

  constructor(data?: any) {
    if (data) {
      this.id = parseInt(data.id, 10);
      this.region_id = parseInt(data.id, 10);
      this.title = data.title || '';
      this.region_id = parseInt(data.id, 10);
      if (data.Region) {
        this.region_id = parseInt(data.Region.id, 10) || 0;
      }
      if (data.Territory) {
        this.region_id = parseInt(data.Territory.region_id, 10) || 0;
        this.id = parseInt(data.Territory.id,10) || 0;
      }
    } else {
      this.title = '';
    }
  }
}
