<?php // query_API.php
  session_start();
  include 'connect_db.php';
  $connect = new mysqli($host, $user, $passwd, $database);
  if ($connect->connect_error) die("連線失敗: " . $connect->connect_error);
  $connect->query("SET NAMES 'utf8'");
  
  $context=$_POST['post_context'];
  $postId=$_SESSION['postId'];
  
  $query="UPDATE poster SET context = '$context' WHERE postId = '$postId'";
  $result =  $connect->query($query);

?>