import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators,FormControl} from '@angular/forms';//its using for form
import {ActivatedRoute,Router} from '@angular/router';
import {Location} from '@angular/common';
//services
import {BuilderserviceService} from '../../builderservice.service';
import {LoginserviceService} from '../../loginservice.service';
@Component({
  selector: 'app-newbuilder',
  templateUrl: './newbuilder.component.html',
  styleUrls: ['./newbuilder.component.css']
})
export class NewbuilderComponent implements OnInit {
   same_as_postal_address:boolean = false;
  //forms
  builder_form:FormGroup;
  details_form:FormGroup;
  address_form:FormGroup;
  contacts_form:FormGroup;
  //form data;
  details_data;
  address_data;
  contact_data=[];
  // final form data
  form_data={};
  builder;

  client_logo_preview;
  id;
  update_button = false;
  updating_contact_index;
  contact_update_button = false;

  already_primary= false; // for primary contact

  available_address=[];
  constructor(private location:Location,private router:Router,private route:ActivatedRoute,private service:BuilderserviceService,private loginService:LoginserviceService,private formData: FormBuilder) {
    this.details_form = formData.group({
      client_code : new FormControl('',Validators.required),
      client_name: new FormControl('',Validators.required),
      company_name: new FormControl('',Validators.required),
      default_delivery_address: new FormControl('',Validators.required),
      sales_person: new FormControl('', Validators.required),
      client_notes: new FormControl('',Validators.required),
      acn:new FormControl('',Validators.required),
      client_logo: new FormControl('',Validators.required)

    })
      //Address tab data
    this.address_form = formData.group({
      //postal address data
        postal_address_name:new FormControl('',Validators.required),
        postal_address_line_1:new FormControl(''),
        postal_address_line_2:new FormControl(''),
        postal_suburb:new FormControl('',Validators.required),
        postal_town_city:new FormControl('',Validators.required),
        postal_state_region:new FormControl('',Validators.required),
        postal_postal_code:new FormControl('',Validators.required),
        postal_country:new FormControl('Australia',Validators.required),

        same_as_postal_address:new FormControl(false,),
      //Physical address data
        physical_address_name:new FormControl('',Validators.required),
        physical_address_line_1:new FormControl(''),
        physical_address_line_2:new FormControl(''),
        physical_suburb:new FormControl('',Validators.required),
        physical_town_city:new FormControl('',Validators.required),
        physical_state_region:new FormControl('',Validators.required),
        physical_postal_code:new FormControl('',Validators.required),
        physical_country:new FormControl('Australia',Validators.required,)
      });
      //Contacts tab data
      this.contacts_form = formData.group({
        first_name:new FormControl('',Validators.required),
        last_name:new FormControl('',Validators.required),
        email:new FormControl('',Validators.email),
        website:new FormControl(''),
        toll_free_no:new FormControl(''),
        phone:new FormControl(''),
        fax:new FormControl(''),
        mobile:new FormControl(''),
        ddi:new FormControl(''),
        invoicing:new FormControl(false),
        shipping:new FormControl(false),
        primary_contact:new FormControl(false)
      });
  }

  ngOnInit() {
    //For Upadting builder's information
    this.route.params.subscribe(params=>{
      this.id = params['id'];

      if(this.id){
        this.service.getSingleClient(this.id).subscribe((data)=>{
          if (data.status) {
            this.builder = data.getclient[0];

            // putting builder data into Forms
            this.details_form.setValue({
              client_code:this.builder.client_code,
              client_name:this.builder.client_name,
              company_name:this.builder.company_name,
              default_delivery_address:this.builder.default_delivery_address,
              sales_person:this.builder.sales_person,
              client_notes:this.builder.client_notes,
              acn: this.builder.acn,
              client_logo: this.builder.client_logo
            })
            this.address_form.setValue({
              postal_address_name: this.builder.client_address.postal_address_name,
              postal_address_line_1: this.builder.client_address.postal_address_line_1,
              postal_address_line_2: this.builder.client_address.postal_address_line_2,
              postal_suburb: this.builder.client_address.postal_suburb,
              postal_town_city: this.builder.client_address.postal_town_city,
              postal_state_region: this.builder.client_address.postal_state_region,
              postal_postal_code: this.builder.client_address.postal_postal_code,
              postal_country: this.builder.client_address.postal_country,
              same_as_postal_address:false,
              physical_address_name: this.builder.client_address.physical_address_name,
              physical_address_line_1: this.builder.client_address.physical_address_line_1,
              physical_address_line_2: this.builder.client_address.physical_address_line_2,
              physical_suburb: this.builder.client_address.physical_suburb,
              physical_town_city: this.builder.client_address.physical_town_city,
              physical_state_region: this.builder.client_address.physical_state_region,
              physical_postal_code: this.builder.client_address.physical_postal_code,
              physical_country: this.builder.client_address.physical_country
            });
            this.save_address();

            this.contact_data = this.builder.client_contacts;
            this.contact_data.forEach((item)=>{
              console.log(item);
              if(item.primary_contact){
                console.log(item);
                this.already_primary = true;
              }
            })



            this.client_logo_preview = this.builder.client_logo;
            this.update_button = true;
          }
        })
      }
    })
  }

  //set new function on details click


   add_details(obj){
     this.details_data = obj;
   }

