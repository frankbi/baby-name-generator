<?php

	$GENERATED_NAME = $_POST['genName'];
	$FULL_NAME = $_POST['fullName'];
	$STATUS = $_POST['status'];

	if ($STATUS == 0) {
		$STATUS = "";
	} else if ($STATUS == 1) {
		$STATUS = "TRUE";
	}

	include "creds.php";
	include_once("Google_Spreadsheet.php");

	$ss = new Google_Spreadsheet($user, $pass);
	$ss->useWorksheet("Tallies");
	$ss->useSpreadsheet("baby-name-generator");

	$row = array (
		"Generated Name" => $GENERATED_NAME,
		"Derived From" => $FULL_NAME,
		"Like" => $STATUS
	);

	$ss->addRow($row);


?>