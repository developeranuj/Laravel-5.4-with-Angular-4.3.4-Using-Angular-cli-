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
            $table->integer('builder')->unsigned();
            $table->foreign('builder')->references('id')->on('clients');
            $table->string('date_from');
            $table->string('date_end');
            $table->integer('trader')->unsigned();
            $table->foreign('trader')->references('id')->on('users');
            $table->string('fixed_pricing_guarantee_from')->nullable();
            $table->string('fixed_pricing_guarantee_to')->nullable();

            $table->string('nett_advantage_guarantee')->nullable();
            $table->string('nett_pricing_guarantee')->nullable();
            $table->string('per_dwelling_support_house_amount')->nullable();
            $table->string('per_dwelling_support_units_amount')->nullable();
            $table->string('display_home_support_product')->nullable();
            $table->string('display_home_support_cash_amount')->nullable();
            $table->string('display_home_support_cash_year')->nullable();
            $table->string('joint_marketing_material')->nullable();
            $table->string('joint_marketing_fund')->nullable();
            $table->string('social_media_support')->nullable();
            $table->string('training')->nullable();
            $table->string('upsell_program')->nullable();
            $table->string('year_warranty')->nullable();
           // $table->string('form_number');
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
