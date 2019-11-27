export class Competitors {
    name: any;
    lat: any;
    lng: any;
    type: any;
    distance: any;

    constructor(data?: any){
        if(data){
            this.name = data.name || '';
            this.lat = data.lat || 0;
            this.lng = data.lng || 0;
            this.type = data.type || '';
            this.distance = data.distance || 0;
        } else {
            this.name = '';
            this.lat = 0;
            this.lng = 0;
            this.type = '';
            this.distance = 0;
        }
    }
}