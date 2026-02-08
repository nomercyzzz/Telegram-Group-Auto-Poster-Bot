import dotenv from "dotenv";
dotenv.config();

import { TelegramClient } from "telegram"
import { StringSession } from 'telegram/sessions/index.js'
import { setTimeout as sleep } from 'timers/promises'

import targerts from "./targets.js";
import { checkFiles, startTask, randomTime } from "./tasks.js";

const session = new StringSession(process.env.TG_SESSION);
const apiId = Number(process.env.TG_API_ID);
const apiHash = process.env.TG_API_HASH;
// время в минутах для рандомного интервала между отправками 
const globalTime = 4;
// время в минутах для ран. инт. при запуске
const startTime = 2;

(async function () {
    console.log("бот запускаеттся...");

    checkFiles(targerts);

    const client = new TelegramClient(session, apiId, apiHash, { connectionRetries: 5});

    try {
        await client.connect();
        console.log("вход в аккаунт прошел успешно")
    } catch {
        console.error("ошибка входа в аккаунт")
    }

    for (const target of targerts) {
        const startWaitTime = 10_000 + randomTime(startTime);

        console.log(`задача для ${target.name} запустится через ${Math.floor(startWaitTime / 60_000)} м. ${Math.floor((startWaitTime %  60_000) / 1000 )}c.`,)

        await sleep(startWaitTime);
        
        startTask(client, target, globalTime);
    }
})();
