<?php

use Illuminate\Database\Seeder;
use App\User;
use App\Usermeta;
use Illuminate\Support\Facades\Hash;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $newusers = new User();

        $password= 'admin';

        $hashedpassword = Hash::make($password);

        $newusers->fill([
            'name' => 'test',
            'email'=> 'test@123',
            'password'=> $hashedpassword,
            'contact'=> 123,
            'mobile'=> 123,
            'password_status'=> true
        ]);

        $newusers->save();

        $userrole = new usermeta();
        $userrole->role = 1;
        $newusers->usermeta()->save($userrole);
    }
}
