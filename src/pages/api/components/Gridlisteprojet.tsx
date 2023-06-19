import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { doc,addDoc,collection,deleteDoc,updateDoc } from "firebase/firestore"; 
import { db } from "../../../../firebase";

function Gridlisteprojet(props:any) {
    const [rubriquenames, setRubriquenames] = useState([])
    const [projetname, setProjetname] = useState('')
    const [projname, setProjname] = useState('')
    const [pu, setpu] = useState(0)
    const [pt, setpt] = useState(0)
    let USDollar = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });
    useEffect(() => {
        const temp:any = []
        props?.dataitems.map((value:any,index:number)=>{
            (value?.data?.idrubrique == props?.rubrique?.id )? temp.push({id:value?.id,data:value}):''
        })
        setRubriquenames(temp)
        
    }, [])

    useEffect(() => {
      
        let tempor:number = 0
        rubriquenames.map((value:any,index:number)=>{
          tempor = tempor + parseFloat(value?.data?.data?.pu) 
        })
        setpu(tempor)
        tempor = 0
    
        rubriquenames.map((value:any,index:number)=>{
          tempor = tempor + parseFloat(value?.data?.data?.pt) 
        })
        setpt(tempor)
        props?.projet.map((value:any,index:number)=>{
            (props?.rubrique?.idprojet == value?.id )? setProjname(value?.data?.nomduprojet):'';
            
        }
            
        )
        
    }, [rubriquenames])
    
  return (
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
                            {rubriquenames.map((value:any,index:number)=> (
                                <tr className="border-b dark:border-neutral-500" key={index}>
                                    <td className="whitespace-nowrap px-6 py-4 font-medium">{index}</td>
                                    <td className="whitespace-nowrap px-6 py-4">{projname}</td>
                                    <td className="whitespace-nowrap px-6 py-4">{props?.rubrique?.nomdurubrique}</td>
                                    <td className="whitespace-nowrap px-6 py-4">{value?.data?.data?.libelle}</td>
                                    <td className="whitespace-nowrap px-6 py-4">{value?.data?.data?.qte}</td>
                                    <td className="whitespace-nowrap px-6 py-4">{USDollar.format(value?.data?.data?.pu)}</td>
                                    <td className="whitespace-nowrap px-6 py-4">{USDollar.format(value?.data?.data?.pt)}</td>
                                    <td className="whitespace-nowrap px-6 py-4">{value?.data?.data?.fournisseur}</td>
                                    
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
  )
}

export default Gridlisteprojet