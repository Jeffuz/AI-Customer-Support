'use client'
export default function Home() {

  const handleClick = async () =>{ 
    await fetch("/api/auth")
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
