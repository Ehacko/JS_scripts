const fs = require('fs');

module.exports = ({path='', recursive=false, writed}) => {

  const txt = [
    `mixin include(str)`,
    `  case str`
  ],
  
  add_cases = (path, recursive) => {
    fs.readdirSync(`./views/${path}`).forEach(file => {
      file = file.split(".")
      if(file.length === 1) {
        if(!recursive) return;
        add_cases(`${path+file}/`, recursive)
      } else {
        if(file[1]!=='pug' || file[0] === 'di') return;
        file = file[0]
        txt.push(`    when "${file}"`);
        txt.push(`      include ${path+file}`);
      }
    });
  };

  add_cases(path, recursive)

  txt.push(`    default`)
  txt.push(`      p #{str} not found`)

  fs.writeFile('./views/di.pug', txt.join(`\n`), function (err) {
    if (err) throw err;
    writed ? writed() : false;
  });

};
