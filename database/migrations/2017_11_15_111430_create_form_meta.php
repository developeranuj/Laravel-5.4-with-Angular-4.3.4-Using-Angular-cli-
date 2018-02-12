<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateFormMeta extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::dropIfExists('partnership_form_meta');
        Schema::create('partnership_form_meta', function (Blueprint $table) {
            $table->increments('id');
            //$table->string('meta_id');
            $table->string('meta_id')->foreign('meta_id')->references('form_id')->on('partnership_form');
            $table->string('key');
            $table->longText('value');
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
        Schema::dropIfExists('partnership_form_meta');
    }
}
