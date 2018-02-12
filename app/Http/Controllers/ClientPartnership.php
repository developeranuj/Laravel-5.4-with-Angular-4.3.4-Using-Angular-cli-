<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Partnership;

class ClientPartnership extends Controller
{
  

   	public function CreatePartnership(request $request){

		    $newpartnership = new Partnership();

	        $newpartnership->fill([
	            'builder' => $request->builder,
	            'date_from'=> $request->date_from,
	            'date_end'=> $request->date_end,
	            'trader'=> $request->trader,
	            'fixed_pricing_guarantee'=> $request->fixed_pricing_guarantee,
	            'nett_advantage_guarantee'=> $request->nett_advantage_guarantee,
	            'nett_pricing_guarantee'=> $request->nett_pricing_guarantee,
	            'per_dwelling_support'=> $request->per_dwelling_support,
	            'display_home_support_product'=> $request->display_home_support_product,
	            'display_home_support_cash'=> $request->display_home_support_cash,
	            'joint_marketing_material'=> $request->joint_marketing_material,
	            'joint_marketing_fund'=> $request->joint_marketing_fund,
	            'social_media_support'=> $request->social_media_support,
	            'training'=> $request->training,
	            'upsell_program'=> $request->upsell_program,
	            'year_warranty'=> $request->year_warranty,
	            'form_number'=> $request->form_number,
	            'status'=> $request->status,
	        ]);

	        
	        $newpartnership->save();

	        if($newpartnership->save()){

	        	return response()->json(['status' => true,'message' => 'You have successfully created partnership'], 200);
	        }else{

	        	return response()->json(['status' => false,'message' => 'Somthing went wrong!'], 200);
	        }
    }

    
    public function UpdatePartnership(request $request){


		    $updatepartnership = Partnership::where('id', '=',  $request->id)->first();

	        $updatepartnership->update([
	            'builder' => $request->builder,
	            'date_from'=> $request->date_from,
	            'date_end'=> $request->date_end,
	            'trader'=> $request->trader,
	            'fixed_pricing_guarantee'=> $request->fixed_pricing_guarantee,
	            'nett_advantage_guarantee'=> $request->nett_advantage_guarantee,
	            'nett_pricing_guarantee'=> $request->nett_pricing_guarantee,
	            'per_dwelling_support'=> $request->per_dwelling_support,
	            'display_home_support_product'=> $request->display_home_support_product,
	            'display_home_support_cash'=> $request->display_home_support_cash,
	            'joint_marketing_material'=> $request->joint_marketing_material,
	            'joint_marketing_fund'=> $request->joint_marketing_fund,
	            'social_media_support'=> $request->social_media_support,
	            'training'=> $request->training,
	            'upsell_program'=> $request->upsell_program,
	            'year_warranty'=> $request->year_warranty,
	            'form_number'=> $request->form_number,
	            'status'=> $request->status,
	        ]);
	       
	        $updatepartnership->save();

	        if($updatepartnership->save()){

	        	return response()->json(['status' => true,'message' => 'You have successfully updated partnership'], 200);
	        }else{

	        	return response()->json(['status' => false,'message' => 'Somthing went wrong!'], 200);
	        }
    }


    public function GetPartnerships(request $request){

	    $getpartnerships = Partnership::all();

        if(empty($getpartnerships)){

        	return response()->json(['status' => false,'message' => 'Nothing found'], 200);
        	
        }else{

        	return response()->json(['status' => true,'getpartnerships' => $getpartnerships], 200);
        }

    }

    public function GetSinglePartnerships(request $request){

	    $get_single_partnerships = Partnership::where('id', '=',  $request->id)->first();

        if(empty($get_single_partnerships)){

        	return response()->json(['status' => false,'message' => 'Nothing found'], 200);
        	
        }else{

        	return response()->json(['status' => true,'singlepartnerships' => $get_single_partnerships], 200);
        }

    }

    public function DeleteSinglePartnerships(request $request){

	    $deletesinglepartnerships = Partnership::where('id', '=',  $request->id)->delete();

        if(empty($deletesinglepartnerships)){

        	return response()->json(['status' => false,'error' => 'Error in deleting partnership'], 200);
        	
        }else{

        	return response()->json(['status' => true,'singlepartnerships' => 'Deleted Successfully'], 200);
        }

    }

    public function PartnershipFormImageUploads(request $request ){
    	
         $destinationPath = "uploads/form"; // upload path
         $extension = $request->file('file')->getClientOriginalExtension(); // getting image
         $fileName = rand(11111,99999).'.'.$extension; // renameing image
         $request->file('file')->move($destinationPath, $fileName); // uploading file
         $url =  url('/').'/uploads/form/'.$fileName;
        return response()->json(['status' => true, 'link' => $url ], 200);
	}

	//Form image uploads

	public function BuilderImageUploads(request $request ){
    	
         $destinationPath = "uploads/builders"; // upload path
         $extension = $request->file('file')->getClientOriginalExtension(); // getting image
         $fileName = rand(11111,99999).'.'.$extension; // renameing image
         $request->file('file')->move($destinationPath, $fileName); // uploading file
         $url =  url('/').'/uploads/builders/'.$fileName;
        return response()->json(['status' => true, 'link' => $url ], 200);
	}
	

}

