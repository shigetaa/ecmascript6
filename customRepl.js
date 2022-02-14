const repl = require("repl");
const replServer = repl.start({
    prompt: "> ",
});
replServer.context.name = "Shigeta";
replServer.context.multiply = require("./multiply").multiply;