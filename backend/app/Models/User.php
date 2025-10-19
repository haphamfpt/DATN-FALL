<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    protected $table = 'users';
    protected $primaryKey = 'user_id';
    public $timestamps = true;

    protected $fillable = [
        'user_email',
        'user_password',
        'user_phone_number',
        'user_address',
        'user_role',
    ];

    protected $hidden = [
        'user_password',
    ];
}