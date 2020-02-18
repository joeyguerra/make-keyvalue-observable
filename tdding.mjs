
console.clear()

const colors = {
    reset: "\x1b[0m",
    bright:"\x1b[1m",
    dim: "\x1b[2m",
    underscore: "\x1b[4m",
    blink: "\x1b[5m",
    reverse: "\x1b[7m",
    hidden: "\x1b[8m",
    fgBlack: "\x1b[30m",
    fgRed: "\x1b[31m",
    fgGreen: "\x1b[32m",
    fgYellow: "\x1b[33m",
    fgBlue: "\x1b[34m",
    fgMagenta: "\x1b[35m",
    fgCyan: "\x1b[36m",
    fgWhite: "\x1b[37m",
    bgBlack: "\x1b[40m",
    bgRed: "\x1b[41m",
    bgGreen: "\x1b[42m",
    bgYellow: "\x1b[43m",
    bgBlue: "\x1b[44m",
    bgMagenta: "\x1b[45m",
    bgCyan: "\x1b[46m",
    bgWhite: "\x1b[47m"
}

let plannedCount = 0
class Tdd extends Array {
    constructor(...args){
        super(...args)
    }
    plan(planned){
        plannedCount = planned
    }
    ok(check, message){
        plannedCount--
        if(check){
            console.log(`${colors.fgGreen}${message}${colors.reset}`)
          } else {
            console.log(`${colors.bgRed}${message}${colors.reset}`)
        }
    }
    async push(description, fn){
        super.push({description, fn})
    }
    async run(){
        for await (let example of this){
            await example.fn(this)
        }
    }
}

const tdding = new Tdd()
setImmediate(() => {
    tdding.run()
})
export default tdding
