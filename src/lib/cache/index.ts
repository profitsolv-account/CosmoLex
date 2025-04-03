import path from "path";
import fs from "fs";

const cacheDir = path.join('./src/lib', 'cache');
//const cacheDir = path.join(process.cwd(), 'cache');

export const saveToCache = (cacheName: string, data: any) => {
   try {
       console.log(`Saving to cache ${cacheName}`);
       if (!fs.existsSync(process.cwd())) {
           return;
       }
       const filePath = path.join(cacheDir, `${cacheName}.json`);
       fs.mkdirSync(path.dirname(filePath), { recursive: true });
       fs.writeFileSync(filePath, JSON.stringify(data));
   } catch(e) {
       console.error(e);
       return false;
   }
}

export const getFromCache = (cacheName: string) => {
    try {
        const filePath = path.join(cacheDir, `${cacheName}.json`);
        return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    } catch(e: any) {
        return false
    }
}