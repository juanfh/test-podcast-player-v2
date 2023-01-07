export const getData = async ({ url }: { url: string }) => {

  return await fetch(`/api/getData`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ url })
  }).then(res => res.json()).then(data => data.data ? data.data : data)
}