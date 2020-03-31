<?php

require_once dirname(__DIR__) . "/models/SubscriptionModel.php";
require_once dirname(__DIR__) . "/models/SubscriptionContactModel.php";
require_once dirname(__DIR__) . "/models/SubscriptionPlaceModel.php";
require_once dirname(__DIR__) . "/models/PracticeCategoryModel.php";
require_once dirname(__DIR__) . "/models/SubscriptionHistoryModel.php";
/**
 *
 */
class SubscriptionController
{
    public function get($subscriptionId, $user)
    {
        if (!$user->is_admin) {
            if ($subscriptionId) {
                return SubscriptionModel::with("companysize")->with("practices")->with("subcategory")->with("contacts")->with("places")->with("category")->with("group")->with("subgroup")->fromLoggedUser($user->id)->where("id", "=", $subscriptionId)->where("removed", "=", 0)->where("active", "=", 1)->first();
            }
            return SubscriptionModel::with("companysize")->with("practices")->with("subcategory")->with("contacts")->with("places")->with("category")->with("group")->with("subgroup")->fromLoggedUser($user->id)->where("removed", "=", 0)->where("active", "=", 1)->get();
        } else {
            if ($subscriptionId) {
                return SubscriptionModel::with("user")->with("companysize")->with("practices")->with("subcategory")->with("contacts")->with("places")->with("category")->with("group")->with("subgroup")->where("id", "=", $subscriptionId)->where("removed", "=", 0)->where("active", "=", 1)->first();
            }
            if ($user->id == 3) {
                return SubscriptionModel::with("user")->with("companysize")->with("practices")->with("subcategory")->with("contacts")->with("places")->with("category")->with("group")->with("subgroup")->where("removed", "=", 0)->where("active", "=", 1)->get();
            }
            return SubscriptionModel::with("user")->with("companysize")->with("practices")->with("subcategory")->with("contacts")->with("places")->with("category")->with("group")->with("subgroup")->where("reviewer_id", "=", $user->id)->where("removed", "=", 0)->where("active", "=", 1)->get();
        }
    }

    public function getPastSublist($user)
    {
      $date = date('Y').'-01-01';
      return SubscriptionModel::with("companysize") 
              ->with("practices")
              ->with("subcategory")
              ->with("contacts")
              ->with("places")
              ->with("category")
              ->with("group")
              ->with("subgroup")
              ->fromLoggedUser($user->id)
              ->where("removed", "=", 0)
              ->where('updated_at', '<', date($date))
              ->get();
    }

    public function getAll($filters, $user)
    {
        $subscription = new SubscriptionModel;
        if (!$user->is_admin) {
            return SubscriptionModel::with("companysize")->with("practices")->with("subcategory")->with("contacts")->with("places")->with("category")->with("group")->with("subgroup")->fromLoggedUser($user->id)->where("removed", "=", 0)->where("active", "=", 1)->get();
        } else {
            if ($user->id == 3) {
                return SubscriptionModel::with("user")->with("companysize")->with("practices")->with("subcategory")->with("contacts")->with("places")->with("category")->with("group")->with("subgroup")->where("year", "=", $subscriptionYear)->where("removed", "=", 0)->get();
            }
            return $subscription->filter($filters)->get();
        }
    }

    public function add($params)
    {
        //Save Subscription
        $subscription = new SubscriptionModel;

        #$subscription_exists = SubscriptionModel::where("document_id", "=", $params["document_id"])->where("subscription_category_id", "=", $params["subscription_category_id"])->where("removed", "=", 0)->where("year", "=", date("Y"))->first();
        //$subscription_exists = SubscriptionModel::where("document_id", "=", $params["document_id"])->where("removed", "=", 0)->where("year", "=", date("Y"))->first();
        #if (!empty($subscription_exists)) {
        #  return array("status" => "error", "message" => "Candidatura já enviada, aguarde a análise de sua candidatura ou entre em contato conosco.");
        #}
        if (array_key_exists("implantation_start_dt", $params)) {
            $params["implantation_start_dt"] = date("Y-m-d H:i:s", strtotime($params["implantation_start_dt"]));
        }
        if (array_key_exists("economic_activity_start", $params)) {
            $params["economic_activity_start"] = date("Y-m-d H:i:s", strtotime($params["economic_activity_start"]));
        }
        $params["year"] = date("Y");
        $subscription->setParams($params);
        try {
            $subscription->save();
            return $subscription;
        } catch (Exception $e) {
            return array("status" => "error", "message" => $e);
        }
        return array("status" => "error", "message" => "Não foi possivel realizar a candidatura.");
    }

