export class Product {
  public id: number;
  public product_id: number;
  public station_id: number;
  public no_of_dispensers: number;
  public make_of_dispensers: string;
  public no_of_storage_tanks: number;
  public storage_tank_capacity: number;
  public no_of_bottles: number;
  public status: string;
  public is_deleted: boolean;
  

  constructor(data?: any) {
    if (data) {
      this.id = parseInt(data.id, 10) || 0;
      this.product_id = parseInt(data.product_id, 10);
      this.station_id = parseInt(data.station_id, 10);
      this.no_of_dispensers = data.no_of_dispensers || 0;
      this.make_of_dispensers = data.make_of_dispensers || '';
      this.no_of_storage_tanks = data.no_of_storage_tanks || 0;
      this.storage_tank_capacity = data.storage_tank_capacity || 0;
      this.no_of_bottles = data.no_of_bottles || 0;
      this.status = data.status || 'disabled';
      this.is_deleted = data.is_deleted || false;
      
      // this.created_at = data.created_at || '';
      // this.updated_at = data.updated_at || '';
      // this.deleted_at = data.deleted_at || '';
    } else {
      this.id = 0;
      this.product_id = 0;
      this.station_id = 0;
      this.no_of_dispensers = 0;
      this.make_of_dispensers = '';
      this.no_of_storage_tanks = 0;
      this.storage_tank_capacity = 0;
      this.no_of_bottles = 0;
      this.status = '';
      this.is_deleted = false;
      
    }
  }
}
