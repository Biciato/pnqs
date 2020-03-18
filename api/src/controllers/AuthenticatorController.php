<?php

use Illuminate\Database\Query\Builder;
use \Firebase\JWT\JWT;

require_once dirname(__DIR__) . "/models/UserModel.php";
/**
*
*/
class AuthenticatorController
{

  public function login($params){
    if (empty($params[0]))
      return array("status" => "error", "message" => "O campo Usuário é obrigatório.");
    if (empty($params[1]))
      return array("status" => "error", "message" => "O campo Senha é obrigatório.");
    $user = $this->check_credentials($params[0], $params[1]);
    if (is_array($user))
      return $user;
    $credentials = $user->username . ":" . $user->password;
    $new_token = JWT::encode($credentials, "CHAVESECRETA");
    return array("status"=> "success", "token" => $new_token, "is_admin" => $user->is_admin);
  }

  public function signup($params){
    //Save Subscription
    $user = new UserModel;

    $exist_candidate = UserModel::where('username', "=", $params["username"])->first();
    if (!empty($exist_candidate))
      return array("status" => "error", "message" => "Usuário já registrado");

    $params["password"] = password_hash($params["password"], PASSWORD_DEFAULT);
    $user->setParams($params);
    try {
      $user->save();
      return $user;
    } catch (Exception $e) {
      return array("status" => "error", "message" => 'Não foi possivel realizar o cadastro');
    }
  }

  public function rememberPassword($params){
    if (empty($params["email"]))
      return array("status" => "error", "message" => "O campo Usuário é obrigatório.");
    $user = $this->get_user_by_email($params["email"]);
    if (is_array($user))
      return $user;
    $credentials = $user->username;
    $new_token = base64_encode($credentials);
    $user->remember_hash = $new_token;
    $user->save();
    return array("status"=> "success", "token" => $new_token);
  }

  public function changePassword($params){
    if (empty($params["email"]))
      return array("status" => "error", "message" => "O campo Usuário é obrigatório.");
    if (empty($params["password"]))
      return array("status" => "error", "message" => "O campo Senha é obrigatório.");
    $user = $this->get_user_by_email_and_cnpj($params["email"], $params['cnpj']);
    if (is_array($user))
      return $user;
    $user->password = password_hash($params["password"], PASSWORD_DEFAULT);
    $user->save();
    return array("status"=> "success");
  }

  public function verify_auth($token){
    $credentials = explode(":", $token);

    $user = UserModel::where('username', "=", $credentials[0])->first();
    if (empty($user))
      return array("status" => "error", "message" => "Usuário não encontrado");

    if ($credentials[1] != $user->password)
      return array("status" => "error", "message" => "Senha incorreta");
    return $user;
  }

  private function check_credentials($username, $password){
    $user = UserModel::where('username', "=", $username)->first();
    if (empty($user))
      return array("status" => "error", "message" => "Usuário não encontrado");

    if (!password_verify($password, $user->password))
      return array("status" => "error", "message" => "Senha incorreta");
    return $user;
  }

  private function get_user_by_email_and_cnpj($username, $cnpj){
    $user = UserModel::where('username', "=", $username)->where('CNPJ', '=', $cnpj)->first();
    if (empty($user))
      return array("status" => "error", "message" => "Usuário não encontrado. Por favor, verifique se os dados estão corretos");
    return $user;
  }

  private function get_user_by_hash($hash){
    $user = UserModel::where('remember_hash', "=", $hash)->first();
    if (empty($user))
      return array("status" => "error", "message" => "Usuário não encontrado");
    return $user;
  }

  public function update($params) {
    $user = UserModel::where('username', '=', $params['username'])->first();
    if ($user) {
      $user->cnpj = $params['cnpj'];
      $user->save();
      return array("status" => "success", "message" => "Dados atualizados com sucesso");
    } else {
      return array("status" => "error", "message" => "Usuário não encontrado"); 
    }    
  }
}
?>
