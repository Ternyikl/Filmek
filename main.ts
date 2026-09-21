import fs from "node:fs";
import util from 'node:util';
import type { Film } from "./types.ts";
import readline from 'node:readline/promises';
using rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let be = fs.readFileSync('filmek.csv', { encoding: 'utf-8' });

let seged: string[] = be.trim().split('\n').slice(1);

let filmek: Film[] = [];

seged.forEach(e => {
    let [title, year, genre, rating] = e.trim().split(";")
    filmek.push({
        title: title!,
        year: Number(year!),
        genre: genre!,
        rating: Number(rating!)
    })
});


function Folyamat()
{
    let fut = true;

    do{
        
    }while(!fut)
}