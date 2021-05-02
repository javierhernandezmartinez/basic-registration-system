#!/bin/bash

echo 	Abriendo Servidor http://localhost:4000
read	-rsp $'Pulsa ENTER para continuar... \n'
start node bin/www
start chrome http://localhost:4000