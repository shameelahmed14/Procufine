import { LightningElement ,api,track} from 'lwc';
import OrderRecords from '@salesforce/apex/GetSuppleirDetails.OrderRecords';
import OrderRecordsDatatable from '@salesforce/apex/GetSuppleirDetails.OrderRecordsDatatable';
import searchOrders from '@salesforce/apex/GetSuppleirDetails.searchOrders';
export default class OrdersDatatable extends LightningElement {
    @api OrderList=[];
    @api OrdersLIST=[];
    @api finalisedOrdersList = [];
    @api ProductName;
    @api OrderTypeValue;
    @api finalOrderTypeValue;
    @track columns=[
    
    {
        label: 'Order Id',
        fieldName: 'OrderUrl',
        type : 'url',
        typeAttributes: {label: { fieldName: 'OrderNumber' }, target: '_blank'},
        sortable: true
    },
    {
        label: 'Order Status',
        fieldName: 'Status',
        type: 'text',
        sortable: true
    },
    
    {
        label:  'Supplier Name',
        fieldName: 'suppliername',
        type: 'text',
        sortable: true
    },
    // {
    
    //     label: 'Warehouse',
    //     fieldName: 'warehousename',
    //     type: 'text',
    //     //typeAttributes: {label: { fieldName: 'WarehouseName' }, target: '_blank'},
    //     sortable: true
    // },
    {
        label:  'Order Date',
        fieldName: 'EffectiveDate',
        type: 'date',
        sortable: true
    },
    {
    
        label:  'Order Products',
        fieldName: 'ProductName',
        type: 'text',
        sortable: true
    }
];

HandleOrderType(event) {
    this.OrderTypeValue = event.detail.value;
    console.log('type:'+this.OrderTypeValue);
   /* if (this.OrderTypeValue=='Finalized') {
        this.finalOrderTypeValue=this.OrderTypeValue;
        OrderRecordsDatatable({Ordertypename : this.OrderTypeValue })
    .then(result=>{
       this.finalisedOrdersList=result;
    })
    .catch(error=>{
        console.log('line 80-error'+JSON.stringify(error));
    })

}*/

OrderRecordsDatatable({Ordertypename : this.OrderTypeValue })
.then(result=>{
    console.log('line 52'+result);
    
    console.log('line40')
    let templist=[];
   
    var newData = JSON.parse(JSON.stringify(result));
    console.log('line 44'+JSON.stringify(newData));

    
    newData.forEach(record => {
       let tempRecs = Object.assign({},record);
       console.log('LINE 1'+JSON.stringify(tempRecs));
       
       //tempRecs.SupplierName = record.supplier__c;
       tempRecs.suppliername = record.Account.Name;
       console.log('LINE 2'+record.Account.Name);
       
       tempRecs.OrderUrl='/'+record.Id;
       console.log('LINE 3'+record.Id);
       if(record.Product__r.Name!==null){ tempRecs.ProductName= record.Product__r.Name};
       console.log('LINE 4');
      // if(record.Warehouse__r.Name!==null){ tempRecs.warehousename=record.Warehouse__r.Name};
       
       //if(record.Warehouse__r.Name)tempRecs.warehousename=record.Warehouse__r.Name;
        //Console.log('LINE 5');
       
       templist.push(tempRecs);
       console.log('LINE 6'+templist);
       
    });
    this.OrdersLIST=templist;
    console.log('line 61')
    this.displayFullData=true;
    
    
})
.catch(error=>{
    console.log('line 80-error'+JSON.stringify(error));
})


}



connectedCallback(){
    this.OrderTypeValue='Procured';
    OrderRecordsDatatable({Ordertypename : this.OrderTypeValue })
    .then(result=>{
        console.log('line 52'+result);
        
        console.log('line40')
        let templist=[];
       
        var newData = JSON.parse(JSON.stringify(result));
        console.log('line 44'+JSON.stringify(newData));

        
        newData.forEach(record => {
           let tempRecs = Object.assign({},record);
           console.log('LINE 1'+JSON.stringify(tempRecs));
           
           //tempRecs.SupplierName = record.supplier__c;
           tempRecs.suppliername = record.Account.Name;
           console.log('LINE 2'+record.Account.Name);
           
           tempRecs.OrderUrl='/'+record.Id;
           console.log('LINE 3'+record.Id);
           tempRecs.ProductName= record.Product__r.Name;
           console.log('LINE 4'+record.OrderNumber);
           //tempRecs.warehousename=record.Warehouse__r.Name;
           
           //if(record.Warehouse__r.Name)tempRecs.warehousename=record.Warehouse__r.Name;
            //Console.log('LINE 5');
           
           templist.push(tempRecs);
           console.log('LINE 6'+templist);
        });
        this.OrdersLIST=templist;
        console.log('line 61')
        
        
    })
    .catch(error=>{
        console.log('line 80-error'+JSON.stringify(error));
    })
}
    @track searchData;
    @track errorMsg = '';
    @api strSupplierName = '';
    @api displayFullData;
    
    displayFullData=true;

    handlesuppliername(event) {
        this.strSupplierName = event.detail.value;
        console.log(this.strSupplierName);
        if(!this.strSupplierName) {
            //this.errorMsg = 'Please enter Supplier name to search.';
            this.displayFullData=true;
            this.searchData = undefined;
            return;
        }
        this.displayFullData=false;

        searchOrders({strSupplierName : this.strSupplierName,Ordertypename : this.OrderTypeValue})
        .then(result => {
            let templist=[];
       
        var newData = JSON.parse(JSON.stringify(result));
        console.log('line 44'+JSON.stringify(newData));

        
        newData.forEach(record => {
           let tempRecs = Object.assign({},record);
           console.log('LINE 1'+JSON.stringify(tempRecs));
           
           //tempRecs.SupplierName = record.supplier__c;
           tempRecs.suppliername = record.Account.Name;
           console.log('LINE 2'+record.Account.Name);
           
           tempRecs.OrderUrl='/'+record.Id;
           console.log('LINE 3'+record.Id);
           tempRecs.ProductName= record.Product__r.Name;
           console.log('LINE 4'+record.OrderNumber);
           //tempRecs.warehousename=record.Warehouse__r.Name;
           
           //if(record.Warehouse__r.Name)tempRecs.warehousename=record.Warehouse__r.Name;
            //Console.log('LINE 5');
           
           templist.push(tempRecs);
           console.log('LINE 6'+templist);
        });
        
            this.searchData = templist;
            
        })
        .catch(error => {
            this.searchData = undefined;
            window.console.log('error =====> '+JSON.stringify(error));
            if(error) {
                this.errorMsg = error.body.message;
            }
        }) 
    }

    value = 'Procured';

    get options() {
        return [
            { label: 'Procured', value: 'Procured' },
            { label: 'Finalized', value: 'Finalized' }
        ];
    }

    
    
}