export class ShipmentHeader {

  public Id: number;
  public SONo: number;
  public CustomerRefNo: string;
  public CustomerId: number;
  public VendorId: number;
  public WarehouseId: number;
  public ReferenceNo1: string;
  public ReferenceNo2: string;
  public ExpectedShipDate: Date;

  constructor(data?: any) {
    
    if (data) {
      
      this.Id = parseInt(data.id, 0);
      this.SONo = parseInt(data.SONo) || 0;
      this.CustomerId = parseInt(data.CustomerId) || 0;
      this.CustomerRefNo = data.CustomerRefNo || '';
      // this.password = data.password;
      this.VendorId = parseInt(data.VendorId) || 0;
      this.WarehouseId = parseInt(data.WarehouseId) || 0;
      this.ReferenceNo1 = data.ReferenceNo1 || '';
      this.ReferenceNo2 = data.ReferenceNo2 || '';
      
      this.ExpectedShipDate = (data.ExpectedShipDate) ? new Date(data.ExpectedShipDate) : null;
      
    } else {
      this.Id = 0;
      this.SONo = 0;
      this.CustomerRefNo = '';
      this.CustomerId = 0;
      this.VendorId = 0;
      this.WarehouseId = 0;
      this.ReferenceNo1 = '';
      this.ReferenceNo2 = '';
      this.ExpectedShipDate = null;
    }
  }
}
