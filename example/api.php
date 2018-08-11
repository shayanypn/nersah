<?php

$_code = isset($_GET['code']) ? $_GET['code'] : 200;

if ( $_code ) {
	http_response_code($_code);
}
sleep(3);

// Allow from any origin
if (isset($_SERVER['HTTP_ORIGIN'])) {
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 86400');    // cache for 1 day
}

// Access-Control headers are received during OPTIONS requests
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {

    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS");         

    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
        header("Access-Control-Allow-Headers:        {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");

    exit(0);
}

header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');


header('Content-Type:application/json');
$post = file_get_contents('php://input');

if ($_SERVER['CONTENT_TYPE'] == 'application/json') {
	$post = json_decode($post);
}

$response = array();
$response['method'] = $_SERVER['REQUEST_METHOD'];
$response['status'] = $_code;
$response['post'] = $post;
$response['get'] = $_GET;




echo json_encode($response);
