import { LightningElement, wire,track,api} from 'lwc';
import GetSupplierrDetailsfornewtable from '@salesforce/apex/GetSuppleirDetails.GetSupplierrDetailsfornewtable';
import supplierSection from '@salesforce/apex/GetSuppleirDetails.supplierSection';
import supplierSearchFilter from '@salesforce/apex/GetSuppleirDetails.supplierSearchFilter';
import supplierNamesList from '@salesforce/apex/GetSuppleirDetails.supplierNamesList';
import retrieveRecords from '@salesforce/apex/GetSuppleirDetails.retrieveRecords';
import SendAnEmail from '@salesforce/apex/GetSuppleirDetails.SendAnEmail';
//import sendEmailtoUser from '@salesforce/apex/GetSuppleirDetails.sendEmailtoUser';

export default class SupplierDetailsTable extends LightningElement {

    @track Inventory=[];
    @api pslist;
    @track supplieroptions= [];
    @api supplierlist=[];
    @api productnamee;
    @api value='';
    @api ChangedString;
    @api AllList;
    @api checkboxlist=[];
    @api changevalue;
    @api options;
    @api ischeckvalue;
    @api warehousename;
    @track selectedSupp;
    @api orderQuantity;
    @api orderQuantityList;
    @api inptValue ="";
    @api supplierNamesList = [];
    @api inptq =[];
    connectedCallback(){
        GetSupplierrDetailsfornewtable({pname : this.productnamee})
            .then(result=>{
                console.log('line 13');
            console.log('34:'+JSON.stringify(result));
                this.Inventory=JSON.parse(JSON.stringify(result));
                // this.Inventory=this.Inventory[0];
                console.log('line 15'+JSON.stringify(this.Inventory));
                console.log('line 38'+JSON.stringify(this.Inventory[0].Warehouse__r.Name));
                this.warehousename=this.Inventory[0].Warehouse__r.Name;
                
                
            })
            .catch(error=>{
                console.log('error'+error);
            })
        
           supplierSection({pnamee : this.productnamee}).then(result=>{
                console.log('line 24'+ this.productnamee);
                this.pslist=result;
                this.AllList=result;
                
                console.log('line 26'+  this.pslist);
                this.pslist.forEach(element => {
                    console.log('line 32'+  typeof element.Account__r.Name);
                   // this.supplieroptions.push({label:element.Account__r.Name,value:element.Account__r.Name});
                    //console.log('line 34'+ JSON.stringify(this.supplieroptions));
                    
                    
                });
            
                
            })
            .catch(error=>{
                console.log('error'+error);
            })
            
            supplierNamesList({pnamee : this.productnamee}).then(result=>{
                this.supplierlist.push({label:'All',value:'All'});
                result.forEach(element => {
                    this.supplierlist.push({label:element,value:element});
                    this.supplieroptions = JSON.parse(JSON.stringify(this.supplierlist));
                    console.log('line 53'+JSON.stringify(this.supplieroptions));
                });


            
        })
        .catch(error=>{
            console.log('error'+error);
        })

            

            

            


            /*supplierSearchFilter({}).then(result=>{
                console.log('line 38');
                //this.supplieroptions=result;
                result.forEach(element => {
                    console.log('LINE 42'+JSON.stringify(element));
                    this.supplieroptions.push({label:element,value:element});
                    
                });
                console.log('line 40'+JSON.stringify(this.supplieroptions));
            })
            .catch(error=>{
                console.log('suppler search filter error ==>'+error);
            })*/
            


            


    }
    getQuantity(event){
        //this.inptValue = event.target.value;
    }

