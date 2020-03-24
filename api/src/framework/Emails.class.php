<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;

class Emails {

  public function new_register_email($name, $email, $id){
    $content = "
    Prezado {$name}, <br>
    
    Sua candidatura foi registrada sob nº {$id}. 
    
    Assim que for concluída a análise, o resultado estará disponível no sistema <link> e você também será informado por e-mail.<br> 
    
    Guarde este e-mail, ele é o seu comprovante de submissão.
    
    Em caso de dúvidas entre em contato com cnqa@abes-dn.org.br ou fone: (21) 2277-3915";
    $this->send($content, 'Candidatura registrada!', $email);
  }

  public function approved_email($name, $email, $id){
    $content = "Prezado {$name}, <br>Sua candidatura nº {$id} foi considerada ELEGÍVEL. Para dar continuidade ao seu processo você deverá preparar sua inscrição conforme descrito no Regulamento para a categoria.";
    $this->send($content, 'PNQS - Candidatura Elegivel', $email);
  }

  public function repproved_email($name, $email, $id, $reasons){
    $content = "Prezado {$name}, <br>Informamos que a candidatura nº {$id} ao PNQS foi considerada INELÉGIVEL conforme informações do consultor, abaixo:<br><br>{$reasons}";
    $this->send($content, 'PNQS - Candidatura Inelegivel!', $email);
  }

  public function returned_email($name, $email, $id, $reasons){
    $content = "Prezado {$name}, <br>Para que a candidatura nº {$id} ao PNQS seja considerada elegível favor seguir as orientações abaixo:<br><br>{$reasons}";
    $this->send($content, 'PNQS - Candidatura Devolvida!', $email);
  }

  public function remember_email($email, $token){
    $content = "Para  redefinir sua senha acesse o seguinte link: <br><br> <a href='http://abes-app.org.br/pnqs/app/#/remember-password/".$token."'>http://abes-app.org.br/pnqs/app/#/remember-password/".$token."</a>";
    $this->send($content, 'PNQS - Redefinir senha', $email);
  }

  private function send($content, $subject, $to){
    // Instantiate a new PHPMailer
    $mail = new PHPMailer;

    // Tell PHPMailer to use SMTP
    $mail->isSMTP();

    // Replace sender@example.com with your "From" address.
    // This address must be verified with Amazon SES.
    $mail->setFrom('desenvolvimento@pnqs.com.br');

    // Replace recipient@example.com with a "To" address. If your account
    // is still in the sandbox, this address must be verified.
    // Also note that you can include several addAddress() lines to send
    // email to multiple recipients.
    $mail->addAddress($to);

    // Replace smtp_username with your Amazon SES SMTP user name.
    $mail->Username = 'desenvolvimento@pnqs.com.br';
    $mail->addCC('cnqa@abes-dn.org.br');

    // Replace smtp_password with your Amazon SES SMTP password.
    $mail->Password = 'Ab35@Sistema';

    // If you're using Amazon SES in a region other than US West (Oregon),
    // replace email-smtp.us-west-2.amazonaws.com with the Amazon SES SMTP
    // endpoint in the appropriate region.
    $mail->Host = 'email-ssl.com.br';

    // The subject line of the email
    $mail->Subject = $subject;

    // The HTML-formatted body of the email
    $mail->Body = $content;

    // Tells PHPMailer to use SMTP authentication
    $mail->SMTPAuth = true;

    // Enable TLS encryption over port 587
    $mail->SMTPSecure = 'tls';
    $mail->Port = 587;

    // Tells PHPMailer to send HTML-formatted email
    $mail->isHTML(true);

    $mail->SMTPDebug = SMTP::DEBUG_SERVER;

    if(!$mail->send()) {
      echo "Email not sent. " , $mail->ErrorInfo , PHP_EOL;
    } 
  }

}


?>
