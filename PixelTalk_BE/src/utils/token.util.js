import jwt from 'jsonwebtoken';
import logger from "../configs/logger.config.js";

export const sign = async (payload, expiresIn, secret) => {
    console.log('Entering sign function');
    console.log('Payload:', payload);
    console.log('Expires In:', expiresIn);
    console.log('Secret:', secret);

    return new Promise((resolve, reject) => {
        console.log('Promise');
        jwt.sign(payload, secret, {
            expiresIn: expiresIn,
        }, (error, token) => {
            if (error) {
                console.log('Error');
                logger.error(error);
                reject(error);
            } else {
                console.log('Token');
                console.log(payload, expiresIn, secret);
                resolve(token);
            }
        });
    });
};

export const verify=async(token,secret)=>{
    return new Promise((resolve,reject)=>{
        jwt.verify(token,secret,(error,payload)=>{
            if(error){
                logger.error(error);
                resolve(null);
            }else
            {
                resolve(payload);
            }
        });
    });
};