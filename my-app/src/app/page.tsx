'use client'
export default function Home() {

  const handleClick = async () =>{ 
    const headers = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({message: "where are the nonfiction books located?"})
    }

    await fetch("/api/genMsg", headers)
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(e => console.log(e))
  }

  return (
    <button onClick={handleClick}>
      Clicktuiowaghbtiu
    </button>
  )
}
