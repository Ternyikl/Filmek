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
    let [title, year, genre, rating] = e.trim().split(",")
    filmek.push({
        title: title!,
        year: Number(year!),
        genre: genre!,
        rating: Number(rating!)
    })
});


async function Folyamat()
{
    let fut = true;

    do{
        console.log(`Filmek listáka: 
           \t1. Filmek kilistáza (értékelés szerint csökkenő)
           \t2. Filmek kereséses műfaj alapján
           \t3. Filmek törlése egy megaddot értékelés alapján
           \t4. Kilépés`)

           let be = await rl.question(`válasz a lehetőségek közül (a sorszámmal): `);

            switch(be)
            {
                case "1":
                    let rendeszet: Film[] = [...filmek].sort((a,b) => b.rating - a.rating);
                    rendeszet.forEach( r => {
                        console.log(`${r.title} (${r.year}) Műfaj: ${r.genre} Értékelés: ${r.rating}/5`);
                    });
                    let kilepo1: string =  await rl.question(`Nyomj egy enter a tovább lépéshez`);
                    break;
                case "2":
                    let inputGenre: string =  await rl.question(`Adja meg a kereset műfajt: `);
                    if(filmek.some( x => x.genre === inputGenre))
                    {
                        filmek.forEach(f => {
                            if(f.genre === inputGenre)
                            {
                                console.log(`${f.title} (${f.year}) Műfaj: {${f.genre} Értékelés: ${f.rating}/5`);
                            }
                        });
                    }
                    else
                    {
                        console.log(util.styleText(['yellow'], 'A listában nincs ilyen műfaj!'));
                    }
                    let kilepo2: string =  await rl.question(`Nyomj egy enter a tovább lépéshez`);
                    break;
                case "3":
                    let inputRatingStr: string = await rl.question(`Adja meg törölné kivánt értékelésű filmek: `);
                    let { success, value } = tryParseNumber(inputRatingStr)

                    if(!success || value > 5 || value < 1)
                    {
                        console.log(util.styleText(['yellow'], 'Nem megfelelő értékellés, csak 1-5 közötti szám jó'));
                    }
                    else
                    {
                        if(filmek.some(x => x.rating === Number(value)))
                        {
                            filmek = filmek.filter(x => x.rating !== value);
                            console.log(`A ${value} értekésű filmeket törültök`)
                        }
                        else
                        {
                            console.log(util.styleText(['yellow'], 'Nincs ilyen értékelésű film a listában'));
                        }
                    }
                    let kilepo3: string =  await rl.question(`Nyomj egy enter a tovább lépéshez`);
                    break;
                case "4":
                    console.log("Kilépés")
                    fut = false;
                    break;
                default:
                    console.log("Nincs ilyen opció, a megaddot lehetőségek sorszámát használja")
                    break;
            }

    }while(fut)
}

function tryParseNumber(value: string): { success: boolean; value: number } {
  const parsed = Number(value);
  return {
    success: !isNaN(parsed) && value.trim() !== '',
    value: parsed,
  };
}

await Folyamat();