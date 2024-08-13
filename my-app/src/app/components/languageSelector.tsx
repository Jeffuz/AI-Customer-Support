import { useState } from "react";
import { FaLanguage } from "react-icons/fa6";
import { PiCheckFat } from "react-icons/pi";

export default function LanguageSelector({selectedLanguage, setSelectedLanguage}: {selectedLanguage:string, setSelectedLanguage:Function}) {

  const [isActive, setIsActive] = useState(false)

  const handleSelect = (val:string) => {
    setSelectedLanguage(val)
    setIsActive(false)
  }

  return(
    <div onMouseLeave={() => setIsActive(false)}>
      <button id="dropdownDefaultButton" data-dropdown-toggle="dropdown" onClick={() => setIsActive(!isActive)}
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none
       focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex 
        items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
        <FaLanguage size={40} />
      </button>

      {isActive ? (      
      <div id="dropdown" className="fixed translate-x-[-60%] first-line:z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
        <ul className="py-2 text-center text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
          <li onClick={() => handleSelect("English")} className="flex justify-around px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
            <h3 className="">English</h3>
            {selectedLanguage === "English" ? <PiCheckFat/> : null}
          </li>
          <li onClick={() => handleSelect("Chinese")} className="flex justify-around px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
            <h3 >Chinese</h3>
            {selectedLanguage === "Chinese" ? <PiCheckFat/> : null}
          </li>
          <li onClick={() => handleSelect("Spanish")} className="flex justify-around px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
            <h3>Spanish</h3>
            {selectedLanguage === "Spanish" ? <PiCheckFat/> : null}
          </li>
        </ul>
      </div>) : (null)
      }

    </div>


  )
}