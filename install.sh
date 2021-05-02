#!/bin/bash

echo 	SERVER BASICO DE REGISTRO.!
echo
echo	INSTALANDO REQUERIMIENTOS
echo
read	-rsp $'Pulsa ENTER para iniciar... \n'
start yarn install
echo
echo	INSTALACION DE REQUERIMIENTOS COMPLETADA
read	-rsp $'Pulsa ENTER para cerrar... \n'
start exit