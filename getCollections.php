<?php

$http_origin = $_SERVER['HTTP_ORIGIN'];
if ($http_origin == "http://library-test6.library.wwu.edu" || $http_origin == "http://library.wwu.edu" || $http_origin == "http://www.library.wwu.edu") {  
    header('Access-Control-Allow-Origin: *');
}

header('Access-Control-Allow-Methods: GET,POST');
header('Access-Control-Allow-Headers: X-Requested-With');

$ch = curl_init(); 
$curl_url =  "http://content.wwu.edu:81/dmwebservices/index.php?q=dmGetCollectionList/json";
curl_setopt($ch, CURLOPT_URL, "$curl_url"); 
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true); 
curl_setopt($ch, CURLOPT_HEADER, 0);
$records = curl_exec($ch); 

$array_records = json_decode($records,true);   # true=associative array, nothing=object

foreach ($array_records as $key1 => $value1) {
	echo "<div><input type='checkbox' class='collBoxes' name='alias' value='{$array_records[$key1]['alias']}'> {$array_records[$key1]['name']}</div>";
}

# var_dump($array_records);    # to see raw data

# close curl resource to free up system resources 
curl_close($ch); 

?>