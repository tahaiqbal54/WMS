export class OrderHeader {

  public Id: number;
  public ASNNO: string;
  public ASNDate: Date;
  public ExternReceiptNo: string;
  public CustomerId: number;
  public VendorId: number;
  public WarehouseId: number;
  public ReferenceNo1: string;
  public ReferenceNo2: string;
  public RequiredQC: boolean;
  public ExpectedRecvDate: Date;

  constructor(data?: any) {
    console.log('Enter1');
    if (data) {
      console.log('Enter2');
      this.Id = parseInt(data.id, 0);
      this.ASNNO = data.ASNNO || '';
      this.ASNDate = (data.ASNDate) ? new Date(data.ASNDate) : null;
      this.ExternReceiptNo = data.ExternReceiptNo || '';
      this.CustomerId = parseInt(data.CustomerId) || 0;
      // this.password = data.password;
      this.VendorId = parseInt(data.VendorId) || 0;
      this.WarehouseId = parseInt(data.WarehouseId) || 0;
      this.ReferenceNo1 = data.ReferenceNo1 || '';
      this.ReferenceNo2 = data.ReferenceNo2 || '';
      this.RequiredQC = data.RequiredQC || false;
      this.ExpectedRecvDate = (data.ExpectedRecvDate) ? new Date(data.ExpectedRecvDate) : null;
      
    } else {
      this.Id = 0;
      this.ASNNO = '';
      this.ASNDate = null;
      this.ExternReceiptNo = '';
      this.CustomerId = 0;
      this.VendorId = 0;
      this.WarehouseId = 0;
      this.ReferenceNo1 = '';
      this.ReferenceNo2 = '';
      this.RequiredQC = false;
      this.ExpectedRecvDate = null;
    }
  }
}