   same_as_address(obj){
     if(obj.same_as_postal_address){
       this.address_form.patchValue({
          postal_address_name: this.address_form.get('postal_address_name').value,
          postal_address_line_1: this.address_form.get('postal_address_line_1').value,
          postal_address_line_2: this.address_form.get('postal_address_line_2').value,
          postal_suburb: this.address_form.get('postal_suburb').value,
          postal_town_city: this.address_form.get('postal_town_city').value,
          postal_state_region: this.address_form.get('postal_state_region').value,
          postal_postal_code: this.address_form.get('postal_postal_code').value,
          postal_country: this.address_form.get('postal_country').value,

          physical_address_name: this.address_form.get('postal_address_name').value,
          physical_address_line_1: this.address_form.get('postal_address_line_1').value,
          physical_address_line_2: this.address_form.get('postal_address_line_2').value,
          physical_suburb: this.address_form.get('postal_suburb').value,
          physical_town_city: this.address_form.get('postal_town_city').value,
          physical_state_region: this.address_form.get('postal_state_region').value,
          physical_postal_code: this.address_form.get('postal_postal_code').value,
          physical_country: this.address_form.get('postal_country').value
       })
     }
    }

   add_address(obj){
     this.address_data = obj;
   }

   add_contact(obj){
     if(obj.primary_contact){
       this.already_primary = true;
     }
     else{
       obj.primary_contact = false;
     }
     this.contact_data.push(obj);
   }

   createBuilder(details_data,address_data){
     console.log('vhjvjh');
       this.form_data['details'] = details_data;
       this.form_data['address'] = address_data;
       this.form_data['contacts'] = this.contact_data;
     if(this.contact_data.length === 0){
       this.loginService.notification.notification_status=true;
       this.loginService.notification.notification_message="You haven't added any contact."
       this.loginService.notification.action_status=false;
       window.setTimeout(()=>{
       this.loginService.notification.notification_status=false;
       this.loginService.notification.notification_message="";
       },2500);
       return false;
     }

     else{
       this.service.createClients(this.form_data).subscribe((data)=>{
         if(data.status){
           this.details_form.reset();
           this.address_form.reset();
           // setting Notification
           this.loginService.notification.notification_status=true;
           this.loginService.notification.action_status = true;
           this.loginService.notification.notification_message = 'Builder created successfully.';
           //navigate back to all builders page
           this.router.navigate(['../'],{relativeTo:this.route});
         }
       });
     }
   }

   update_builder(details_form_data, address_form_data){
     if(this.contact_data.length === 0){
       alert("you haven't added any contact");
     }
     else{
       this.form_data['id'] = this.id;
       this.form_data['details'] = details_form_data;
       this.form_data['address'] = address_form_data;
       this.form_data['contacts'] = this.contact_data;
       this.service.updateClient(this.form_data).subscribe((data)=>{
         if (data.status) {
           this.details_form.reset();
           this.address_form.reset();
           this.update_button = false;
           // setting Notification
           this.loginService.notification.notification_status=true;
           this.loginService.notification.action_status = true;
           this.loginService.notification.notification_message = 'Builder updated successfully.';
           //navigate back to all builders page
           this.location.back();
         }
       });
     }
   }

   delete_contact(i){
     if(this.contact_data[i].primary_contact){
       this.already_primary = false;
     }
     this.contact_data.splice(i,1);
   }
   edit_contact(i){
     this.updating_contact_index = i;
     this.contact_update_button = true;
     this.contacts_form.setValue({
      first_name: this.contact_data[i].first_name,
      last_name: this.contact_data[i].last_name,
      email: this.contact_data[i].email,
      website: this.contact_data[i].website,
      toll_free_no: this.contact_data[i].toll_free_no,
      phone: this.contact_data[i].phone,
      fax: this.contact_data[i].fax,
      mobile: this.contact_data[i].mobile,
      ddi: this.contact_data[i].ddi,
      invoicing: this.contact_data[i].invoicing,
      shipping: this.contact_data[i].shipping,
      primary_contact: this.contact_data[i].primary_contact
     })
   }
   update_contact(obj){
     if(obj.primary_contact){
       this.already_primary = false;
     }
     this.contact_data[this.updating_contact_index].first_name = obj.first_name
     this.contact_data[this.updating_contact_index].last_name = obj.last_name
     this.contact_data[this.updating_contact_index].email = obj.email
     this.contact_data[this.updating_contact_index].website = obj.website
     this.contact_data[this.updating_contact_index].toll_free_no = obj.toll_free_no
     this.contact_data[this.updating_contact_index].phone = obj.phone
     this.contact_data[this.updating_contact_index].fax = obj.fax
     this.contact_data[this.updating_contact_index].mobile = obj.mobile
     this.contact_data[this.updating_contact_index].ddi = obj.ddi
     this.contact_data[this.updating_contact_index].invoicing = obj.invoicing
     this.contact_data[this.updating_contact_index].shipping = obj.shipping
     this.contact_update_button = false;
   }
   // builder logo upload
   client_logo_upload(event){
    let files = event.target.files;
    let file = files[0];
    let formData = new FormData();
    if(file){
      formData.append('file',file,file.name);
      this.service.builderImageUpload(formData).subscribe((data)=>{
        if(data.status){
          this.details_form.controls['client_logo'].setValue(data.link);
          this.client_logo_preview = data.link;
        }
        else{
          alert('error while uploading image');
        }
      })
    }
  }

  // populating address for details tab
  save_address(){
    var temp = this.address_form.value;
    var addresses =[];
    if(temp.postal_address_name == temp.physical_address_name && temp.postal_suburb == temp.physical_suburb){
      addresses.push(temp.physical_address_name);
    }
    else{
      addresses.push(this.address_form.get('postal_address_name').value);
      addresses.push(this.address_form.get('physical_address_name').value);
    }
    this.available_address = addresses;
  }
}
