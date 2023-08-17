<?php
/**
 * Autoloader for this App.
 */
function autoloader($className): void {
  // Base directory to load classes.
  $baseDir = __DIR__ . '/src/';

  // Split from '\' character.
  $class = preg_split('/\\\/', $className);

  // Convert namespace to file path.
  $filePath = $baseDir . end($class) . '.php';
  
  if (file_exists($filePath)) {
    include_once $filePath;
  }
}