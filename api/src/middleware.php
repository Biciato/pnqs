<?php
// Application middleware

// e.g: $app->add(new \Slim\Csrf\Guard);
use \Firebase\JWT\JWT;

$auth_middleware = function ($request, $response, $next) {
    //Validate Token
    $token = $request->getHeader('X-Token');
    if (empty($token))
      return $response->withJson(["message" => "Usuário não autenticado"], 401);

    try {
      $token_decoded = JWT::decode($token[0], "CHAVESECRETA",array('HS256'));
    } catch (Exception $e) {
      return $response->withJson(["message" => "Token inválido"], 401);
    }

    $authControl = new AuthenticatorController;
    $user = $authControl->verify_auth($token_decoded);
    if (is_array($user))
      return $response->withJson(["message" => $user["message"]], 401);

    $response = $next($request->withAttribute("user_logged", $user), $response);
    return $response;
};
