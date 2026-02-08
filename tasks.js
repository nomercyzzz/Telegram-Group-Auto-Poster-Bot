import { setTimeout as sleep } from "timers/promises";
import fs from 'fs'

// получае минуты и возращаем рандомное время в милисикундах
export const randomTime = (min) => {
    return Math.floor(Math.random() * min * 60 * 1000);
};

// проверка фоток 
export const checkFiles = (targerts) => {
    let errors = 0;

    for (let target of targerts) {
        for (let file of target.files) {
            if (!fs.existsSync(`./assets/${file}`)) {

                console.error(`файл ${file} не найден в папке assets`);

                errors++;
            }
        }
    }
    if (errors > 0) process.exit(1)
}

// функция для запуска задчи 
export async function startTask(client, target, globalTime) {
    const files = target.files.map((file) => "./assets/" + file);

    while (true) {

        try {
            console.log(`задача для ${target.name} началась`);

            const sendOptions = { message: target.text };

            if (files.length > 0) sendOptions.file = files;

            await client.sendMessage(target.link, sendOptions );


            console.log(`задача для ${target.name} выполнена успешно`);

        } catch (error) {
            console.error(`ошибка отправки - ${error}`);
        }

        const waitTime = randomTime(globalTime) + target.interval * 60 * 1000;

        console.log(` следующая отправка для ${target.name} будет ${new Date(Date.now() + waitTime).toLocaleString()}`);

        await sleep(waitTime)
    }
}
