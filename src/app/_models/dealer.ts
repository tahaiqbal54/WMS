export class Dealer {
  public id: number;
  public name: string;
  public mobile_number: string;
  public email: string;

  constructor(data?: any) {
    if (data) {
      this.id = parseInt(data.id, 10) || 0;
      this.name = data.name || '';
      this.mobile_number = data.mobile_number || '';
      this.email = data.email || '';
      // this.created_at = data.created_at || '';
      // this.updated_at = data.updated_at || '';
      // this.deleted_at = data.deleted_at || '';
    } else {
      this.id = 0;
      this.name = '';
      this.mobile_number = '';
      this.email = '';
    }
  }
}
