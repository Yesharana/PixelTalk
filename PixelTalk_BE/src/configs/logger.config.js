import winston from "winston";

const enumerateErrorFormat = winston.format((info)=>{
    if(info instanceof Error)
    {
        Object.assign(info, {message: info.stack});
    }
    return info;
});

winston.addColors({
  info: 'green', // fontStyle color
  error: 'bold red'
});

const logger = winston.createLogger({
    level: process.env.NODE_ENV === "development" ? "debug" : "info",
    format : winston.format.combine(
        enumerateErrorFormat(),
        process.env.NODE_ENV === "development" ? winston.format.colorize({all: true}) : winston.format.colorize(),
        winston.format.splat(),
        winston.format.printf(({level,message})=> `${level} : ${message}`)
    ),
    transports: [
        new winston.transports.Console({
            stderrLevels: ["errors"],
        }),
    ],
});

export default logger;