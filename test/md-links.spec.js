const mdLinks = require('../');

const functions = require('../src/functions');
const userPath = './README.md';

describe('probando la funcion absolutePath  para ver si la ruta es absoluta o relativa', () => {
  const result = functions.absolutePath(userPath)
  
  it('deberia negar la ruta ya que no es  absoluta', () => {
     
    expect(result).not.toStrictEqual(userPath);
  });
  it('deberia resolver la ruta si es relativa', () => {
    const result = functions.absolutePath(__dirname)
    
    expect(result).toStrictEqual(__dirname);
  });
 
});
describe('probando la funcion existsPath para verificar si el archivo existe', () => {
  
  it('deberia validar si el archivo exite', () => {
    const result = functions.existsPath(userPath)
    
    expect(result).toBeTruthy()
  });
});

describe('mdLinks', () => {

  it('should...', () => {
    console.log('FIX ME!');
  });

});
