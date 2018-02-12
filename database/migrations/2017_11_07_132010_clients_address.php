<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class ClientsAddress extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::dropIfExists('clients_address');
        Schema::create('clients_address', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('address_id')->unsigned();
            $table->foreign('address_id')->references('id')->on('clients')->onDelete('cascade');
            $table->string('postal_address_name');
            $table->string('postal_address_line_1')->nullable();
            $table->string('postal_address_line_2')->nullable();
            $table->string('postal_suburb');
            $table->string('postal_town_city');
            $table->string('postal_state_region');
            $table->string('postal_postal_code');
            $table->string('postal_country');

            //Physical Address

            $table->string('physical_address_name');
            $table->string('physical_address_line_1')->nullable();
            $table->string('physical_address_line_2')->nullable();
            $table->string('physical_suburb');
            $table->string('physical_town_city');
            $table->string('physical_state_region');
            $table->string('physical_postal_code');
            $table->string('physical_country');
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
        Schema::dropIfExists('clients_address');
    }
}