    public function setStatus($params, $userLogged)
    {
        //Save Subscription
        if (!isset($params["id"])) {
            return array("status" => "error", "message" => "É obrigatório indicar qual a candidatura.");
        }

        if (array_key_exists("implantation_start_dt", $params)) {
            $params["implantation_start_dt"] = date("Y-m-d H:i:s", strtotime($params["implantation_start_dt"]));
        }
        if (array_key_exists("economic_activity_start", $params)) {
            $params["economic_activity_start"] = date("Y-m-d H:i:s", strtotime($params["economic_activity_start"]));
        }
        $subscription = SubscriptionModel::where('id', "=", $params["id"])->first();
        if (empty($subscription)) {
            return array("status" => "error", "message" => "Candidatura não encontrada");
        }

        $subHistory = new SubscriptionHistoryModel;

        $subscription->setParams($params);
        try {
            $subscription->save();
        } catch (Exception $e) {
            return array("status" => "error", "message" => $e);
        }

        $subHistory->setParams([
            'username' => $userLogged['username'],
            'subscription_id' => $params["id"],
            'date' => date("Y-m-d H:i:s"),
        ]);
        try {
            $subHistory->save();
        } catch (Exception $e) {
            return array("status" => "error", "message" => $e);
        }
        return array("status" => "success", "message" => "atualizado com sucesso");
    }

    public function remove($id)
    {
        //Save Subscription
        if (!isset($id)) {
            return array("status" => "error", "message" => "É obrigatório indicar qual a candidatura.");
        }

        $subscription = SubscriptionModel::where('id', "=", $id)->first();
        if (empty($subscription)) {
            return array("status" => "error", "message" => "Candidatura não encontrada");
        }

        $subscription["removed"] = 1;
        try {
            $subscription->save();
            return $subscription;
        } catch (Exception $e) {
            return array("status" => "error", "message" => $e);
        }
        return array("status" => "error", "message" => "Não foi possivel atualizar a candidatura.");
    }

    public function addContacts($contacts, $subscription_id)
    {
        foreach ($contacts as $key => $value) {
            $contact = new SubscriptionContactModel;
            $contact->setParams($value);
            $contact->subscription_id = $subscription_id;
            $contact->save();
        }
    }

    public function addPlaces($places, $subscription_id)
    {
        foreach ($places as $key => $value) {
            $place = new SubscriptionPlaceModel;
            $place->setParams($value);
            $place->subscription_id = $subscription_id;
            $place->save();
        }
    }

    public function addPractices($practices, $subscription_id)
    {
        foreach ($practices as $key => $value) {
            $practice = new SubscriptionPracticeModel;
            $practice->setParams($value);
            $practice->implantation_start_dt = date("Y-m-d H:i:s", strtotime($value["implantation_start_dt"]));
            $practice->subscription_id = $subscription_id;
            $practice->save();
        }
    }

    public function updateContacts($contacts, $subscription_id)
    {
        foreach ($contacts as $key => $value) {
            if (array_key_exists("id", $value)) {
                $contact = SubscriptionContactModel::where('id', "=", $value["id"])->first();
                if (isset($contact)) {
                    $contact->setParams($value);
                    $contact->save();
                }
            } else {
                $contact = new SubscriptionContactModel;
                $contact->setParams($value);
                $contact->subscription_id = $subscription_id;
                $contact->save();
            }
        }
    }

    public function updatePlaces($places, $subscription_id)
    {
        foreach ($places as $key => $value) {
            if (array_key_exists("id", $value)) {
                $place = SubscriptionPlaceModel::where('id', "=", $value["id"])->first();
                if (isset($place)) {
                    $place->setParams($value);
                    $place->save();
                }
            } else {
                $place = new SubscriptionPlaceModel;
                $place->setParams($value);
                $place->subscription_id = $subscription_id;
                $place->save();
            }
        }
    }

    public function updatePractices($practices, $subscription_id)
    {
        foreach ($practices as $key => $value) {
            if (array_key_exists("id", $value)) {
                $practice = SubscriptionPracticeModel::where('id', "=", $value["id"])->first();
                $practice->setParams($value);
                $practice->save();
            } else {
                $practice = new SubscriptionPracticeModel;
                $practice->setParams($value);
                $practice->subscription_id = $subscription_id;
                $practice->save();
            }
        }
    }

    public function get_practice_category()
    {
        return PracticeCategoryModel::where("status", "=", 1)->get();
    }

    public function send_confirmation_mail()
    {

    }
}
