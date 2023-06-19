import React, { useEffect, useState } from 'react'

function Gridhome(props:any) {
    const [totale, settotale] = useState(0)
    const [items, setitems] = useState([])
    const summary = (id:string) =>{
        let USDollar = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        });
        let temp:any = []
        props?.dataitems.map((value:any,index:number)=>{
            (value?.data?.idprojet == id )? temp.push({id:value?.id,data:value}):''
          })
      
          let t = 0
          temp.map((value:any,index:number)=>{
            t = t + parseFloat(value?.data?.data?.pt) 
            
          })

        return USDollar.format(t)

    }

    useEffect(() => {
        let temp:any = []
        
        props?.data.map((val:any,ind:number)=>{
            
            props?.dataitems.map((value:any,index:number)=>{
                (value?.data?.idprojet == val?.id )? temp.push({nomduprojet:val?.data?.nomduprojet,data:value}):''
            })
          })
          setitems(temp)
        
    }, [])
    

  return (
    <div className='flex flex-wrap ml-4 mt-3'>
        {props?.data.map((value:any,index:number)=>(
            <div className={value?.data?.nomduprojet?'ml-4':'hidden'} key={index}>
                <div className='text-center p-3 bg-slate-200 rounded-md '>
                    <p className='font-bold underline mb-2'>{value?.data?.nomduprojet?.toUpperCase()}</p>
                    <img className='w-48 rounded-md shadow-md' src='https://innoblog.fr/wp-content/uploads/2021/12/Figure-Blog-1-1.jpg' />
                    <p className='font-bold mt-1 text-center'>TOTALE : {summary(value?.id)}</p>
                </div>
            </div>
        ))}
    </div>
  )
}

export default Gridhome