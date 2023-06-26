import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { doc,addDoc,collection,deleteDoc,updateDoc } from "firebase/firestore"; 
import { db } from "../../../../firebase";

function Items(props:any) {
    const [rubriquenames, setRubriquenames] = useState([])
    const [items, setitems] = useState([])
    const [iditem, setiditem] = useState('')
    const [etat, setetat] = useState('')
    const [rubriquename, setRubriquename] = useState('')
    const [projetname, setProjetname] = useState('')
    const [libelle, setlibelle] = useState('')
    const [qte, setqte] = useState('')
    const [pu, setpu] = useState('')
    const [fournisseur, setfournisseur] = useState('')
    const [libell, setlibell] = useState('')
    const [qt, setqt] = useState('')
    const [p, setp] = useState('')
    const [fournisseu, setfournisseu] = useState('')
    const [button, setbutton] = useState(true)
    let USDollar = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
  });
    const additem = async () => {
        
      try {
        await addDoc(collection(db, "items"), {
          idprojet:projetname,
          idrubrique: rubriquename,
          libelle:libell,
          qte:qt,
          pu:p,
          pt: parseFloat(qt)*parseFloat(p),
          fournisseur:fournisseur,
          temp:Date.now()
        });
        setlibell('')
        setqt('')
        setp('')
        setfournisseu('')
        setetat('insert')
        //alert('inserted')
      } catch (error) {
        console.log(error)
      }finally {
          
      }
     
  }
  const updateitem = async (id:any) => {
    
  }
  const deleteitem = async (id:any) => {
    setetat('')
    try {
      await deleteDoc(doc(db, "items", id));
      setetat('delete')
      //alert('item a ete suprimer')
    } catch (error) {
      
    }
  }

  const settingsinputs = async (libell:string,qt:string,p:string,fournisseu:string,idit:string) => {
     
      let lib = libelle.length === 0? libell:libelle
      let quantity = qte.length === 0? qt:qte
      let prix_inutaire = pu.length === 0? p:pu
      let fournis = fournisseur.length === 0? fournisseu: fournisseur
      try {
        const projetRef = doc(db, "items", idit);
  
        
        await updateDoc(projetRef, {
            idprojet:projetname,
            idrubrique: rubriquename,
            libelle:lib,
            qte:quantity,
            pu:prix_inutaire,
            pt: parseFloat(quantity)*parseFloat(prix_inutaire),
            fournisseur:fournis
        });
        setlibelle('')
        setqte('')
        setpu('')
        setfournisseur('')
        setbutton(true)
        alert('item a ete mise a jour')
      } catch (error) {
        
      }
      
  }


    useEffect(() => {
        const call = () =>{
          const temp:any = []
          props?.datarub.map((value:any,index:number)=>{
              (value?.data?.idprojet == projetname )? temp.push({id:value?.id,nomdurubrique:value?.data?.nomdurubrique}):''
          })
          setRubriquenames(temp)
        }
        call()
        
    }, [projetname])
    useEffect(() => {
        const call = () =>{
          const temp:any = []
          props?.dataitems.map((value:any,index:number)=>{
              (value?.data?.idrubrique == rubriquename )? temp.push({id:value?.id,data:value?.data}):''
          })
          setitems(temp)
        }

        call()
      
    }, [rubriquename,button,etat,pu,libelle,qte,fournisseur,p,libell,qt,fournisseu])
    
  return (
    <div className='m-5'>
        <p className='underline text-2xl font-bold text-center'>LISTE DE TOUT LES ITEMS</p>

        <div className='flex justify-between'>
            <div className=' bg-slate-400 p-4 rounded-md mt-7'>
                <p className='underline text-2xl font-bold text-center mb-5'>AJOUT DES ITEMS</p>
                <div className='flex mb-4'>
                  <p>Projet :</p>
                  <select value={projetname} onChange={(e)=>setProjetname(e.target.value)} className="border-1 bg-gray-100 h-7 rounded-md ml-[3rem] w-[12rem]">
                    <option value='projet'>Selectionne le projet</option>
                    {props?.data.map((value:any,index:number)=>(
                        <option value={value?.id} key={index}>{value?.data?.nomduprojet}</option>
                    ))}
                  </select>
                </div>
                <div className='flex mb-4'>
                  <p>Rubrique :</p>
                  <select value={rubriquename} onChange={(e)=>setRubriquename(e.target.value)} className="border-1 bg-gray-100 h-7 rounded-md ml-[1.5rem] w-[12rem]">
                    <option value='rubrique'>Selectionne la rubrique</option>
                    {rubriquenames.map((value:any,index:number)=>(
                        <option value={value?.id} key={index}>{value?.nomdurubrique}</option>
                    ))}
                  </select>
                </div>
                
                
                
                
                

                {button?(
                  <p></p>
                ):(
                  <p></p>
                )}

            </div>
            <div>

            <div className="flex flex-col max-h-[35rem]">
                  <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                      <div className="overflow-hidden">
                        <table className="min-w-full text-left text-sm font-light">
                          <thead className="border-b font-medium dark:border-neutral-500">
                            <tr>
                              <th scope="col" className="px-6 py-4">#</th>
                              <th scope="col" className="px-6 py-4">LIBELLE</th>
                              <th scope="col" className="px-6 py-4">QTE</th>
                              <th scope="col" className="px-6 py-4">P.U</th>
                              <th scope="col" className="px-6 py-4">P.T</th>
                              <th scope="col" className="px-6 py-4">FOURNISSEUR</th>
                              <th scope="col" className="px-6 py-4">UPDATE</th>
                              <th scope="col" className="px-6 py-4">DELETE</th>
                            </tr>
                          </thead>
                          <tbody>
                            {items.map((value:any,index:number)=>(
                                <tr className={value?.data?.idprojet?"border-b dark:border-neutral-500":'hidden'} key={index}>
                                  <td className="whitespace-nowrap px-6 py-4 font-medium text-gray-400">{index}</td>
                                  <td className="whitespace-nowrap px-6 py-4">
                                    <input className='text-gray-400' type='text' placeholder={value?.data?.libelle} onChange={(e)=>setlibelle(e.target.value)} />
                                  </td>
                                  <td className="whitespace-nowrap px-6 py-4">
                                    <input className='text-gray-400 w-[4rem]' type='text' placeholder={value?.data?.qte} onChange={(e)=>setqte(e.target.value)}  />  
                                  </td>
                                  <td className="whitespace-nowrap px-6 py-4">
                                    <input className='text-gray-400 w-[4rem]' type='text' placeholder={USDollar.format(value?.data?.pu)} onChange={(e)=>setpu(e.target.value)}  />  
                                  </td>
                                  
                                  <td className="whitespace-nowrap px-6 py-4 text-gray-400">{USDollar.format(value?.data?.pt)}</td>
                                  <td className="whitespace-nowrap px-6 py-4">
                                    <input className='text-gray-400' type='text' placeholder={value?.data?.fournisseur} onChange={(e)=>setfournisseur(e.target.value)} />
                                  </td>
                                  <td onClick={()=>settingsinputs(value?.data?.libelle,value?.data?.qte,value?.data?.pu,value?.data?.fournisseur,value?.id)} className="whitespace-nowrap px-6 py-4">
                                    <p  className='bg-green-300 p-2 cursor-pointer rounded-md hover:font-bold hover:text-xl'>UPDATE</p>
                                  </td>
                                  <td onClick={()=>deleteitem(value?.id)} className={props?.user?.username!=''? "whitespace-nowrap px-6 py-4":'hidden'}>
                                    <p className='bg-red-300 p-2 cursor-pointer rounded-md hover:font-bold hover:text-xl' >DELETE</p>
                                  </td>
                                </tr>
                            ))}

                                <tr className={rubriquename!=''?"border-b dark:border-neutral-500":'hidden'}>
                                  <td className="whitespace-nowrap px-6 py-4 font-medium">AJOUT</td>
                                  <td className="whitespace-nowrap px-6 py-4">
                                    <div className='mb-4'>
                                      <p>Libelle :</p>
                                      <input type='text' value={libell} onChange={(e)=>setlibell(e.target.value)}  placeholder='type...' className='border-1 bg-gray-100 h-7 rounded-md' />
                                    </div>  
                                  </td>
                                  <td className="whitespace-nowrap px-6 py-4">
                                    <div className='mb-4 w-3'>
                                      <p>Quantite :</p>
                                      <input type='number' value={qt}  onChange={(e)=>setqt(e.target.value)} placeholder='type...' className='border-1 bg-gray-100 w-16  h-7 rounded-md' />
                                    </div>  
                                  </td>
                                  <td className="whitespace-nowrap px-6 py-4">
                                    <div className='mb-4 w-[9rem]'>
                                      <p>P.U :</p>
                                      <input type='number' value={p}  onChange={(e)=>setp(e.target.value)} placeholder='type...' className='border-1 bg-gray-100 w-[7rem]  h-7 rounded-md' />
                                    </div>  
                                  </td>
                                  <td className="whitespace-nowrap px-6 py-4"></td>
                                  <td className="whitespace-nowrap px-6 py-4">
                                    <div className='mb-4'>
                                      <p>Fournisseur :</p>
                                      <input type='text' value={fournisseu}  onChange={(e)=>setfournisseu(e.target.value)} placeholder='type...' className='border-1 bg-gray-100 h-7 rounded-md' />
                                    </div>  
                                  </td>
                                  <td className="whitespace-nowrap px-6 py-4">
                                    <button onClick={()=>additem()}  className={rubriquename!=''?"bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mt-5":'hidden'}>
                                      AJOUT ITEM
                                    </button>
                                  </td>
                                  <td className="whitespace-nowrap px-6 py-4">
                                    
                                  </td>
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

export default Items