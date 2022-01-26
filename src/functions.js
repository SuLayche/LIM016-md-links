const fs = require('fs'); // Nos permite accder a multiples funciones muy útiles para interactuar con el sistema de archivos.
const path = require('path'); // Nos permite acceder a multiples opciones para trabajar con rutas de archivos y directorios.

//const isRoute = 'D:\\LABORATORIA\\Mis proyectos BootCamp\\LIM016-md-links\\index.js';
const isRoute = 'D:\\LABORATORIA\\Mis proyectos BootCamp\\LIM016-md-links\\src\\data';
const isRouteAbsoluta = 'D:\\LABORATORIA\\Mis proyectos BootCamp\\LIM016-md-links\\src\\data\\prueba.md';
const isRouteRelativa = 'src\\data\\prueba.md';

//Funcion flecha (arrow function) para validar si la ruta o archivo existe
const existsRoute = (myRoute) => {
    return fs.existsSync(myRoute); // Retorna true si la ruta existe y false si no existe
};
console.log('1. ¿Existe la ruta?');
console.log(existsRoute(isRoute));
//console.log(`1. ¿Existe la ruta? :  ${existsRoute(isRoute)}`);


//Funcion flecha (arrow function) para Validar si la ruta es un Directorio
/*
El método fs.statSync() se utiliza para devolver información sobre la ruta del archivo dada de forma síncrona. El objeto fs.Stat devuelto tiene varios campos y métodos para obtener más detalles sobre el archivo.
*/
const routeIsDirectory = (myRoute) => {
    return fs.statSync(myRoute).isDirectory(); // Retorna true si es un Directorio y false si no lo es
};
console.log('2. ¿La ruta es un Directorio?');
console.log(routeIsDirectory(isRoute));
//console.log(`2. ¿La ruta es un Directorio? :  ${routeIsDirectory(isRoute)}`);

const routeIsFile = (myRoute) => {
    return fs.statSync(myRoute).isFile(); // Retorna true si es un Directorio y false si no lo es
};
console.log('3. ¿La ruta es un Archivo?');
console.log(routeIsFile(isRoute));
//console.log(`3. ¿La ruta es un Archivo? :  ${routeIsFile(isRoute)}`);


  
//Funcion flecha (arrow function) para validar si la ruta es relativa o asoluta
const absoluteRoute = (myRoute) => {
    if (path.isAbsolute(myRoute)) { // Valida si la ruta es absoluta
        console.log('Si es absoluta');
        return myRoute; // Si la ruta es absoluta devuelve la ruta.
    } 
    console.log('No es absoluta');
    return path.resolve(myRoute); // si la ruta no se absoluta, le convierto en absoluta.
};

console.log('4.1 ¿La ruta es Absoluta?');
console.log(absoluteRoute(isRouteAbsoluta));
console.log('4.2 ¿La ruta es Absoluta?');
console.log(absoluteRoute(isRouteRelativa));


//Funcion flecha (arrow function) para Validar si la ruta es un Archivo con extension .md
/*
El path.extname()método devuelve la extensión de path, desde la última aparición del carácter .(punto) hasta el final de la cadena en la última parte de path. Si no hay .en la última parte de path, o si no hay ningún .otro carácter que no sea el primer carácter del nombre base de path(ver path.basename()), se devuelve una cadena vacía.
*/
const isExtensionMd = (myRoute)=> {
  return path.extname(myRoute) === '.md' // Retorna true si la extensión de la ruta es equivalente a .md
}
console.log('5. ¿Es un archivo con extension .md?');
console.log(isExtensionMd(isRouteRelativa));


// Leer archivo y extraer links
// Tienes que crear un metodo que reciba como parametro una ruta, y que devuelva los link
// encontrados dentro de ese archivo
// 1. verificar si la ruta existe
// 2. verificar si es un archivo
// 3. verificar si tiene una extension md
// 4. Leer el archivo .md
// 5. verificar si existe links
// 6. extraer los links

//const readFile = (myRoute) => {    
  //  return fs.readFileSync(myRoute,'utf8');
//}

const routesFilesMd = (myRoute) => {
    if (existsRoute(myRoute)) {
        let routeFilesMd = [];
        if (routeIsDirectory(myRoute)) {
            //leer contenido del directorio
            //como leer lo que contiene un directiori
            const contentDirectory = fs.readdirSync(myRoute);
            const routeFiles = contentDirectory.map(route => path.join(myRoute,route));
            routeFilesMd = routeFiles.filter(route => isExtensionMd(route) === true);
            //readFile
        } else {
            if (isExtensionMd(myRoute)) {
                routeFilesMd.push(myRoute);
                //Leer archivo .md
            }
        }
        return routeFilesMd;
    } else {
        //ruta no existe
    }
}
console.log('6. Rutas de archivos .md');
console.log(routesFilesMd(isRoute));





// Funcion flecha (arrow function) para buscar archivos con extension .md
const browseFilesMd = (myRoute) => {
    let arrayFilesMd = [];
    const routeAbsolute = absoluteRoute(myRoute); //Convierte en absoluta
    if (routeIsDirectory(routeAbsolute)) { //Si es un Directorio
        const readDirectory = fs.readdirSync(routeAbsolute);// Lee el contenido del directorio de manera Syncrona.
        let routes = readDirectory.map((fileName) => { //Almacena las rutas
            return path.join(routeAbsolute, fileName);
        });
        routes.forEach(route => {
            const filesMd = browseFilesMd(route); //  rellenando en un array los archivos .md encontrados en un dir
            arrayFilesMd = arrayFilesMd.concat(filesMd); // al terminar de buscar en cada dir, todos los arrays generados con archivos .md, se concatenaran en unsolo array.
        }); 
    } else {
        
        if(isExtensionMd(myRoute)){ //Si es un archivo con extension .md
            arrayFilesMd.push(myRoute); //si la ruta es absoluta y tiene una extensión .md la agrego en mi arreglo
        }
    }
    return arrayFilesMd; //Retorna la lista de archivos MD
};



//console.log(readingLinks('./data/data.md'));

module.exports = {
    absoluteRoute,
    existsRoute,
    isExtensionMd,
    routeIsDirectory,
    browseFilesMd
}