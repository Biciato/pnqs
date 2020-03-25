<?php
require_once dirname(dirname(__DIR__)) . '/framework/Emails.class.php';

$app->post("/auth/login", function ($request, $response, $args) {
  $token = $request->getHeader("X-FID-Authorization");
  $token = explode(" ", $token[0]);
  $token_decoded = base64_decode($token[1]);
  $auth_control = new AuthenticatorController;
  $result = $auth_control->login(explode(":", $token_decoded));
  if ($result["status"] == "error")
    return $response->withJson(["message" => $result["message"]], 400);
  $expires_at = date( "Y-M-d H:i:s", strtotime( date( "Y-M-d H:i:s") ) + 24 * 3600 );
  return $response->withJson(["message" => "Usuário logado", "token" => $result["token"], 'is_admin' => $result["is_admin"], "expires_at" => $expires_at], 200);
});

$app->post("/auth/signup", function ($request, $response, $args) {
  $params = $request->getParsedBody();
  $auth_control = new AuthenticatorController;
  $result = $auth_control->signup($params);
  if (is_array($result))
    return $response->withJson(["message" => $result["message"]], 400);
  return $response->withJson(["message" => "Usuário registrado"], 200);
});

$app->post("/auth/remember-password", function ($request, $response, $args) {
  $params = $request->getParsedBody();
  $auth_control = new AuthenticatorController;
  $result = $auth_control->rememberPassword($params);
  if ($result["status"] == "error")
    return $response->withJson(["message" => $result["message"]], 400);
  $emailsSender = new Emails();
  $emailsSender->remember_email($params["email"], $result["token"]);
  return $response->withJson($result, 200);
});

$app->post("/auth/change-password", function ($request, $response, $args) {
  $params = $request->getParsedBody();
  $auth_control = new AuthenticatorController;
  $result = $auth_control->changePassword($request, $params);
  if ($result["status"] == "error")
    return $response->withJson(["message" => $result["message"]], 400);
  return $response->withJson($result, 200);
});

$app->post('/auth/update', function ($request, $response, $args) {
  $params = $request->getParsedBody();
  $auth_control = new AuthenticatorController;
  $result = $auth_control->update($params);
  if ($result["status"] == "error")
    return $response->withJson(["message" => $result["message"]], 400);
  return $response->withJson($result, 200);
});

?>
