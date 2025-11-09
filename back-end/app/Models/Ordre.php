<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ordre extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_id', 'store_id', 'produits_commandes', 'status', 'prix_total'
    ];

    protected $casts = [
        'produits_commandes' => 'array'
    ];

    public function user(){
        return $this->belongsTo(User::class);
    }

    public function store(){
        return $this->belongsTo(Store::class);
    }
}
