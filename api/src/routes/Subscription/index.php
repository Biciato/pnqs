<?php
require_once dirname(dirname(__DIR__)) . '/framework/Emails.class.php';

$app->get("/subscription/[{subscriptionId}]", function ($request, $response, $args){
  $userLogged = $request->getAttribute('user_logged');
  $subscriptionId = (isset($args["subscriptionId"])) ? $args["subscriptionId"] : false;
  $subscriptionController = new SubscriptionController;
  $subscriptions = $subscriptionController->get($subscriptionId, $userLogged);
  if (is_array($subscriptions))
    return $response->withJson(["message" => $subscriptions["message"]], 200);
  return $response->withJson(["message" => "Retornado com sucesso", "result" => $subscriptions], 200);
})->add($auth_middleware);

$app->get('/get-past-sublist', function ($request, $response) {
  $userLogged = $request->getAttribute('user_logged');
  $subscriptionController = new SubscriptionController;
  $subscriptions = $subscriptionController->getPastSublist($userLogged);
  return $response->withJson(["message" => "Retornado com sucesso", "result" => $subscriptions], 200);
})->add($auth_middleware);

$app->post("/subscriptions", function ($request, $response, $args){
  $userLogged = $request->getAttribute('user_logged');
  $params = $request->getParsedBody();
  $filters = $params;
  $subscriptionController = new SubscriptionController;
  $subscriptions = $subscriptionController->getAll($filters, $userLogged);
  if (is_array($subscriptions))
    return $response->withJson(["message" => $subscriptions["message"]], 200);
  return $response->withJson(["message" => "Retornado com sucesso", "result" => $subscriptions], 200);
})->add($auth_middleware);


$app->get("/practice/categories", function ($request, $response, $args){
  $userLogged = $request->getAttribute('user_logged');
  $subscriptionController = new SubscriptionController;
  $categories = $subscriptionController->get_practice_category();
  if (is_array($categories))
    return $response->withJson(["message" => $categories], 400);
  return $response->withJson(["message" => "Retornado com sucesso", "result" => $categories], 200);
})->add($auth_middleware);

$app->post("/subscription/", function ($request, $response, $args) {
  $userLogged = $request->getAttribute('user_logged');

  $params = $request->getParsedBody();

  $contacts = $params["contacts"];
  unset($params["contacts"]);

  $places = $params["places"];
  unset($params["places"]);

  $praticas = $params["practices"];
  unset($params["practices"]);

  $subscriptionController = new SubscriptionController;
  $params["user_id"] = $userLogged->id;

  if ($params["subscription_category_id"] == 2 || $params["subscription_category_id"] == 3){
    $params["reviewer_id"] = 7; //AMEGSA E PEOS
  }else if($params["subscription_category_id"] == 1){
    $params["reviewer_id"] = 7; //IGS
  }else if($params["subscription_category_id"] == 4){
    $params["reviewer_id"] = 7; //SQFSA
  }

  $subscription = $subscriptionController->add($params);
  if (is_array($subscription))
    return $response->withJson(["message" => $subscription["message"]], 400);

  $subscriptionController->addContacts($contacts, $subscription->id);
  $subscriptionController->addPlaces($places, $subscription->id);
  $subscriptionController->addPractices($praticas, $subscription->id);

  $emailsSender = new Emails();
  $emailsSender->new_register_email($subscription['candidate'], $userLogged['username'], $subscription['id']);
  return $response->withJson(["message" => "Submetido com sucesso", 'id' => $subscription['id']], 200);
})->add($auth_middleware);

$app->put("/subscription/", function ($request, $response, $args) {
  $userLogged = $request->getAttribute('user_logged');
  //if (!$userLogged->is_admin)
  //  return $response->withJson(["message" => "Método permitido somente para administradores"], 401);

  $params = $request->getParsedBody();

  $contacts = array();
  if(array_key_exists("contacts", $params)){
    $contacts = $params["contacts"];
    unset($params["contacts"]);
  }
  $places = array();
  if(array_key_exists("places", $params)){
    $places = $params["places"];
    unset($params["places"]);
  }
  $practices = array();
  if(array_key_exists("practices", $params)){
    $practices = $params["practices"];
    unset($params["practices"]);
  }

  $subscriptionController = new SubscriptionController;
  $subscription = $subscriptionController->setStatus($params, $userLogged);

  if(isset($contacts)) $subscriptionController->updateContacts($contacts, $params["id"]);
  if(isset($places)) $subscriptionController->updatePlaces($places, $params["id"]);
  if(isset($practices)) $subscriptionController->updatePractices($practices, $params["id"]);

  if (is_array($subscription))
    return $response->withJson(["message" => $subscription["message"]], 200);

  $subscription = $subscriptionController->get($subscription['id'], $userLogged);

  $emailsSender = new Emails();
  //print_r($subscription["user"]["username"]); die();
  if ($subscription['status'] == 'APR') {
    $emailsSender->approved_email($subscription['organization_name'], $subscription["user"]["username"], $subscription['id']);
  }elseif($subscription['status'] == 'REP'){
    $emailsSender->repproved_email($subscription['organization_name'], $subscription["user"]["username"], $subscription['id'], $subscription['status_reason']);
  }elseif($subscription['status'] == 'DEV'){
    $emailsSender->returned_email($subscription['organization_name'], $subscription["user"]["username"], $subscription['id'], $subscription['status_reason']);
  }

  return $response->withJson(["message" => "Atualizado com sucesso"], 200);
})->add($auth_middleware);

$app->delete("/subscription/[{subscriptionId}]", function ($request, $response, $args) {
  $userLogged = $request->getAttribute('user_logged');
  $subscriptionId = (isset($args["subscriptionId"])) ? $args["subscriptionId"] : false;
  if (!$subscriptionId)
    return $response->withJson(["message" => "É obrigatório indicar a candidatura."], 400);
  $params = $request->getParsedBody();
  $subscriptionController = new SubscriptionController;
  $subscription = $subscriptionController->remove($subscriptionId);
  if (is_array($subscription))
    return $response->withJson(["message" => $subscription["message"]], 400);

  return $response->withJson(["message" => "Removido com sucesso"], 200);
})->add($auth_middleware);

?>
