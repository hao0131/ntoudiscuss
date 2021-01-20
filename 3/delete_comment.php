<?php // query_API.php
	
    session_start();
    include 'connect_db.php';
    $connect = new mysqli($host, $user, $passwd, $database);
    if ($connect->connect_error) die("連線失敗: " . $connect->connect_error);
    $connect->query("SET NAMES 'utf8'");

	$comment_ID = $_GET['comment_ID'];
    $postId=$_SESSION['postId'];
	
    $query="DELETE FROM comment WHERE postId = '$postId' and comment_ID='$comment_ID'";
    $connect->query($query);
	 
	$query="DELETE FROM rating_com WHERE postId = '$postId' and comment_ID='$comment_ID'";
    $connect->query($query);
    

?>

<script type="text/javascript"> 
        alert("刪除成功"); 
        window.location.href="article.php"; 
</script>