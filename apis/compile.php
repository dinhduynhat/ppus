<?php
$basePath = dirname(__FILE__);
$scriptDir = '../assets/js/sources/';
$compiledDir = '../assets/js/dist/';
if (is_dir($scriptDir)) {
  if ($dh = opendir($scriptDir)) {
    while (($file = readdir($dh)) !== false) {
      if (strpos($file, '.js') !== false && strpos($file, '.min.js') === false) {  
        $compilerCommand = sprintf('/usr/bin/java -jar %s/compiler.jar --js %s --js_output_file %s',
      $basePath, $scriptDir.$file, $compiledDir.str_replace('.js', '.min.js', $file));
    exec($compilerCommand, $return, $code);  
    if ($code != 0) {
      printf("Uh oh! Something went wrong: %s (%s)", join('<br/>', $return), $code);
    } else {
      printf("%s compiled successfully.<br/>", $file);
    }
      }

    }
    closedir($dh);
  }
}