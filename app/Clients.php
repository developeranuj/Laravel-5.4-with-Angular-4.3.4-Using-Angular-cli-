<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Clients extends Model
{
    protected $table = "clients";

    protected $fillable = [
    	            'client_code',
					'client_name',
					'company_name',
					'default_delivery_address',
					'sales_person',
					'client_notes',
					'acn',
					'client_logo'
				];

public function ClientAddress(){
    	return $this->hasOne('App\ClientAddress', 'address_id', 'id');
    }

public function ClientContacts(){
    	return $this->hasMany('App\ClientContacts', 'contacts_id', 'id');
    }

	public function partnership()
	{
	    return $this->hasMany('App\Partnership');
	}


}
