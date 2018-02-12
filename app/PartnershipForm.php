<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PartnershipForm extends Model
{
   protected $table = "partnership_form";
   protected $fillable = ['admin_id','form_id','form_version', 'status','complete_status','default_draft'];

   public function FormMeta(){

   	    return $this->hasMany('App\PartnershipFormMeta', 'meta_id','form_id');
   }
}
