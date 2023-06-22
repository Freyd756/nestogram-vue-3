
export default async (path:string, payload:any, token?:string|null):Promise<any> => {
  const data:any = !token
  ? {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    }
  : {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization':`Bearer ${token}`
      },
      body: JSON.stringify(payload)
    }
  const response = await (
    await fetch(`${import.meta.env. VITE_VUE_APP_API_URL?? 'http://localhost:8082'}/${path}`, data)
  ).json();

  return response;
};
// export default async (path, payload, token) => {
//   const data = token
//   ? {
//       method: 'POST',
//       body: payload
//     }
//   : {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json;charset=utf-8',
//         'Authorization':`Bеarer ${token}`
//       },
//       body: JSON.stringify(payload)
//     }
//   const response = await (
//     await fetch(`${process.env.VUE_APP_API_URL ?? 'http://localhost:8090'}/${path}`, data)
//   ).json();

//   return response;
// };
