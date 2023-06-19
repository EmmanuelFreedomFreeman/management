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
    const [qte, setqte] = useState(1)
    const [pu, setpu] = useState(0)
    const [fournisseur, setfournisseur] = useState('')
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
          libelle:libelle,
          qte:qte,
          pu:pu,
          pt: qte*pu,
          fournisseur:fournisseur
        });
        setlibelle('')
        setqte(1)
        setpu(0)
        setfournisseur('')
        setetat('insert')
        alert('inserted')
      } catch (error) {
        console.log(error)
      }finally {
          
      }
     
  }
  const updateitem = async (id:any) => {
    try {
      const projetRef = doc(db, "items", id);

      
      await updateDoc(projetRef, {
          idprojet:projetname,
          idrubrique: rubriquename,
          libelle:libelle,
          qte:qte,
          pu:pu,
          pt: qte*pu,
          fournisseur:fournisseur
      });
      setlibelle('')
      setqte(1)
      setpu(0)
      setfournisseur('')
      setbutton(true)
      alert('item a ete mise a jour')
    } catch (error) {
      
    }
  }
  const deleteitem = async (id:any) => {
    try {
      await deleteDoc(doc(db, "items", id));
      setetat('delete')
      alert('item a ete suprimer')
    } catch (error) {
      
    }
  }

  const settingsinputs = (libelle:string,qte:number,pu:number,fournisseur:string,idite:string) => {
      setlibelle(libelle)
      setqte(qte)
      setpu(pu)
      setfournisseur(fournisseur)
      setbutton(false)
      setiditem(idite)
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
      
    }, [rubriquename,button,etat])
    
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
                <div className='flex mb-4'>
                  <p>Libelle :</p>
                  <input type='text' value={libelle} onChange={(e)=>setlibelle(e.target.value)}  placeholder='type...' className='border-1 bg-gray-100 ml-[2.5rem] h-7 rounded-md' />
                </div>
                <div className='flex mb-4'>
                  <p>Quantite :</p>
                  <input type='number' value={qte} onChange={(e)=>setqte(parseFloat(e.target.value)?parseFloat(e.target.value):Number)} placeholder='type...' className='border-1 bg-gray-100 ml-[1.5rem] h-7 rounded-md' />
                </div>
                <div className='flex mb-4'>
                  <p>P.U :</p>
                  <input type='number' value={pu} onChange={(e)=>setpu(parseFloat(e.target.value)?parseFloat(e.target.value):parseFloat('0'))} placeholder='type...' className='border-1 bg-gray-100 ml-[4rem] h-7 rounded-md' />
                </div>
                <div className='flex mb-4'>
                  <p>Fournisseur :</p>
                  <input type='text' value={fournisseur} onChange={(e)=>setfournisseur(e.target.value)} placeholder='type...' className='border-1 bg-gray-100 ml-1 h-7 rounded-md' />
                </div>
                

                {button?(
                  <button onClick={()=>additem()}  className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mt-5">
                  AJOUT ITEM
                </button>
                ):(
                  <button onClick={()=>updateitem(iditem)}  className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mt-5">
                    UPDATE ITEM
                  </button>
                )}

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
                                  <td className="whitespace-nowrap px-6 py-4 font-medium">{index}</td>
                                  <td className="whitespace-nowrap px-6 py-4">{value?.data?.libelle}</td>
                                  <td className="whitespace-nowrap px-6 py-4">{value?.data?.qte}</td>
                                  <td className="whitespace-nowrap px-6 py-4">{USDollar.format(value?.data?.pu)}</td>
                                  <td className="whitespace-nowrap px-6 py-4">{USDollar.format(value?.data?.pt)}</td>
                                  <td className="whitespace-nowrap px-6 py-4">{value?.data?.fournisseur}</td>
                                  <td onClick={()=>settingsinputs(value?.data?.libelle,value?.data?.qte,value?.data?.pu,value?.data?.fournisseur,value?.id)} className="whitespace-nowrap px-6 py-4">
                                    <p  className='bg-green-300 p-2 cursor-pointer rounded-md hover:font-bold hover:text-xl'>UPDATE</p>
                                  </td>
                                  <td onClick={()=>deleteitem(value?.id)} className="whitespace-nowrap px-6 py-4">
                                    <p className='bg-red-300 p-2 cursor-pointer rounded-md hover:font-bold hover:text-xl' >DELETE</p>
                                  </td>
                                </tr>
                            ))}
                            
                            
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