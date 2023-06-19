import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { doc,addDoc,collection,deleteDoc,updateDoc } from "firebase/firestore"; 
import { db } from "../../../../firebase";

function Rubrique(props:any) {
  const [rubriquename, setRubriquename] = useState('')
  const [projetname, setProjetname] = useState('')
  const [idrubrique, setidrubrique] = useState('')
  const [button, setbutton] = useState(true)
    const addrubrique = async () => {
        
        try {
          await addDoc(collection(db, "rubriques"), {
            idprojet:projetname,
            nomdurubrique: rubriquename,
          });
          setRubriquename('')
          setProjetname('')
          alert('inserted')
        } catch (error) {
          console.log(error)
        }finally {
            
        }
       
    }

    const settingInputs = (idprojet:string,rubrique:string,rubriqueid:string) => {
      setProjetname(idprojet)
      setRubriquename(rubrique)
      setidrubrique(rubriqueid)
      setbutton(false)

    }
    const deleterubrique = async (id:any) => {
      try {
        await deleteDoc(doc(db, "rubriques", id));
        alert('la rubrique a ete suprimer')
      } catch (error) {
        
      }
    }

    const updateprojet = async (id:any) => {
      try {
        const projetRef = doc(db, "rubriques", id);

        // Set the "capital" field of the city 'DC'
        await updateDoc(projetRef, {
          idprojet:projetname,
          nomdurubrique: rubriquename,
        });
        setProjetname('')
        setRubriquename('')
        setidrubrique('')
        setbutton(true)
        alert('la rubrique a ete mise a jour')
      } catch (error) {
        
      }
    }
    
    
    
  return (
    <div className='m-5'>
        <p className='underline text-2xl font-bold text-center'>RUBRIQUE</p>

        <div className='flex justify-between'>
            <div className=' bg-slate-400 p-4 rounded-md mt-7'>
                <p className='underline text-2xl font-bold text-center mb-5'>AJOUT DU RUBRIQUE</p>
                <div className='flex mb-4'>
                  <p>Projet :</p>
                  <select value={projetname} onChange={(e)=>setProjetname(e.target.value)} className="border-1 bg-gray-100 h-7 rounded-md ml-20 w-52">
                    <option value='o'>Selectionne le projet</option>
                    {props?.data.map((value:any,index:number)=>(
                        <option value={value?.id} key={index}>{value?.data?.nomduprojet}</option>
                    ))}
                    
                    
                  </select>
                </div>
                <div className='flex'>
                  <p>Nom du rubrique :</p>
                  <input value={rubriquename} onChange={(e)=>setRubriquename(e.target.value)}  type='text' placeholder='Nom du projet' className='border-1 bg-gray-100 ml-1 h-7 rounded-md' />
                </div>
                {button?(
                  <button onClick={()=>addrubrique()}  className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mt-5">
                  AJOUT RUBRIQUE
                </button>
                ):(
                  <button onClick={()=>updateprojet(idrubrique)}  className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mt-5">
                    UPDATE RUBRIQUE
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
                              <th scope="col" className="px-6 py-4">NOM DU PROJET</th>
                              <th scope="col" className="px-6 py-4">NOM DU RUBRIQUE</th>
                              <th scope="col" className="px-6 py-4">UPDATE</th>
                              <th scope="col" className="px-6 py-4">DELETE</th>
                            </tr>
                          </thead>
                          <tbody>
                            {props?.datarub?.map((value:any,index:number)=>(
                                <tr className={value?.data?.nomdurubrique?"border-b dark:border-neutral-500":'hidden'} key={index}>
                                  <td className="whitespace-nowrap px-6 py-4 font-medium">{index}</td>
                                  <td className="whitespace-nowrap px-6 py-4">{props?.data.find((el:any) => el.id == value?.data?.idprojet )?(props?.data.find((el:any) => el.id == value?.data?.idprojet ).data?.nomduprojet).toString():''}</td>
                                  <td className="whitespace-nowrap px-6 py-4">{value?.data?.nomdurubrique}</td>
                                  <td onClick={()=> settingInputs(value?.data?.idprojet,value?.data?.nomdurubrique,value?.id)} className="whitespace-nowrap px-6 py-4">
                                    <p className='bg-green-300 p-2 cursor-pointer rounded-md hover:font-bold hover:text-xl'>UPDATE</p>
                                  </td>
                                  <td onClick={()=>deleterubrique(value?.id)} className="whitespace-nowrap px-6 py-4">
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

export default Rubrique