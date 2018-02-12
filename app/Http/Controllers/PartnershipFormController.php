<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\PartnershipForm;
use App\PartnershipFormMeta;
use App\User;

class PartnershipFormController extends Controller
{
    public function PartnershipForm(request $request){
           
          $formdata = new PartnershipForm();
          $formmeta;
          GLOBAL $form_version;
           if($request->form_id){ 

               $form_previous_version = PartnershipForm::where('form_id', '=', $request->form_id)->first();

               if ($form_previous_version->status == 0) {
                   $form_version = $form_previous_version->form_version+1;
               }
               elseif ($form_previous_version->status == 1) {
                   $form_version = 1;
               }
                // if(empty($formversion->form_version)){
                // }
                // else{
                // }
               
               $formdata = PartnershipForm::where('form_id', '=', $request->form_id)->first();              
           
               $formdata->update([  
                   'admin_id' => $request->id,
                   'form_id'=> $request->form_id,
                   'form_version'=> $form_version,
                   'status'=> $request->status
                   
               ]);

               $formdata->save();

               $data = $request->form_step_data;

               foreach ($data as $key=> $value){ 

               $check_key =  PartnershipFormMeta::where('meta_id', '=', $request->form_id)
                   ->where('key', '=', $key)->first();
               
               if(!empty($check_key)){          
                   $check_key->key = $key;
                   $check_key->value = $value;
                   $formdata->FormMeta()->save($check_key);                
               }    
               else{
                   $formmeta= new PartnershipFormMeta();
                   
                   $formmeta->key = $key;
                   $formmeta->value = $value;

                   $formdata->FormMeta()->save($formmeta);
                }
               }
           
             $returndata = PartnershipFormMeta::where('meta_id', '=', $formdata->form_id)
                   ->where('key', '=', $key)->first();

             return response()->json(['status' => true,'formdata' =>$formdata, 'metadata' => $returndata], 200);

           }else{

                 
               
                $form_id =$request->id.time(); 

                $formversion = PartnershipForm::where('status', '=', 0)->get();
               
                if(empty($formversion->form_version)){
                   $form_version = 1;
                   
                }
                else{
                   $form_version = $formversion->form_version + 1;
                }
               
               
                $formdata->fill([
                   'admin_id' => $request->id,
                   'form_id'=> $form_id,
                   'form_version'=> $form_version,
                   'status'=> $request->status
                   
               ]);

               $formdata->save();

               $data = $request->form_step_data;

               foreach ($data as $key=> $value){  

               $formmeta = new PartnershipFormMeta();
               $formmeta->key = $key;
               $formmeta->value =$value;
               $formdata->FormMeta()->save($formmeta);
               
               }
              $returndata = PartnershipFormMeta::where('meta_id', '=', $formdata->form_id)
                   ->where('key', '=', $key)->first();

              return response()->json(['status' => true,'formdata' =>$formdata, 'metadata' => $returndata], 200);
           }
   }


    // Get Partnership Form

     public function GetPartnershipForm(){
      
        $data_array=[];

        $partnershipform = PartnershipForm::all();
         
         foreach ($partnershipform as $key => $data) {
           $temp;
           $temp['form_data'] = $data;
           $user = User::where('id', '=', $data->admin_id)->first();
           $temp['user'] = $user;

           array_push($data_array, $temp);
        }

        
        

        return response()->json(['status' => true,'formdata' =>$data_array], 200);
                                    
     }

     // Get Published Partnership Form
     public function GetPublishedPartnershipForm(){
      

        $partnershipform = PartnershipForm::with('FormMeta')->where('status', '=', '0')->first();

        return response()->json(['status' => true,'formdata' =>$partnershipform], 200);
                                    
     }

     // Get Single Partnership Form
     public function GetSinglePartnershipForm($id){
        
        $partnershipform = PartnershipForm::with('FormMeta')->where('form_id', '=', $id)->first();
        
        $temp = PartnershipFormMeta::where('meta_id', '=',$id)->get();
        // $temp = PartnershipFormMeta::select('key', 'value')->where('meta_id', '=',$id)->get();

        return response()->json(['status' => true,'formdata' =>$partnershipform], 200);
                                    
     }

    public function PublishForm(request $request){
      // checking if the form is complete or not
      if(PartnershipFormMeta::where('meta_id', '=', $request->form_id)
                              ->where('key', '=', 'step_15_data')->exists())
      {
        $publish =  PartnershipForm::where('status', '=', 0)->first();
        if(!empty($publish)){
          $publish->update(['status' => 2]);
        }

        PartnershipForm::where('form_id', '=', $request->form_id)->update(['status' => $request->status]);
      
        $data_array=[];

        $partnershipform = PartnershipForm::all();
         
         foreach ($partnershipform as $key => $data) {
          $temp;
          $temp['form_data'] = $data;
          $user = User::where('id', '=', $data->admin_id)->first();
          $temp['user'] = $user;

          array_push($data_array, $temp);
        }
        return response()->json(['status' => true,'message' =>"Form published successfully", 'formdata' => $data_array], 200); 
      }

      else{
        return response()->json(['status' => false,'message' =>"Form is not completed yet."], 200); 
      }
    }

     public function GetForm($id){

       $formdata =  PartnershipForm::where('form_id', '=', $id)->first();
       
     return response()->json(['status' => true,'formdata' =>  $formdata], 200); 
        
     }

    
    public function DeleteForm($id){

      $formdata =  PartnershipForm::where('form_id', '=', $id)->first();
      $formdata->FormMeta()->delete();
      $formdata->delete(); 
     return response()->json(['status' => true], 200); 
        
     }     
}