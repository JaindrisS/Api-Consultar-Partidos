# Se debe construir un API Rest que devuelva cierta información básica sobre el equipo de los “....”. Este API será un microservicio que se conecte a una DB de mongo y se utilice para guardar información en la misma y devolver ciertas cuentas simples para que …. luego se entrene.

1.  Los calls que se piden son los siguientes:

# GET Resultado del último partido

# GET Resultado de un partido en particular

# Se pueda buscar por fecha

# GET Partidos por intervalo de fecha

# GET para obtener los puntos que tiene Leicester por un rango de fechas

# GET del nombre del equipo que más goles le hizo al Leicester

# GET de todos los partidos

2.

# Implementar un método POST para agregar un partido a mano, con las mismas carácterísticas que los partidos provenientes del api.

# Tener precauciones de realizar todas las validaciones correspondientes El API propia debe devolver la MONGO DB. De ninguna manera se debe ir a buscar en vivo resultados contra un request.

# Considere:

# Buscamos además de un código ordenado y legible. Levemente comentado mejor.

3.

# Implementar AUTH con jwt token cosa que para poder leer o hacer cualquier request debas antes obtener un authtoken logueandote y permita

# registrarse con user y password.

# Disponibilizar el API en un servicio de hosting como Heroku o similar y la db en un sistema como Mongo Atlas o heroku mismo.

# Nota: No implementar librerías de alto nivel para trabajar directamente con mongoAdoptar una estructura como la del siguiente tipo para la colección de partidos

# \_id, golesAFavor, golesEnContra, fecha, puntos, rival

Adoptar una estructura como la del siguiente tipo para la colección de usuarios:

# \_id, usuario, password
