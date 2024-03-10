import { Account } from "next-auth";

export async function getCycleCollection(account: Account) {

    let nexttoken: string | undefined = undefined;

    let get_dates = '?start=2023-01-01T00:00:00.000Z&end=2024-01-01T00:00:00.000Z'


    let url = encodeURI('https://api.prod.whoop.com/developer/v1/cycle' + get_dates);


    // await fetch('https://api.prod.whoop.com/developer/v1/cycle' + get_dates, {
    await fetch(url, {

        method: 'GET',
        headers: {
            "Authorization": `Bearer ${account.access_token}`
        }
    }
    )
        .then(response => response.json())
        .then(data => {
            // 'data' is the JavaScript object obtained from the response
            let myVariable = data;
            // Now you can use 'myVariable' as needed
            console.log('*** Cycle ***');
            console.log('data', data);
            console.log('next_token', data.next_token);
            nexttoken = data.next_token;
        });

    let n = 0;
    while (nexttoken !== undefined) {
        n = n + 1;
        let get_dates2 = '&start=2023-01-01T00:00:00.000Z&end=2024-01-01T00:00:00.000Z'
        let url2 = encodeURI('https://api.prod.whoop.com/developer/v1/cycle?' + nexttoken + get_dates);

        //        await fetch('https://api.prod.whoop.com/developer/v1/cycle?next_token=' + nexttoken + get_dates2, {

        await fetch(url2, {

            method: 'GET',
            headers: {
                "Authorization": `Bearer ${account.access_token}`
            }
        }
        )
            .then(response => response.json())
            .then(data => {
                // 'data' is the JavaScript object obtained from the response
                let myVariable = data;
                // Now you can use 'myVariable' as needed
                console.log('*** Cycle ***');
                console.log('data', data);
                console.log('next_token', data.next_token);
                console.log('n = ', n);
                nexttoken = data.next_token;

            });




    }


}
/*
    "id": 93845,
"user_id": 10129,
"created_at": "2022-04-24T11:25:44.774Z",
"updated_at": "2022-04-24T14:25:44.774Z",
"start": "2022-04-24T02:25:44.774Z",
"end": "2022-04-24T10:25:44.774Z",
"timezone_offset": "-05:00",
"score_state": "SCORED",
"score": {
"strain": 5.2951527,
"kilojoule": 8288.297,
"average_heart_rate": 68,
"max_heart_rate": 141
}
}
],
"next_token": "MTIzOjEyMzEyMw"
}*/