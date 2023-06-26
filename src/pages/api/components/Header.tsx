import React, { Dispatch, SetStateAction } from 'react'

interface p {
    pages: string;
    setPages : Dispatch<SetStateAction<string>>;
}
function 
header(props:p) {

    const paginating = (titre: string) => {
        props?.setPages(titre)
        
    }

   

    // https://firebase.google.com/docs/firestore/query-data/get-data?hl=fr
  return (
    <div className='shadow-md ml-2 mr-2'>
        <div className='flex justify-between p-5 text-lg cursor-pointer font-bold'>
            <p onClick={()=> paginating('projet') } className='p-1 bg-slate-100 rounded-md text-gray-600 hover:bg-slate-100 hover:text-black hover:text-2xl'>AJOUT PROJET</p>
            <p onClick={()=> paginating('rubrique') } className='p-1 bg-slate-100 rounded-md text-gray-600 hover:bg-slate-100 hover:text-black hover:text-2xl'>AJOUT RUBRIQUE</p>
            <p onClick={()=> paginating('items') } className='p-1 bg-slate-100 rounded-md text-gray-600 hover:bg-slate-100 hover:text-black hover:text-2xl'>AJOUT DES ITEMS DANS LA RUBRIQUE</p>
            <p onClick={()=> paginating('liste projet') } className='p-1 bg-slate-100 rounded-md text-gray-600 hover:bg-slate-100 hover:text-black hover:text-2xl'>LISTE DES PROJETS</p>
            <p onClick={()=> paginating('liste rubrique') } className='p-1 bg-slate-100 rounded-md text-gray-600 hover:bg-slate-100 hover:text-black hover:text-2xl'>LISTE DES RUBRIQUES</p>
            <img onClick={()=> paginating('login') } className='cursor-pointer w-10 h-10' src='https://www.freeiconspng.com/thumbs/login-icon/user-login-icon-29.png' />
        </div>
    </div>
  )
}

export default 
header