<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;
    protected $fillable = [
        'store_id', 'img_url', 'name', 'description', 'type', 'stoke', 'min', 'prix_jamla', 'prix_achat',
    ];

    public function store(){
        return $this->belongsTo(Store::class);
    }
}
