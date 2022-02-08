const functions = require('./src/functions');

const mdLinks = (route, option = {}) => {
    return new Promise((resolve, reject) => {
        const absoluteRoute = functions.absoluteRoute(route); //Convertimos la ruta en absoluta
        if (!functions.existsRoute(absoluteRoute)) {
            reject('La ruta absoluta no existe...!!!');
        }
        let links = [];
        if (functions.routeIsDirectory(absoluteRoute)) { //Si la ruta absoluta es un directorio
            links = functions.linksFiles(absoluteRoute); // Extraer los links de cada archivo .md encontrado en ese directorio y sub-directorios
        } else if (functions.routeIsFile(absoluteRoute) && functions.isExtensionMd(absoluteRoute)) { // si la ruta absoluta es un archivo y tiene extension .md
            links = functions.readingLinksFile(absoluteRoute); // Extrae los links de ese archivo .md
        }
        if (links == []) {
            resolve('No se encontraron Links...!!!');
        }
        if (option.validate) { // Si la opcion validate es true
            resolve(functions.validateLinks(links));
        }
        resolve(links);
    });
}


// const resultado = mdLinks('src\\data\\', { validate: true })
// resultado
//     .then((resul) => console.log(resul))
//     .catch((err) => console.log(err));


module.exports = () => {
    mdLinks
};
