<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Clients;
use App\ClientAddress;
use App\ClientContacts;

class ClientsController extends Controller
{

    // Create Builder

    public function CreateClients(request $request){

        $data = $request->details;

        $newclient = new Clients();

            $newclient->fill([
                'client_code' => $data['client_code'],
                'client_name'=> $data['client_name'],
                'company_name'=> $data['company_name'],
                'default_delivery_address'=> $data['default_delivery_address'],
                'sales_person' => $data['sales_person'],
                'client_notes' => $data['client_notes'],
                'acn' => $data['acn'],
                'client_logo' => $data['client_logo']

            ]);

            $newclient->save();

            //Clients Address
            $address_data = $request->address;

            $clients_address = new ClientAddress();
            $clients_address->fill([
                'postal_address_name' => $address_data['postal_address_name'],
                'postal_address_line_1' => $address_data['postal_address_line_1'],
                'postal_address_line_2' => $address_data['postal_address_line_2'],
                'postal_suburb' => $address_data['postal_suburb'],
                'postal_town_city' => $address_data['postal_town_city'],
                'postal_state_region' => $address_data['postal_state_region'],
                'postal_postal_code' => $address_data['postal_postal_code'],
                'postal_country' => $address_data['postal_country'] ,
                'physical_address_name' => $address_data['physical_address_name'],
                'physical_address_line_1' => $address_data['physical_address_line_1'],
                'physical_address_line_2' => $address_data['physical_address_line_2'],
                'physical_suburb' => $address_data['physical_suburb'],
                'physical_town_city' => $address_data['physical_town_city'],
                'physical_state_region' => $address_data['physical_state_region'],
                'physical_postal_code' => $address_data['physical_postal_code'],
                'physical_country' => $address_data['physical_country']
            ]);


            $newclient->ClientAddress()->save($clients_address);

            // Clients Contacts




            $contacts_data = $request->contacts;

            foreach ($contacts_data as  $contact_value) {
                $clients_contacts = new ClientContacts();
                $clients_contacts->fill([
                    'first_name' => $contact_value['first_name'],
                    'last_name' => $contact_value['last_name'],
                    'email' => $contact_value['email'],
                    'website' => $contact_value['website'],
                    'toll_free_no' => $contact_value['toll_free_no'],
                    'phone' => $contact_value['phone'],
                    'fax' => $contact_value['fax'],
                    'mobile' => $contact_value['mobile'],
                    'ddi' => $contact_value['ddi'],
                    'invoicing' => $contact_value['invoicing'],
                    'shipping' => $contact_value['shipping'],
                    'primary_contact' => $contact_value['primary_contact']
                ]);

                $newclient->ClientContacts()->save($clients_contacts);

           }

            return response()->json(['status' => true, 'message' => 'Client has been created successfully.'], 200);



    }

    // Update Builder

    public function Updateclient(request $request){


        $data = $request->details;

        $newclient = Clients::where('id', '=', $request->id)->first();

            $newclient->update([
                'client_code' => $data['client_code'],
                'client_name'=> $data['client_name'],
                'company_name'=> $data['company_name'],
                'default_delivery_address'=> $data['default_delivery_address'],
                'sales_person' => $data['sales_person'],
                'client_notes' => $data['client_notes'],
                'acn' => $data['acn'],
                'client_logo' => $data['client_logo']
            ]);

            $newclient->save();

            //Clients Address
            $address_data = $request->address;

            $clients_address = ClientAddress::where('address_id', '=', $request->id)->first();
            $clients_address->update([
                'postal_address_name' => $address_data['postal_address_name'],
                'postal_address_line_1' => $address_data['postal_address_line_1'],
                'postal_address_line_2' => $address_data['postal_address_line_2'],
                'postal_suburb' => $address_data['postal_suburb'],
                'postal_town_city' => $address_data['postal_town_city'],
                'postal_state_region' => $address_data['postal_state_region'],
                'postal_postal_code' => $address_data['postal_postal_code'],
                'postal_country' => $address_data['postal_country'] ,
                'physical_address_name' => $address_data['physical_address_name'],
                'physical_address_line_1' => $address_data['physical_address_line_1'],
                'physical_address_line_2' => $address_data['physical_address_line_2'],
                'physical_suburb' => $address_data['physical_suburb'],
                'physical_town_city' => $address_data['physical_town_city'],
                'physical_state_region' => $address_data['physical_state_region'],
                'physical_postal_code' => $address_data['physical_postal_code'],
                'physical_country' => $address_data['physical_country']
            ]);


            $newclient->ClientAddress()->save($clients_address);

            // Clients Contacts




            $contacts_data = $request->contacts;

            foreach ($contacts_data as  $contact_value) {

              if(!empty($contact_value['id'])){
                $clients_contacts =ClientContacts::where('id', '=', $contact_value['id'])->update([
                    'first_name' => $contact_value['first_name'],
                    'last_name' => $contact_value['last_name'],
                    'email' => $contact_value['email'],
                    'website' => $contact_value['website'],
                    'toll_free_no' => $contact_value['toll_free_no'],
                    'phone' => $contact_value['phone'],
                    'fax' => $contact_value['fax'],
                    'mobile' => $contact_value['mobile'],
                    'ddi' => $contact_value['ddi'],
                    'invoicing' => $contact_value['invoicing'],
                    'shipping' => $contact_value['shipping'],
                    'primary_contact' => $contact_value['primary_contact']
                ]);

              }else{
                   $clients_contacts_new = new ClientContacts();
                   $clients_contacts_new->fill([
                        'first_name' => $contact_value['first_name'],
                        'last_name' => $contact_value['last_name'],
                        'email' => $contact_value['email'],
                        'website' => $contact_value['website'],
                        'toll_free_no' => $contact_value['toll_free_no'],
                        'phone' => $contact_value['phone'],
                        'fax' => $contact_value['fax'],
                        'mobile' => $contact_value['mobile'],
                        'ddi' => $contact_value['ddi'],
                        'invoicing' => $contact_value['invoicing'],
                        'shipping' => $contact_value['shipping'],
                        'primary_contact' => $contact_value['primary_contact']
                ]);

                $newclient->ClientContacts()->save($clients_contacts_new);
              }

           }

            return response()->json(['status' => true, 'message' => 'Client has been updated successfully.'], 200);
    }

    // Get Builders

    public function GetClients(request $request){

        $clients=Clients::get();

        if(empty($clients)){

            return response()->json(['status' => false,'message' => 'Nothing found'], 200);

        }else{

            return response()->json(['status' => true,'getclients' => $clients], 200);
        }


    }

    // Get Single Builder

    public function GetSingleClient($id){
       $clients=Clients::with('ClientAddress', 'ClientContacts')
         ->where('id','=',  $id)
         ->get();

       if(empty($clients)){

           return response()->json(['status' => false,'message' => 'Nothing found'], 200);

       }else{

           return response()->json(['status' => true,'getclient' => $clients], 200);
       }

    }

    // Delete Single Builder

    public function DeleteSingleClient($id){

        $clients = Clients::where('id', '=',  $id)->delete();

        if(empty($clients)){

            return response()->json(['status' => false,'error' => 'Error in deleting partnership'], 200);

        }else{

            return response()->json(['status' => true,'singlepartnerships' => 'Deleted Successfully'], 200);
        }

    }

}
