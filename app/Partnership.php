<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Partnership extends Model
{
    //public $timestamps = false;
	protected $table = "partnership";
    protected $fillable = [
							'builder',
							'date_from',
							'date_end',
							'trader',
							'fixed_pricing_guarantee_from',
							'fixed_pricing_guarantee_to',
							'nett_advantage_guarantee',
							'nett_pricing_guarantee',
							'per_dwelling_support_house_amount',
							'per_dwelling_support_units_amount',
							'display_home_support_product',
							'display_home_support_cash_amount',
							'display_home_support_cash_year',
							'joint_marketing_material',
							'joint_marketing_fund',
							'social_media_support',
							'training',
							'upsell_program',
							'year_warranty',
							//'form_number',
							'status'
       					];

    public function client()
	{
	    return $this->belongsTo('App\Clients', 'builder',  'id');
	}

	public function user()
	{
	    return $this->belongsTo('App\User', 'trader',  'id');
	}

}
