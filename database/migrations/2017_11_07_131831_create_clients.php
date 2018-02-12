<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateClients extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
       Schema::dropIfExists('clients');
        Schema::create('clients', function (Blueprint $table) {
            $table->increments('id');
            $table->string('client_code');
            $table->string('client_name');
            $table->string('company_name');
            $table->string('default_delivery_address');
            $table->string('sales_person');
            $table->string('client_notes');
            $table->string('acn');
            $table->string('client_logo');
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
        Schema::dropIfExists('clients');
    }
}
