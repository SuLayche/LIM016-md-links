"use strict";

var fs = require('fs'); // Nos permite accder a multiples funciones muy útiles para interactuar con el sistema de archivos.


var path = require('path'); // Nos permite acceder a multiples opciones para trabajar con rutas de archivos y directorios.
//const isRoute = 'D:\\LABORATORIA\\Mis proyectos BootCamp\\LIM016-md-links\\index.js';


var isRoute = "C:\\Users\\N18\\OneDrive\\Documentos\\GitHubProyects\\LIM016-md-links\\src\\data";
var isRouteAbsoluta = "C:\\Users\\N18\\OneDrive\\Documentos\\GitHubProyects\\LIM016-md-links\\src\\data"; // const isRoute = 'D:\\LABORATORIA\\Mis proyectos BootCamp\\LIM016-md-links\\src\\data';
// const isRouteAbsoluta = 'D:\\LABORATORIA\\Mis proyectos BootCamp\\LIM016-md-links\\src\\data\\prueba.md';

var isRouteRelativa = 'src\\data\\prueba.md'; //Funcion flecha (arrow function) para validar si la ruta o archivo existe

var existsRoute = function existsRoute(myRoute) {
  return fs.existsSync(myRoute); // Retorna true si la ruta existe y false si no existe
};

console.log('1. ¿Existe la ruta?');
console.log(existsRoute(isRoute)); //console.log(`1. ¿Existe la ruta? :  ${existsRoute(isRoute)}`);
//Funcion flecha (arrow function) para Validar si la ruta es un Directorio

/*
El método fs.statSync() se utiliza para devolver información sobre la ruta del archivo dada de forma síncrona. El objeto fs.Stat devuelto tiene varios campos y métodos para obtener más detalles sobre el archivo.
*/

var routeIsDirectory = function routeIsDirectory(myRoute) {
  return fs.statSync(myRoute).isDirectory(); // Retorna true si es un Directorio y false si no lo es
};

console.log('2. ¿La ruta es un Directorio?');
console.log(routeIsDirectory(isRoute)); //console.log(`2. ¿La ruta es un Directorio? :  ${routeIsDirectory(isRoute)}`);

var routeIsFile = function routeIsFile(myRoute) {
  return fs.statSync(myRoute).isFile(); // Retorna true si es un Directorio y false si no lo es
};

console.log('3. ¿La ruta es un Archivo?');
console.log(routeIsFile(isRoute)); //console.log(`3. ¿La ruta es un Archivo? :  ${routeIsFile(isRoute)}`);
//Funcion flecha (arrow function) para validar si la ruta es relativa o asoluta

var absoluteRoute = function absoluteRoute(myRoute) {
  if (path.isAbsolute(myRoute)) {
    // Valida si la ruta es absoluta
    console.log('Si es absoluta');
    return myRoute; // Si la ruta es absoluta devuelve la ruta.
  }

  console.log('No es absoluta');
  return path.resolve(myRoute); // si la ruta no se absoluta, le convierto en absoluta.
};

console.log('4.1 ¿La ruta es Absoluta?');
console.log(absoluteRoute(isRouteAbsoluta));
console.log('4.2 ¿La ruta es Absoluta?');
console.log(absoluteRoute(isRouteRelativa)); //Funcion flecha (arrow function) para Validar si la ruta es un Archivo con extension .md

/*
El path.extname()método devuelve la extensión de path, desde la última aparición del carácter .(punto) hasta el final de la cadena en la última parte de path. Si no hay .en la última parte de path, o si no hay ningún .otro carácter que no sea el primer carácter del nombre base de path(ver path.basename()), se devuelve una cadena vacía.
*/

var isExtensionMd = function isExtensionMd(myRoute) {
  return path.extname(myRoute) === '.md'; // Retorna true si la extensión de la ruta es equivalente a .md
};

console.log('5. ¿Es un archivo con extension .md?');
console.log(isExtensionMd(isRouteRelativa)); // Leer archivo y extraer links
// Tienes que crear un metodo que reciba como parametro una ruta, y que devuelva los link
// encontrados dentro de ese archivo
// 1. verificar si la ruta existe
// 2. verificar si es un archivo
// 3. verificar si tiene una extension md
// 4. Leer el archivo .md
// 5. verificar si existe links
// 6. extraer los links

var readFile = function readFile(myRoute) {
  return fs.readFileSync(myRoute, 'utf8');
};

