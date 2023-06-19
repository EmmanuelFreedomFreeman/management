import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { doc,addDoc,collection,deleteDoc,updateDoc } from "firebase/firestore"; 
import { db } from "../../../../firebase";
import Gridlisteprojet from './Gridlisteprojet';

function Listeprojets(props:any) {
  const [rubriquenames, setRubriquenames] = useState([])
  const [projetname, setProjetname] = useState('')
  const [totale, settotale] = useState(0)
  let USDollar = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});
  useEffect(() => {
    let temp:any = []
    props?.datarub.map((value:any,index:number)=>{
        (value?.data?.idprojet == projetname )? temp.push({id:value?.id,nomdurubrique:value?.data?.nomdurubrique,idprojet:value?.data?.idprojet}):''
      })
    setRubriquenames(temp)
    temp = []
    props?.dataitems.map((value:any,index:number)=>{
      (value?.data?.idprojet == projetname )? temp.push({id:value?.id,data:value}):''
    })

    let t = 0
    temp.map((value:any,index:number)=>{
      t = t + parseFloat(value?.data?.data?.pt) 
      
    })

    settotale(t)

    
  }, [projetname])
  
  return (
    <div className='m-5'>
        <p className='underline text-2xl font-bold text-center'>AFFICHAGE DE TOUT LES PROJECTS</p>

        <div className='flex justify-between'>
            <div className=' bg-slate-400 p-4 rounded-md mt-7'>
                <p className='underline text-2xl font-bold text-center mb-5'>FILTRE DES PROJETS</p>
                <div className='flex mb-4'>
                  <p>Projet:</p>
                  <select value={projetname} onChange={(e)=>setProjetname(e.target.value)} className="border-1 bg-gray-100 h-7 rounded-md ml-[3rem] w-[12rem]">
                    <option value='projet'>Selectionne le projet</option>
                    {props?.data.map((value:any,index:number)=>(
                        <option value={value?.id} key={index}>{value?.data?.nomduprojet}</option>
                    ))}
                  </select>
                </div>

                <div>
                      <img className='max-h-28' src='https://cdn.shopify.com/s/files/1/0249/6376/files/prix_de_vente_1b66cd4d-20fc-4325-a0b3-8283c1542623.jpg?v=1551117622'  />
                      <p className='font-bold underline mt-3'>PRIX TOTALE : {USDollar.format(totale)}</p>
                </div>


            </div>
            <div className="flex flex-col max-h-screen">
              {rubriquenames.map((value:any,index:number)=> (
                  <div key={index}>
                      <Gridlisteprojet dataitems={props?.dataitems} rubrique={value} projet={props?.data}  />
                  </div>
              ))}
                      

            </div>


        </div>

    </div>
  )
}

export default Listeprojets