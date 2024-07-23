N = longitud (c) ;     % número total de v/c
IDc = celda (N, 1) ;   % Inicializar para almacenar vecinos de cada c
n = 5 ;            % número de vecinos buscados  
for i1 = 1:N         % ciclo para cada c
    Ni = longitud(c{i1}) ;   % número de puntos en cada c
    IDci = celda(Ni,1) ;    % de inicialización para almacenar cada c
    for j1 = 1:Ni           % ciclo para cada punto en c
        [IDX,D] = knnsearch(Pos,v(c{i1}(j1),:), 'k' ,nn) ;
        IDci{j1} = IDX;   % almacenar a los vecinos
    final
    IDc{i1} = IDci ;
final