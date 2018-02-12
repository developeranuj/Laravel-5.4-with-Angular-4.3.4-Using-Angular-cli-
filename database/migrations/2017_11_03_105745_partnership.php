<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Partnership extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::dropIfExists('partnership');
        Schema::create('partnership', function (Blueprint $table) {
            $table->increments('id');
            $table->string('builder');
            $table->string('date_from');
            $table->string('date_end');
            $table->string('trader');
            $table->string('fixed_pricing_guarantee');
            $table->string('nett_advantage_guarantee');
            $table->string('nett_pricing_guarantee');
            $table->string('per_dwelling_support');
            $table->string('display_home_support_product');
            $table->string('display_home_support_cash');
            $table->string('joint_marketing_material');
            $table->string('joint_marketing_fund');
            $table->string('social_media_support');
            $table->string('training');
            $table->string('upsell_program');
            $table->string('year_warranty');
            $table->string('form_number');
            $table->string('status');
            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('partnership');
    }
}
