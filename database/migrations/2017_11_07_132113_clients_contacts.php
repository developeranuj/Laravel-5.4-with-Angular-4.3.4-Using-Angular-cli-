<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class ClientsContacts extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::dropIfExists('clients_contacts');
        Schema::create('clients_contacts', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('contacts_id')->unsigned();
            $table->foreign('contacts_id')->references('id')->on('clients')->onDelete('cascade');
            $table->string('first_name');
            $table->string('last_name');
            $table->string('email');
            $table->string('website')->nullable();
            $table->string('toll_free_no')->nullable();
            $table->string('phone')->nullable();
            $table->string('fax')->nullable();
            $table->string('mobile')->nullable();
            $table->string('ddi')->nullable();
            $table->string('invoicing');
            $table->string('shipping');
            $table->boolean('primary_contact');
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
        Schema::dropIfExists('clients_contacts');
    }
}
