import React, { Dispatch, SetStateAction, useState } from 'react'
import { doc,addDoc,collection,deleteDoc,updateDoc } from "firebase/firestore"; 
import { db } from "../../../../firebase";

interface type {
  data: any[];
  setdata: Dispatch<SetStateAction<any[]>>;
}

function Projet(props: type) {

    const [projetname, setProjetname] = useState('')
    const addprojet = async () => {
        
        try {
          await addDoc(collection(db, "management"), {
            nomduprojet: projetname,
          });
          setProjetname('')
          alert('inserted')
        } catch (error) {
          console.log(error)
        }finally {
            
        }
       
    }

    const deleteprojet = async (id:any) => {
      try {
        await deleteDoc(doc(db, "management", id));
        alert('le projet a ete suprimer')
      } catch (error) {
        
      }
    }

    const updateprojet = async (id:any) => {
      try {
        const projetRef = doc(db, "management", id);

        // Set the "capital" field of the city 'DC'
        await updateDoc(projetRef, {
          nomduprojet: projetname,
        });
        setProjetname('')
        alert('le projet a ete mise a jour')
      } catch (error) {
        
      }
    }

    

  return (
    <div className='m-5'>
        <p className='underline text-2xl font-bold text-center'>PROJECT</p>

        <div className='flex justify-between'>
            <div className=' bg-slate-400 p-4 rounded-md mt-7'>
                <p className='underline text-2xl font-bold text-center mb-5'>AJOUT DU PROJET</p>
                <div className='flex'>
                  <p>Nom du projet :</p>
                  <input type='text' value={projetname} onChange={(e)=> setProjetname(e.target.value)} placeholder='Nom du projet' className='border-1 bg-gray-100 ml-1 h-7 rounded-md' />
                </div>

                <button onClick={()=>addprojet()} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mt-5">
                  AJOUT PROJET
                </button>

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
                              <th scope="col" className="px-6 py-4">UPDATE</th>
                              <th scope="col" className="px-6 py-4">DELETE</th>
                            </tr>
                          </thead>
                          <tbody>
                            {props?.data.map((value,index)=>(
                              <tr className={value?.data?.nomduprojet?"border-b dark:border-neutral-500":'hidden'} key={index}>
                                <td className="whitespace-nowrap px-6 py-4 font-medium">{index}</td>
                                <td className="whitespace-nowrap px-6 py-4">{value?.data?.nomduprojet}</td>
                                <td className="whitespace-nowrap px-6 py-4">
                                  <p onClick={()=>updateprojet(value?.id)} className='bg-green-300 p-2 cursor-pointer rounded-md hover:font-bold hover:text-xl'>UPDATE</p>
                                </td>
                                <td onClick={()=>deleteprojet(value?.id)} className="whitespace-nowrap px-6 py-4">
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

export default Projet