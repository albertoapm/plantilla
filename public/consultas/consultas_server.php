<?php

header("Content-Type: text/html;charset=utf-8");

$tipoCons = $_POST['tipoCons'];
$header = '';
$Database = 'Eco2';


if ($tipoCons=="0"){
    $myUser = $_POST['usu45'];
    $myPass = $_POST['pas45'];
    $sql = "SELECT * from appuser where appUser = '$myUser' and password = '$myPass'";
    $SQLSRV_FETCH_ASSOCoNUMERIC = SQLSRV_FETCH_NUMERIC;
}

if ($tipoCons=="3"){
    $sql = "SELECT nivel, etiqueta, link, orden
    from menuv
    where nombreMenu like 'mant1'
    order by orden";
    $SQLSRV_FETCH_ASSOCoNUMERIC = SQLSRV_FETCH_NUMERIC;
}


//$serverName = "DESKTOP-LU8B8R7\SQLEXPRESS";
$serverName = "127.0.0.1";  
$connectionInfo = array( "Database"=>"$Database", "UID"=>"apm", "PWD"=>"3c0p@rc2023");
$conn = sqlsrv_connect( $serverName, $connectionInfo);

if( $conn === false )  
{  
     //echo "Unable to connect.</br>";  
     die( print_r( sqlsrv_errors(), true));  
}else{
   //echo  'conectado';  
}


$params = array();
$options =  array( "Scrollable" => SQLSRV_CURSOR_KEYSET );
$stmt = sqlsrv_query( $conn, $sql , $params, $options );
$l = 0;
$n = sqlsrv_num_rows($stmt);


$array = array(
    "Numero de Filas" => $n,
    "consulta" => $sql,
    "encabezado" => $header
);

$ans [0] = $array;
while ($l < $n) {
//$row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_NUMERIC);
$row = sqlsrv_fetch_array($stmt, $SQLSRV_FETCH_ASSOCoNUMERIC);
$ans[$l+1] = $row;
$l+=1;
}

echo json_encode($ans, JSON_INVALID_UTF8_SUBSTITUTE);

sqlsrv_free_stmt( $stmt);  
sqlsrv_close( $conn);



?>