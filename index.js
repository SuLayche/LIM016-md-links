const functions = require ('./src/functions');

const mdLinks = (route, option = {}) => {
    return new Promise ((resolve, reject) => {
        if(!functions.existsRoute(route)){
            reject('route does not exist');
        } else {
            const linkProp = functions.propsLink(route);
            if(!(option.validate)){
                resolve(linkProp);
            }
                const statusLink = functions.getStatusLink(linkProp);
                resolve(statusLink);
            
        }

    });
}


// const resultado = mdLinks('D:\\Laboratoria\\LIM015-md-links\\prueba\\carpeta1', { validate: false })
// resultado
// .then((resul) => console.log (resul))
// .catch((err)=> console.log(err));


module.exports = () => {
    mdLinks
};