    handleOrderQuantity(event){
        let inputId =[];
        let selectedRows = event.target.checked;
        console.log('inndex:'+event.target.dataset.pos);
        console.log('sname'+event.target.dataset.sname);
        inputId.push(event.currentTarget.dataset.pos);

        //console.log('ghsd',this.template.querySelector('input').value);
        if(selectedRows)
        {
            this.inptq.push(this.template.querySelector(`input[data-index="${inputId[0]}"]`).value);
            this.supplierNamesList.push(this.template.querySelector(`input[data-index="${inputId[0]}"]`).dataset.sname);}
        else {
       this.inptq=this.inptq.filter(value=>value !==this.template.querySelector(`input[data-index="${inputId[0]}"]`).value);
       this.supplierNamesList=this.supplierNamesList.filter(value=>value !==this.template.querySelector(`input[data-index="${inputId[0]}"]`).dataset.sname);
     }
            

        
        /*inptq.forEach(field=>{
            console.log(field.value)
        })*/
        
        console.log('inptq',this.inptq)
        console.log('id:'+inputId);
        console.log('snames list : '+this.supplierNamesList);
       // console.log('pslist:'+JSON.stringify(this.pslist));
       // console.log('inputId:'+JSON.stringify(this.pslist[inputId]));
     
       // let sel = this.template.querySelector('.pt-3-half')
       // this.orderQuantity=event.target.value;
        
        // console.log('line 105'+this.inptValue);
    }
   
  




    handleChange(event){
        console.log('line 95');
        this.ChangedString=event.detail.value;
        console.log('line 95'+ this.ChangedString);
        if (this.ChangedString==='All') {
            console.log('line 104');
            this.pslist=this.AllList;
            
        } else {

            retrieveRecords({pnamee: this.productnamee,searchsname: this.ChangedString}).then(result=>{
                console.log('line 13');
                this.pslist=result;
                console.log('line 15'+JSON.stringify(this.pslist));
                
            })
            .catch(error=>{
                console.log('103 error'+error);
            })
            
        }
        
        
    }

    // get options() {
    //     return [
    //         { label: 'Ross', value: 'option1' },
    //         { label: 'Rachel', value: 'option2' },
    //     ];
    // }

    Handlecheckbox(event){
        // this.ischeckvalue=true;
        // console.log('line 138:'+dataset.currentTarget.transfer);
        // //this.checkboxlist.push(event.currentTarget.dataset.transfer);
        // this.checkboxlist.push(event.target.value);
        // this.changevalue=event.target.value;
        // console.log('line 132'+this.checkboxlist);
        let selectedRows = this.template.querySelectorAll('lightning-input');
        for(let i = 0; i < selectedRows.length; i++) {
            if(selectedRows[i].type === 'checkbox') {
                selectedRows[i].checked = event.target.checked;
            }
        }
    }
    

    




    handleSendMail(event){
            this.selectedSupp = [];
            this.orderQuantity='55';
    
            let selectedRows = this.template.querySelectorAll('lightning-input');
    
            // based on selected row getting values of the contact
            for(let i = 0; i < selectedRows.length; i++) {
                if(selectedRows[i].checked && selectedRows[i].type === 'checkbox') {
                    this.selectedSupp.push(
                        // record: selectedRows[i].value,
                         selectedRows[i].dataset.id

                    );
                }
            }
            console.log('Line 171:'+JSON.stringify(this.selectedSupp));
            console.log('192');
            //console.log('193:'+document.getElementById(this.selectedSupp[0]).value);

            SendAnEmail({supplierids : this.selectedSupp,Orderquantity : this.inptq,supplierNamesList : this.supplierNamesList,WarehouseName : this.warehousename}).then(result=>{
                console.log('line 24');
                
                
                console.log('line 26'+ JSON.stringify(result));
                
                
        this.dispatchEvent(new CustomEvent('supplierselection', {detail:{value:"3", label:'Supplier Selection'}}));
            

                
            })
            .catch(error=>{
                console.log('send an email error'+JSON.stringify(error));
            })





            //sendEmailtoUser({prodSupId: this.selectedSupp}).then(result=>{
                //console.log('line 175');
                
            //})
           // .catch(error=>{
                //console.log('103 error'+JSON.stringify(error));
           // })
        }
    

}