<?php
header('Content-type: text/plain');
echo json_encode(str_replace('.png','',str_replace('../skins/','',glob("../skins/*.{png}", GLOB_BRACE))));