<?php
$db_host = 'localhost';
$db_name = 'aaa';
$db_user = 'root';
$db_password = '123';
$id=json_encode($_POST['item']); 
$item=explode('"',$id);
$doit=$_POST['doit'];
$date=$_POST['date'];
$dsn = "mysql:host=$db_host;dbname=$db_name;charset=utf8";
try{
    $conn =new PDO($dsn,$db_user,$db_password);
    for ($i=0; $i <count($item) ; $i++) {
        if($i%2==0){
            continue;
        } 
        $sql="UPDATE `doit` SET `doit`=?,`date`=? where phone=$item[$i]";
        $stmt =$conn->prepare($sql);
        $result = $stmt->execute(array($doit,$date));
    }
    if($result){
        $count=$stmt->rowCount();
        if($count<1){
            $response['status'] =204;
            $response['message']="更新失敗";
        }
        else{
            $response['status']=200;
            $response['message']="更新成功";
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