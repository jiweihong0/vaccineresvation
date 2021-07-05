<?php
$country=$_POST['country'];$posi=$_POST['posi'];$phone=$_POST['phone'];$id=$_POST['id'];$doit=$_POST['doit'];$wh=$_POST['wh'];$name=$_POST['name'];
$db_host = 'localhost';
$db_name = 'aaa';
$db_user = 'root';
$db_password = '123';
$dsn = "mysql:host=$db_host;dbname=$db_name;charset=utf8";
try {
    $conn = new PDO($dsn, $db_user, $db_password);
    $sql = "INSERT INTO`doit`(`country`,`posi`,`phone`,`id`,`doit`,`wh`,`name`)VALUES(?,?,?,?,?,?,?)";
    $stmt = $conn->prepare($sql);
    $result = $stmt->execute(array($country,$posi,$phone,$id,$doit,$wh,$name));
    if($result) {
        $count=$stmt->rowCount();
        if($count<1){
            $response['status'] = 204; //OK
            $response['message'] = "新增失敗"; 
        }
        else{
            $response['status'] = 200; //OK
            $response['message'] = "恭喜您，預約成功!(欲施打著將於施打前兩天以簡訊通知)";
        }
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