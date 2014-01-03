<?php
header('Access-Control-Allow-Origin: *');
require("dbinfo.php");

/**
 * @brief Función parsea a XML
 * @param A String de html
 */
function parseToXML($htmlStr) 
{ 
$xmlStr=str_replace('<','&lt;',$htmlStr); 
$xmlStr=str_replace('>','&gt;',$xmlStr); 
$xmlStr=str_replace('"','&quot;',$xmlStr); 
$xmlStr=str_replace("'",'&#39;',$xmlStr); 
$xmlStr=str_replace("&",'&amp;',$xmlStr); 
return $xmlStr; 
} 

/**
 * @brief Connect MyQSL
 * @note Abrimos la conexión con el servidor MySQL
 */
// Abrimos la conexión con el servidor MySQL
$connection=mysql_connect ("mysql4.000webhost.com", $username, $password);
if (!$connection) {
  die('Not connected : ' . mysql_error());
}

/**
 * @brief Seleccionamos la BD 
 * @note Seleccionamos la base de datos de MySQL
 */
// Seleccionamos la base de datos de MySQL
$db_selected = mysql_select_db($database, $connection);
if (!$db_selected) {
  die ('Can\'t use db : ' . mysql_error());
}

/**
 * @brief Seleccionamos la filas BD
 * @note Seleccionamos todas las filas necesarias
 */
// Seleccionamos todas las filas necesarias
$query = "SELECT * FROM Puntos WHERE 1";
$result = mysql_query($query);
if (!$result) {
  die('Invalid query: ' . mysql_error());
}

$query1 = "SELECT * FROM Categorias WHERE 1";
$result1 = mysql_query($query1);
if (!$result1) {
  die('Invalid query: ' . mysql_error());
}
$categorias = array();
while ($row = mysql_fetch_assoc($result1)) {
  $categorias[$row['id']]['Nombre'] = $row['Nombre'];
  $categorias[$row['id']]['Icono'] = $row['Icono'];
}

header("Content-type: text/xml");

/**
 * @brief Def XML
 * @note Empezamos a definir el XML
 */
// Empezamos a definir el XML
echo '<markers>';

/**
 * @brief iterando XML
 * @note Iteramos por las celdas generando el XML
 */
// Iteramos por las celdas generando el XML
while ($row = @mysql_fetch_assoc($result)){
  echo '<marker ';
  echo 'name="' . parseToXML(utf8_encode($row['Nombre'])) . '" ';
  echo 'lat="' . $row['Latitud'] . '" ';
  echo 'lng="' . $row['Longitud'] . '" ';
  echo 'cat="' . utf8_encode($categorias[$row['Categoria']]['Nombre']) . '" ';
  echo 'icon="' . utf8_encode($categorias[$row['Categoria']]['Icono']) . '" ';
  echo '/>';
}

/**
 * @brief Final XML
 * @note Se acabo el XML descrito
 */
echo '</markers>';

?>