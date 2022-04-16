#!/usr/bin/env node
const index = require("../index");
const figlet = require("figlet");
// const { absoluteRoute,  } = require('./functions');
const { totalLinks, uniqueLinks, brokenLinks, help } = require("./functions");

let letters = figlet.textSync("Susan-md-links!", {
  font: "Ghost",
  horizontalLayout: "default",
  verticalLayout: "default",
  width: 80,
  whitespaceBreak: true,
});

const route = process.argv[2];
const [, , , ...options] = process.argv;
const validate = options.includes("--validate");
const stats = options.includes("--stats");
const otherPath =
  path === "--help" || path === "--validate" || path === "--stats";

if (options.length === 0 && route) {
  console.error("Ingrese la ruta de un archivo");
}

if (args.length === 1) {
  const miCallback = (res) => {
    return res.forEach((e) =>
      console.log(`\nhref: ${e.href}\ntext: ${e.text}\nfile: ${e.file}\n`)
    );
  };
  mdLinks(args[0], { validate: false })
    .then(miCallback)
    .catch((err) => console.log(err));
}

if (args.length === 2) {
  switch (args[1]) {
    case "--validate":
      mdLinks(args[0], { validate: true })
        .then((res) =>
          res.forEach((e) =>
            console.log(
              `\nhref: ${e.href} \ntext: ${e.text} \nfile: ${e.file} \nstatus: ${e.status} \nmessage: ${e.message}`
            )
          )
        )
        .catch((err) => console.log(err));
      break;

    case "--stats":
      mdLinks(args[0], { validate: true })
        .then((res) =>
          console.log(
            `Total: ${totalLinks(res)}
Unique: ${uniqueLinks(res)}`
          )
        )
        .catch((err) => console.log(err));
      break;

    case "--help":
      console.log(`${userHelp()}`);
      break;

    default:
      console.log(
        'Lo siento el comando no existe, puedes ver las opciones mediante el comando "--help" \nRecuerda usarlo de la siguiente manera "md-links (ruta) --help"'
      );
      break;
  }
}

if (args.length === 3) {
  if (
    (args[1] === "--stats" && args[2] === "--validate") ||
    (args[1] === "--validate" && args[2] === "--stats")
  ) {
    mdLinks(args[0], { validate: true })
      .then((res) =>
        console.log(
            `Total: ${totalLinks(res)}
            Unique: ${uniqueLinks(res)}
            Broken: ${brokenOfLinksStats(res)}`
        )
      )
      .catch((err) => console.log(err));
  } else {
    console.log(
      'Lo siento el comando no existe, puedes ver las opciones mediante el comando "--help" \nRecuerda usarlo de la siguiente manera "md-links (ruta) "--help"'
    );
  }
}
