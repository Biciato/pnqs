<?php

require "AuthenticatorController.php";
require "SubscriptionController.php";

$container["AuthenticatorController"] = function ($c) {
    return new AuthenticatorController($c);
};
$container["SubscriptionController"] = function ($c) {
    return new SubscriptionController($c);
};
?>