var routesFilesMd = function routesFilesMd(myRoute) {
  if (existsRoute(myRoute)) {
    var routeFilesMd = [];

    if (routeIsDirectory(myRoute)) {
      //leer contenido del directorio
      //como leer lo que contiene un directiori
      var contentDirectory = fs.readdirSync(myRoute);
      var routeFiles = contentDirectory.map(function (route) {
        return path.join(myRoute, route);
      });
      routeFilesMd = routeFiles.filter(function (route) {
        return isExtensionMd(route) === true;
      }); //readFile
    } else {
      if (isExtensionMd(myRoute)) {
        routeFilesMd.push(myRoute); //Leer archivo .md
      }
    }

    return routeFilesMd;
  } else {//ruta no existe
  }
};

console.log('6. Rutas de archivos .md');
console.log(routesFilesMd(isRoute)); // Funcion flecha (arrow function) para buscar archivos con extension .md y retornar las rutas de estos

var browseFilesMd = function browseFilesMd(myRoute) {
  var arrayFilesMd = [];
  var routeAbsolute = absoluteRoute(myRoute); //Convierte en absoluta

  if (routeIsDirectory(routeAbsolute)) {
    //Si es un Directorio
    //leer carpetas
    var contentDirectory = fs.readdirSync(routeAbsolute); // Lee el contenido del directorio de manera Syncrona.

    var routes = contentDirectory.map(function (fileName) {
      //Almacena las rutas
      return path.join(routeAbsolute, fileName);
    });
    routes.forEach(function (route) {
      var filesMd = browseFilesMd(route); //  rellenando en un array los archivos .md encontrados en un dir

      arrayFilesMd = arrayFilesMd.concat(filesMd); // al terminar de buscar en cada dir, todos los arrays generados con archivos .md, se concatenaran en unsolo array.
    });
  } else {
    if (isExtensionMd(myRoute)) {
      //Si es un archivo con extension .md
      arrayFilesMd.push(myRoute); //si la ruta es absoluta y tiene una extensión .md la agrego en mi arreglo
    }
  }

  return arrayFilesMd; //Retorna la lista de rutas de archivos MD encontrados
};

console.log('7. Rutas de todos los archivos .md');
console.log(browseFilesMd(isRoute));
var regExpLink = /\[([\w\s\d.()]+)\]\(((?:\/|https?:\/\/)[\w\d./?=#&_%~,.:-]+)\)/mg;
var regExpUrl = /\(((?:\/|https?:\/\/)[\w\d./?=#&_%~,.:-]+)\)/mg;
var regExpText = /\[[\w\s\d.()]+\]/; //leer los archivos y extraer los links. Esta funcion me retorna un arreglo de objetos con los links encontados.

var readingLinksFile = function readingLinksFile(myFileRoute) {
  var contentFile = readFile(myFileRoute); //leemos el archivo 

  var listlinks = contentFile.match(regExpLink);
  /* Match para extraer los links que coincidan con la expresion regular 
     se usa para obtener todas las ocurrencias de la expresión regular dentro de una cadena.*/

  if (listlinks === null) {
    return [];
  }

  return listlinks.map(function (link) {
    var hrefLink = link.match(regExpUrl).join().slice(1, -1); //URL encontradas

    var textLink = link.match(regExpText).join().slice(1, -1); //Texto que aparecía dentro del link

    return {
      href: hrefLink,
      //Url del link
      text: textLink,
      //Texto del Link
      fileName: myFileRoute //Ruta del archivo donde se encontró el link.

    };
  });
};

console.log('8. Extraer links de un archivo .md');
console.log(readingLinksFile(isRouteRelativa));

var linksFiles = function linksFiles(myRoute) {
  var listFilesMd = browseFilesMd(myRoute);
  var listLinks = listFilesMd.map(function (file) {
    return readingLinksFile(file);
  });
  return listLinks;
};

console.log('9. Extraer links de un archivo .md');
console.log(linksFiles(isRoute));
/*
const readfolder = (ruta) => {
    const readDirectory = fs.readdirSync(routeAbsolute);// Lee el contenido del directorio de manera Syncrona.
    return readDirectory;

}


const busqueda = (ruta) => {

}
*/

module.exports = {
  absoluteRoute: absoluteRoute,
  existsRoute: existsRoute,
  isExtensionMd: isExtensionMd,
  routeIsDirectory: routeIsDirectory,
  browseFilesMd: browseFilesMd
};

function factorial(n) {
  if (n < 1) {
    throw new Error('Solo positivo');
  }

  var acumulador = 1;

  for (var i = 1; i <= n; i++) {
    acumulador = acumulador * i;
    console.log(acumulador);
  }

  return acumulador;
}

console.log('Final : ', factorial(5));