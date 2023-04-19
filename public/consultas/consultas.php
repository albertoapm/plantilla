<?php

header("Content-Type: text/html;charset=utf-8");
require $_SERVER['DOCUMENT_ROOT'].'/sig2/config_var.php';



$tipoCons = $_POST['tipoCons'];
$header = '';
$Database = 'casa';

//MYSQL
$conexion = new mysqli('localhost','albertoa_eco','eCo1Barcelona','casa'); 
$conexion->set_charset("utf8");

if ($tipoCons=="0"){
    $myUser = $_POST['usu45'];
    $myPass = $_POST['pas45'];
    $consulta = "SELECT * from appuser where appUser = '$myUser' and password = '$myPass'";
}

if ($tipoCons=="1"){
   
   $conexion->query("DROP TEMPORARY TABLE IF EXISTS n1;");
   $conexion->query("DROP TEMPORARY TABLE IF EXISTS n2;");
   $conexion->query("DROP TEMPORARY TABLE IF EXISTS n3;");
   //Nivel1
   $conexion->query("SET @sql = NULL;");
   $conexion->query("SELECT
   GROUP_CONCAT(DISTINCT CONCAT(
    ' SUM(CASE WHEN Mes = \"', mes, '\" THEN importe ELSE 0 END) 
    AS \"', mes, '\"')
   ) INTO @sql FROM presupuesto23;");
   $conexion->query("SET @sql = CONCAT('CREATE TEMPORARY TABLE n1 as
   (SELECT 1 as nivel, det1, \"\" as det2, \"\" as det3, ', @sql, 
    ', SUM(importe) as TOTAL FROM presupuesto23 GROUP BY det1)');");
   $conexion->query("PREPARE stmt FROM @sql;");
   $conexion->query("EXECUTE stmt;");
   $conexion->query("DEALLOCATE PREPARE stmt;");
   //Nivel2
   $conexion->query("SET @sql = NULL;");
   $conexion->query("SELECT
   GROUP_CONCAT(DISTINCT CONCAT(
    ' SUM(CASE WHEN Mes = \"', mes, '\" THEN importe ELSE 0 END) 
    AS \"', mes, '\"')
   ) INTO @sql FROM presupuesto23;");
   $conexion->query("SET @sql = CONCAT('CREATE TEMPORARY TABLE n2 as
   (SELECT 2 as nivel, det1, det2, \"\" as det3, ', @sql, 
    ', SUM(importe) as TOTAL FROM presupuesto23 GROUP BY det1, det2)');");
   $conexion->query("PREPARE stmt FROM @sql;");
   $conexion->query("EXECUTE stmt;");
   $conexion->query("DEALLOCATE PREPARE stmt;");
   //Nivel3
   $conexion->query("SET @sql = NULL;");
   $conexion->query("SELECT
   GROUP_CONCAT(DISTINCT CONCAT(
    ' SUM(CASE WHEN Mes = \"', mes, '\" THEN importe ELSE 0 END) 
    AS \"', mes, '\"')
   ) INTO @sql FROM presupuesto23;");
   $conexion->query("SET @sql = CONCAT('CREATE TEMPORARY TABLE n3 as
   (SELECT 3 as nivel, det1, det2, det3, ', @sql, 
    ', SUM(importe) as TOTAL FROM presupuesto23 GROUP BY det1, det2, det3)');");
   $conexion->query("PREPARE stmt FROM @sql;");
   $conexion->query("EXECUTE stmt;");
   $conexion->query("DEALLOCATE PREPARE stmt;");



   $consulta = "SELECT * from n1
   union all
   select * from n2
   union all
   select * from n3
   order by det1, det2, det3, nivel";
}

if ($tipoCons=="2"){
    $consulta = "SELECT det1, DATE_FORMAT(STR_TO_DATE(fecha, '%d/%m/%Y'),'%d/%m/%Y'), det2 from presupuesto23";
}

if ($tipoCons=="3"){
    $consulta = "SELECT nivel, etiqueta, link, orden
    from menuv
    where nombreMenu like 'mant'
    order by orden";
}

//$mysqli->multi_query($consulta);
//$result = $mysqli->store_result()

$result = $conexion->query($consulta);

$l = 0;
$n = $result->num_rows;


$array = array(
    "Numero de Filas" => $n,
    "consulta" => $consulta,
    "encabezado" => $header
);

$ans [0] = $array;
while ($l < $n) {
//$row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_NUMERIC);
$row = $result->fetch_row();
$ans[$l+1] = $row;
$l+=1;
}

echo json_encode($ans, JSON_INVALID_UTF8_SUBSTITUTE);


?>