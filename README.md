This for a user who need to track his visited country and make a count on it by seeing a world map.
BACIS  UNDERSTANDING:
    1.svg of world map
    2.script to change color of visited country
    3.uisng "ejs" to dynamically change landing page.
    4.server side API to add newly visited country.
    5.database postrgre is used.Two tables as "country" which have country code and name the country and "visited country" with id and code of the country.

WORK FLOW:
    1.In the country table all countries in the world with country code is available.
    3.in the visited table visited countries code only avalibale.
    2.when user login to landing page server side api(index.js) initiates the GET handller which send the html(ejs template ) file to that location( location set as port 3000-localhost--> http://localhost:3000).
    3 where visited countries are colored to show diiference from unvisited country.
    4.when user add a country, POST handller serach for country code in country table and add to the visited table.
    5.from there script(front-end javascript file not index file,script is soo small just for coloring so it written in ejs ) read the country code and serach for css id in the ejs file chang its color.
    note :svg are use for map,every svg is identified by id selector which is country code.

BEST PRACTICE:
try and cartch is properly used, thus api will not crash,and while it's build on "restful api architecture".
    
    
