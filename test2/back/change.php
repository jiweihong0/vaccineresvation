<?php
$name=$_POST['name'];$phone=$_POST['phone'];$wh=$_POST['wh'];$id=$_POST['id'];
$db_host = 'localhost';
$db_name = 'aaa';
$db_user = 'root';
$db_password = '123';
$dsn = "mysql:host=$db_host;dbname=$db_name;charset=utf8";
try{
    $conn =new PDO($dsn,$db_user,$db_password);
    $sql="UPDATE `doit` SET `name`=?,`phone`=?,`wh`=?where id=?";
    $stmt =$conn->prepare($sql);
    $result = $stmt->execute(array($name,$phone,$wh,$id));
    if($result){
        $count=$stmt->rowCount();
        if($count<1){
            $response['status'] =204;
            $response['message']="更新失敗";
        }
        else{
            $response['status']=200;
            $response['message']="修改成功";
        }
    }
    else{
        $response['status']=400;
        $response['message']="SQL錯誤";
    }
}
catch(PDOException $e){
    $response['status']=$e->getCode();
    $response['message']=$e->getMessage();
}
echo json_encode($response);

?>