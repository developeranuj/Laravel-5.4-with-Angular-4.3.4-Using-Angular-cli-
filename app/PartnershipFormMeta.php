<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PartnershipFormMeta extends Model
{
    protected $table = "partnership_form_meta";
    protected $fillable = ['key','value'];
}
