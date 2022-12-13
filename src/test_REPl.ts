import repl from "repl";
import colors from "colors";

colors.enable();

// const cmd = repl.start({
//   prompt: "CELV => ".blue,
//   ignoreUndefined: true,
//   useColors: true,
//   preview: false
// });


// const state = {
//   printSomething(text: string) {
//     console.log("That's awesome! -> ", text);
//   }
// };

// Object.assign(cmd.context, state);

class CMD {
  public program: repl.REPLServer;

  constructor() {
    this.program = repl.start({
      prompt: "CELV => ".blue,
      ignoreUndefined: true,
      useColors: true,
      preview: false
    });

    this.exit();
  }

  public exit() {
    // this.program.on('exit', () => {
    //   console.log('Have a great day!');
    //   process.exit();
    // });

    this.program.on('SIGINT', () => {
      process.exit();
    });
  }
}

const cmd = new CMD();
