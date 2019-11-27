export class Facility {
  public id: number;
  public facility_id: number;
  public station_id: number;
  public name: string;
  public type: string;
  public properties: any;
  public status: string;
  public is_deleted: boolean;
  public image_paths: any;

  constructor(data?: any) {
    if (data) {
      this.id = parseInt(data.id, 10);
      this.facility_id = parseInt(data.facility_id, 10);
      this.station_id = parseInt(data.station_id, 10);
      this.name = data.name || '';
      this.type = data.type || '';
      this.properties = data.properties || '';
      this.status = data.status || 'active';
      this.is_deleted = data.is_deleted || false;
      this.image_paths = data.image_paths || [];
      // this.created_at = data.created_at || '';
      // this.updated_at = data.updated_at || '';
      // this.deleted_at = data.deleted_at || '';
    } else {
      this.id = 0;
      this.facility_id = 0;
      this.name = '';
      this.type = '';
      this.properties = '';
      this.status = 'active';
      this.is_deleted = false;
      this.image_paths = [];
    }
  }
}
