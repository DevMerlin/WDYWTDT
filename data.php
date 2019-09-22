<?PHP
$PHPIP = get_client_ip();

if ($PHPIP == "::1")
{
	$PHPIP = "";
}

$curl = curl_init('http://ipinfo.io/' . $PHPIP);
curl_setopt($curl, CURLOPT_RETURNTRANSFER, TRUE);

$json = curl_exec($curl);

$decode = json_decode($json);

$city = $decode->city;
$region = $decode->region;

$UserCoords = $decode->loc;

// Setup Data for Player - Designed to fetch weather eventually //
$GeoSplit = explode(",", $UserCoords);

$StatusData = '{"playerData": {
  "geolocE": '. $GeoSplit[0] . ',
  "geolocW": '. $GeoSplit[1] . ',
  "city": "'. $city . '",
  "region": "'. $region . '",
  "currentWeather": "null"
}}';


echo $StatusData;

function get_client_ip() {
	$ipaddress = '';
	if (getenv('HTTP_CLIENT_IP'))
		$ipaddress = getenv('HTTP_CLIENT_IP');
	else if(getenv('HTTP_X_FORWARDED_FOR'))
		$ipaddress = getenv('HTTP_X_FORWARDED_FOR');
	else if(getenv('HTTP_X_FORWARDED'))
		$ipaddress = getenv('HTTP_X_FORWARDED');
	else if(getenv('HTTP_FORWARDED_FOR'))
		$ipaddress = getenv('HTTP_FORWARDED_FOR');
	else if(getenv('HTTP_FORWARDED'))
	   $ipaddress = getenv('HTTP_FORWARDED');
	else if(getenv('REMOTE_ADDR'))
		$ipaddress = getenv('REMOTE_ADDR');
	else
		$ipaddress = 'UNKNOWN';
	return $ipaddress;
}