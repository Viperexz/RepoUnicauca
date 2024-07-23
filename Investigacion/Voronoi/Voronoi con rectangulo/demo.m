clc; close all; clear;

% Tamaño del area delimitada 
imX1 = 0; imX2 = 120;
imY1 = 0; imY2 = 120;
VoronoiBoundary = [imX1 imX2 imY1 imY2]; % [xmin, xmax, ymin, ymax]
clip2boundary = 1;
%Numero de puntos a generar.
numPoints = 16;

% Define points for Voronoi diagram
X = randi([imX1,imX2], 1, numPoints);
Y = randi([imY1,imY2], 1, numPoints);

% Function callback
[vxO,vyO,vxClip,vyClip] = VoronoiLimitRectSquare(X, Y, VoronoiBoundary);