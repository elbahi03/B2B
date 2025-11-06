<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Store extends Model
{
    use HasFactory;
    protected $fillable = [ 
        'user_id', 'categorie_id', 'logo_url', 'name', 'ville', 'localisation', 'phone', 'description'
    ];

    public function user(){
        return $this->belongsTo(User::class, 'user_id');
    }

    public function categorie(){
        return $this->belongsTo(Categorie::class, 'categorie_id');
    }

    public function products(){
        return $this->hasMany(Store::class);
    }

}
