import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { doc,addDoc,collection,deleteDoc,updateDoc } from "firebase/firestore"; 
import { db } from "../../../../firebase";

function Listerubrique(props:any) {
  const [rubriquenames, setRubriquenames] = useState([])
  const [items, setitems] = useState([])
  const [iditem, setiditem] = useState('')
  const [rubname, setrubname] = useState('')
  const [projname, setprojname] = useState('')
  const [rubriquename, setRubriquename] = useState('')
    const [projetname, setProjetname] = useState('')
    const [pu, setpu] = useState(0)
    const [pt, setpt] = useState(0)
  let USDollar = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

useEffect(() => {
    const call = () => {
        const temp:any = []
        props?.datarub.map((value:any,index:number)=>{
            (value?.data?.idprojet == projetname )? temp.push({id:value?.id,nomdurubrique:value?.data?.nomdurubrique}):''
          })
        setRubriquenames(temp)
      
        props?.data.map((value:any,index:number)=>{
          (value?.id == projetname )? setprojname(value?.data?.nomduprojet):''
        })
    }

    call()
  
}, [projetname])
useEffect(() => {
    const call = () => {
      const temp:any = []
      props?.dataitems.map((value:any,index:number)=>{
          (value?.data?.idrubrique == rubriquename )? temp.push({id:value?.id,data:value?.data}):''
      })
      setitems(temp)
    
      
      rubriquenames.map((value:any,index:number)=>{
        (value?.id == rubriquename )? setrubname(value?.nomdurubrique):'';
      })
    }
    call()

}, [rubriquename])

useEffect(() => {
      
    let tempor:number = 0
    items.map((value:any,index:number)=>{
      tempor = tempor + parseFloat(value?.data?.pu) 
    })
    setpu(tempor)
    tempor = 0

    items.map((value:any,index:number)=>{
      tempor = tempor + parseFloat(value?.data?.pt) 
    })
    setpt(tempor)
}, [items])


  return (
    <div className='m-5'>
        <p className='underline text-2xl font-bold text-center'>LISTE DE CHAQUE RUBRIQUE</p>

        <div className='flex justify-between'>
            <div className=' bg-slate-400 p-4 rounded-md mt-7'>
                <p className='underline text-2xl font-bold text-center mb-5'>FILTRAGE DES RUBRIQUES</p>
                <div className='flex mb-4'>
                  <p>Projet:</p>
                  <select value={projetname} onChange={(e)=>setProjetname(e.target.value)} className="border-1 bg-gray-100 h-7 rounded-md ml-[3rem] w-[12rem]">
                    <option value='projet'>Selectionne le projet</option>
                    {props?.data.map((value:any,index:number)=>(
                        <option value={value?.id} key={index}>{value?.data?.nomduprojet}</option>
                    ))}
                  </select>
                </div>
                <div className='flex mb-4'>
                  <p>Rubrique:</p>
                  <select value={rubriquename} onChange={(e)=>setRubriquename(e.target.value)} className="border-1 bg-gray-100 h-7 rounded-md ml-[1.5rem] w-[12rem]">
                    <option value='rubrique'>Selectionne la rubrique</option>
                    {rubriquenames.map((value:any,index:number)=>(
                        <option value={value?.id} key={index}>{value?.nomdurubrique}</option>
                    ))}
                  </select>
                </div>
                
            </div>
            <div>

            <div className="flex flex-col max-h-72">
                  <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                      <div className="overflow-hidden">
                        <table className="min-w-full text-left text-sm font-light">
                          <thead className="border-b font-medium dark:border-neutral-500">
                            <tr>
                              <th scope="col" className="px-6 py-4">#</th>
                              <th scope="col" className="px-6 py-4">PROJET</th>
                              <th scope="col" className="px-6 py-4">RUBRIQUE</th>
                              <th scope="col" className="px-6 py-4">LIBELLE</th>
                              <th scope="col" className="px-6 py-4">QTE</th>
                              <th scope="col" className="px-6 py-4">P.U</th>
                              <th scope="col" className="px-6 py-4">P.T</th>
                              <th scope="col" className="px-6 py-4">FOURNISSEUR</th>
                            </tr>
                          </thead>
                          <tbody>
                            {items.map((value:any,index:number)=>(
                                <tr className={value?.data?.idprojet?"border-b dark:border-neutral-500":'hidden'} key={index}>
                                  <td className="whitespace-nowrap px-6 py-4 font-medium">{index}</td>
                                  <td className="whitespace-nowrap px-6 py-4 font-medium">{projname}</td>
                                  <td className="whitespace-nowrap px-6 py-4 font-medium">{rubname}</td>
                                  <td className="whitespace-nowrap px-6 py-4">{value?.data?.libelle}</td>
                                  <td className="whitespace-nowrap px-6 py-4">{value?.data?.qte}</td>
                                  <td className="whitespace-nowrap px-6 py-4">{USDollar.format(value?.data?.pu)}</td>
                                  <td className="whitespace-nowrap px-6 py-4">{USDollar.format(value?.data?.pt)}</td>
                                  <td className="whitespace-nowrap px-6 py-4">{value?.data?.fournisseur}</td>
                                  
                                </tr>
                            ))}

                                <tr className="border-b dark:border-neutral-500 font-bold" >
                                  <td className="whitespace-nowrap px-6 py-4 font-bold">TOTALE :</td>
                                  <td className="whitespace-nowrap px-6 py-4"></td>
                                  <td className="whitespace-nowrap px-6 py-4"></td>
                                  <td className="whitespace-nowrap px-6 py-4"></td>
                                  <td className="whitespace-nowrap px-6 py-4"></td>
                                  <td className="whitespace-nowrap px-6 py-4">{USDollar.format(pu)}</td>
                                  <td className="whitespace-nowrap px-6 py-4">{USDollar.format(pt)}</td>
                                  <td className="whitespace-nowrap px-6 py-4"></td>
                                  
                                </tr>
                            
                            
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>

            </div>


        </div>

    </div>
  )
}

export default Listerubrique