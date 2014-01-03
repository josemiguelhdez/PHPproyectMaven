<?php
define("FONT_SIZE", 8);                            // font size in points
define("FONT_PATH", "fonts/arialbd.ttf"); // path to a ttf font file
define("FONT_COLOR", 0xFFFFFF);                  // 4 byte color
                                                   // alpha  -- 0x00 thru 0x7F; solid thru transparent
                                                   // red    -- 0x00 thru 0xFF
                                                   // greeen -- 0x00 thru 0xFF
                                                   // blue -- 0x00 thru 0xFF
                                                
$text = $_GET["text"];
$color = $_GET['color'];
$font_color = FONT_COLOR;
if ($color == "blanco")
	$font_color = 0x000000;
$gdimage = imagecreatefrompng("iconos/marker_".$color.".png");
imagesavealpha($gdimage, true);


list($x0, $y0, , , $x1, $y1) = imagettfbbox(FONT_SIZE, 0, FONT_PATH, $text);

$imwide = imagesx($gdimage) + 2;
$imtall = imagesy($gdimage) - 14;                  // adjusted to exclude the "tail" of the marker
$bbwide = abs($x1 - $x0);
$bbtall = abs($y1 - $y0);
$tlx = ($imwide - $bbwide) >> 1; $tlx -= 1;        // top-left x of the box
$tly = ($imtall - $bbtall) >> 1; $tly -= 1;        // top-left y of the box
$bbx = $tlx - $x0;                                 // top-left x to bottom left x + adjust base point
$bby = $tly + $bbtall - $y0;                       // top-left y to bottom left y + adjust base point

imagettftext($gdimage, FONT_SIZE, 0, $bbx, $bby, $font_color, FONT_PATH, $text);


header("Content-Type: image/png");
header("Expires: " . gmdate("D, d M Y H:i:s", time() + 60 * 60 * 24 * 180) . " GMT");
imagepng($gdimage);
?>