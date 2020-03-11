<?php

use Illuminate\Database\Eloquent\Model;

/**
 *
 */
class CustomModel extends Model
{

  //Custom method to set all params to a model
  public function setParams($params){
    foreach ($params as $key => $value) {
      $this->{$key} = $value;
    }
  }


}

 ?>
