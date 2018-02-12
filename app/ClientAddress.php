<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ClientAddress extends Model
{
     protected $table = "clients_address";

     protected $fillable = [
		'postal_address_name',
		'postal_address_line_1',
		'postal_address_line_2',
		'postal_suburb',
		'postal_town_city',
		'postal_state_region',
		'postal_postal_code',
		'postal_country' ,
		'physical_address_name',
		'physical_address_line_1',
		'physical_address_line_2',
		'physical_suburb',
		'physical_town_city',
		'physical_state_region',
		'physical_postal_code',
		'physical_country'
    ];
}



