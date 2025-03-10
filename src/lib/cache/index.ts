import path from "path";
import fs from "fs";

export const saveToCache = (cacheName: string, data: any) => {
   try {
       console.log(`Saving to cache ${cacheName}`);
       const filePath = path.join(process.cwd(), 'cache', `${cacheName}.json`);
       fs.mkdirSync(path.dirname(filePath), { recursive: true });
       fs.writeFileSync(filePath, JSON.stringify(data));
   } catch(e) {
         console.error(e);
   }
}

export const getFromCache = (cacheName: string) => {
    try {
        const filePath = path.join(process.cwd(), 'cache', `${cacheName}.json`);
        return  JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    } catch(e: any) {
        return false
    }
}