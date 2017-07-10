<?php
# Information
$domain = 'popsplit.us';
$name = ucwords($domain);
$href = 'http://'.$domain.'/';
$build = '239';
$publicversion = '3.1.0';
$cssfile = 'index';
$discordlink = 'https://discord.me/nerdsunited';
# Servers
$game = $_GET['game'];
$ip = $_GET['ip'];
$defaultmode = 'crazy';
# Settings
# Music Directory
$musicdir = '/assets/tracks/';
$musiccount = 9;
# First Modal
$modal = 'none';
# Sliders
$slide1 = 'skinPack1';
$slide2 = 'skinPack2';
$slide3 = 'song';
$slide4 = 'donate';
# Featured Skins #1
$skinpack1_1 = 'universalranger';
$skinpack1_2 = 'theprofessional';
$skinpack1_3 = 'slingblade';
$skinpack1_background = '/assets/img/packs/actionheros2.png';
$skinpack1_slidertitle = 'Action Heros II';
$skinpack1_slidertitlecolor = 'FFFFFF';
$skinpack1_title = 'Action Heros Vol. 2';
$skinpack1_subtitle = '';
# Featured Skins #2
$skinpack2_1 = 'slaughter';
$skinpack2_2 = 'eclipsehunter';
$skinpack2_3 = 'apocalypserider';
$skinpack2_background = '/assets/img/packs/actionheros3.png';
$skinpack2_slidertitle = 'Action Heros III';
$skinpack2_slidertitlecolor = 'FFFFFF';
$skinpack2_title = 'Action Heros Vol. 3';
$skinpack2_subtitle = '';
# Featured Song
$song = 7;
$songtitle = 'Midnight (Party Thi...';
$songartist = 'Still Young';
$songbackground = 'http://wallpaperscraft.com/image/snow_grass_tree_86282_602x339.jpg';
# Logic
$isIP=(bool)ip2long($_SERVER['HTTP_HOST']);if($isIP){header('Location: '.$href);}