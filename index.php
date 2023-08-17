<?php
/** 
 * @file
 * Entry point.
**/

require_once 'autoloader.php';
spl_autoload_register('autoloader');

$endpoint = new Endpoint();
$endpoint->route();