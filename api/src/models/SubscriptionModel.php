<?php


require_once "CustomModel.php";

require_once "UserModel.php";
require_once "SubscriptionCategoryModel.php";
require_once "SubscriptionGroupModel.php";
require_once "SubscriptionSubgroupModel.php";
require_once "SubscriptionContactModel.php";
require_once "SubscriptionPlaceModel.php";
require_once "SubscriptionSubCategoryModel.php";
require_once "SubscriptionCompanySizeModel.php";
require_once "SubscriptionPracticeModel.php";

class SubscriptionModel extends CustomModel
{

  protected $table = 'subscription';
  protected $primaryKey = 'id';


  public function scopeFromLoggedUser($query, $id){
    return $query->where('user_id', "=", $id);
  }

  public function scopeFilter($query, $filters) {
    if ($filters['year']) {
      $query->where('year', '=', $filters['year']);
    }
    if ($filters['status']) {
      $query->where('status', '=', $filters['status']);
    }
    if ($filters['cnpj']) {
      $query->where('document_id', 'LIKE', "%{$filters['cnpj']}%");
    }
    if ($filters['razao_social']) {
      $query->where('name', 'LIKE', "%{$filters['razao_social']}%");
    }
    if ($filters['category']) {
      $query->where('subscription_category_id', '=', $filters['category']);
    }
    return $query
            ->with("user")
            ->with("companysize")
            ->with("practices")
            ->with("subcategory")
            ->with("contacts")
            ->with("places")
            ->with("category")
            ->with("group")
            ->with("subgroup")
            ->where("removed", "=", 0);
  }

  public function user(){
    return $this->belongsTo("UserModel", "user_id");
  }

  public function category(){
    return $this->belongsTo("SubscriptionCategoryModel", "subscription_category_id");
  }

  public function subcategory(){
    return $this->belongsTo("SubscriptionSubCategoryModel", "subscription_subcategory_id");
  }

  public function companysize() {
    return $this->belongsTo("SubscriptionCompanySizeModel", "subscription_company_size_id");
  }

  public function group(){
    return $this->belongsTo("SubscriptionGroupModel", "group_id");
  }

  public function subgroup(){
    return $this->belongsTo("SubscriptionSubgroupModel", "subgroup_id");
  }

  public function contacts(){
    return $this->hasMany("SubscriptionContactModel", "subscription_id");
  }

  public function places(){
    return $this->hasMany("SubscriptionPlaceModel", "subscription_id");
  }

  public function practices(){
    return $this->hasMany("SubscriptionPracticeModel", "subscription_id");
  }
}

 ?>
