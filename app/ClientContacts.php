<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ClientContacts extends Model
{
    protected $table = "clients_contacts";
    protected $fillable = [
	                    'first_name',
						'last_name',
						'email',
						'website',
						'toll_free_no',
						'phone',
						'fax',
						'mobile',
						'ddi',
						'invoicing',
						'shipping',
						'primary_contact'
				];
}
