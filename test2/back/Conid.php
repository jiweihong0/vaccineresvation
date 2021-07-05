<?php
$id = $_POST['id'];  
$db_host = 'localhost';
$db_name = 'aaa';
$db_user = 'root';
$db_password = '123';
$dsn = "mysql:host=$db_host;dbname=$db_name;charset=utf8";
try {
    $conn = new PDO($dsn, $db_user, $db_password);
    $sql = "SELECT  *  FROM  `doit` WHERE id=?";
    $stmt = $conn->prepare($sql);
    $result = $stmt->execute(array($id));
    if($result) {
       $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
       $response['status'] = 200; //OK
       $response['message'] = "查詢成功";
       $response['result'] = $rows;
    }
    else {
       $response['status'] = 400; //Bad Request
       $response['message'] = "SQL錯誤";
    }
} catch (PDOException $e) {
    $response['status'] = $e->getCode();
    $response['message'] = $e->getMessage();
}
echo json_encode($response);
?>
