import { Account } from "next-auth";
import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()


export async function getCycleCollection(token) {

    let acccess_token = String(token);
    let nexttoken: string | null = null;
    let get_dates = '?start=2024-01-01T00:00:00.000Z&end=2024-01-15T00:00:00.000Z'

    let n: number = 0;
    let url: string = "";

    await deleteCycles();

    do {
        if (n === 0) {

            url = encodeURI('https://api.prod.whoop.com/developer/v1/cycle' + get_dates);

        }
        else {

            url = encodeURI('https://api.prod.whoop.com/developer/v1/cycle' + get_dates + '&nextToken=' + nexttoken);

        }
        const response = await fetch(url, {

            method: 'GET',
            headers: {
                "Authorization": `Bearer ${acccess_token}`
            }
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Rate Limit = ', response.headers.get("X-RateLimit-Remaining"));
            console.log('Rate Limit Reset = ', response.headers.get("X-RateLimit-Reset"));

            nexttoken = data.next_token;
            for (var key in data.records) {
                createCycle(data.records[key]);
            }

        } else {

            console.log('Error', response.status, response.statusText);
            return { error: { status: response.status, statusText: response.statusText } };

        }

        n = n + 1;
    } while (nexttoken !== null);

}


async function deleteCycles() {

    await prisma.cycle.deleteMany({

    });

}


async function createCycle(mydata) {


    await prisma.cycle.create({
        data: {

            cycle_id: mydata.id,
            user_id: mydata.user_id,
            created_at: mydata.created_at,
            updated_dt: mydata.updated_at,
            start: mydata.start,
            end: mydata.end,
            timezone_offset: mydata.timezone_offset,
            score_state: mydata.score_state,
            strain: mydata.score.strain,
            kilojoule: mydata.score.kilojoule,
            average_heart_rate: mydata.score.average_heart_rate,
            max_heart_rate: mydata.score.max_heart_rate
        },
    });

}