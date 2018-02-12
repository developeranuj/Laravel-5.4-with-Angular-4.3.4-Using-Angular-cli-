<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateForm extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::dropIfExists('partnership_form');
        Schema::create('partnership_form', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('admin_id');
            $table->string('form_id');
            $table->string('form_version');
            $table->integer('status');
            $table->integer('default_draft')->default('0')->nullable();
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
        Schema::dropIfExists('partnership_form');
    }
}
