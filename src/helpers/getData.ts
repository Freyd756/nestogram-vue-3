export default async (path:string, token:string|null ):Promise<any>=> {
  const response = !token ?  await (
    //   @ts-ignore
    await fetch(`${import.meta.env. VITE_VUE_APP_API_URL}/${path}`, {
      method: 'GET',
    })
  ).json() : await (
      //   @ts-ignore
      await fetch(`${import.meta.env. VITE_VUE_APP_API_URL}/${path}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization':`Bearer ${token}`
      },
    })
  ).json();

  return response;
};
