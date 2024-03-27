import { Account } from "next-auth";

export async function getProfileBasic(account: Account) {

    https://api.prod.whoop.com/developer/v1/user/profile/basic


    await fetch('https://api.prod.whoop.com/developer/v1/user/profile/basic', {

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

            console.log('user_id', data.user_id);
            console.log('email', data.email);
            console.log('first_name', data.first_name);
            console.log('last_name', data.last_name);

        });


    await fetch('https://api.prod.whoop.com/developer/v1/user/measurement/body', {

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

            console.log('height_meter', data.height_meter);
            console.log('weight_kilogram', data.weight_kilogram);
            console.log('max_heart_rate', data.max_heart_rate);

        })

}