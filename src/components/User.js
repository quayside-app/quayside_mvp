'use client';
import {useState, useEffect} from 'react';

// async function getName() {
//   //?firstName=Mya&lastName=Schroder
//   fetch('/api/mongoDB/getUsers', {
//     method: 'GET',
//     headers: {},
//   }).then(async (response) => {
//       let body = await response.json();
//       if (!response.ok) {
//         console.error(body.message);
//       }else {
//         return body
//       }

//   }).catch(error => {
//       console.error(error);
//   });

// }

export default function DataDisplay() {
  const [name, setName] = useState(null);
  useEffect(() => {
    fetch('/api/mongoDB/getUsers?firstName=Mya&lastName=Schroder', {
      method: 'GET',
      headers: {},
    }).then(async (response) => {
        let body = await response.json();
        if (!response.ok) {
          console.error(body.message);
        }else {
          setName(body['users'][0]['firstName'] + ' ' + body['users'][0]['lastName'])
        }
  
    }).catch(error => {
        console.error(error);
    });
  });


    //const name = await getName()
   
    return (
        <div>
          <div>User: {name}</div>
        </div>
      );
}


