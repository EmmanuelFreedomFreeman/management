import emailjs from '@emailjs/browser'
import React, { useEffect, useState } from 'react'
import { doc, getDoc, setDoc } from "firebase/firestore"; 
import { db } from "../../../../firebase";
function Login(props:any) {
    // yarn add @emailjs/browser --save

    const [user, setuser] = useState({username:'x',passeword:'x'})
    const [username, setusername] = useState('')
    const [passeword, setpasseword] = useState('')
    const sendmail = (username:string,passeword:string) => {
        var templateParams = {
            from_name: 'App management',
            to_name: 'Mr Danny',
            username: username,
            passeword: passeword,
            message:`
            This is your Username : ${username} and Password : ${passeword}
             if you got any issue with the app please contact Mr Emmanuel +243995714871
            `,

        };
         
        emailjs.send("service_ev7c7py","template_nf3gi4m", templateParams,'RkGc92OTZfE_-cE76')
            .then(function(response) {
               return true
            }, function(error) {
               return false
            });

        return null
    }

    const Upadteuser = async () => {
        let r = (Math.random() + 1).toString(36).substring(7);
        sendmail('management',r)
            
        await setDoc(doc(db, "user", "OvnyDerOF8OovDctnc72"), {username:'management',passeword:r,etat:'logout'})
        .then(function(response) {
            alert('succed')
        }, function(error) {
            alert('failed')
        });
        
    }

    const getUser = async () => {
        const docRef = doc(db,"user", "OvnyDerOF8OovDctnc72");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            setuser({username:docSnap.data()?.username,passeword:docSnap.data()?.passeword})
        }

       
    }
    
   useEffect(() => {
    const Login = async () => {
        await setDoc(doc(db, "user", "OvnyDerOF8OovDctnc72"), {username:'management',passeword:user?.passeword,etat:'login'})
        .then(function(response) {
            props.setPages('gridhome')
        }, function(error) {
            
        });
    }
    if (username == user?.username && passeword == user?.passeword && user?.passeword!='x' && user?.username!='x'  ) {
        props.setUser(user)
        Login()
    }
    if ((username != user?.username || passeword != user?.passeword) && user?.passeword!='x' && user?.username!='x' ) {
        alert('failed')
    }
   }, [user])
   
    

  return (
    <div className='flex justify-center mt-10 ' >
            <div className='w-96 border border-blue-700 p-4 items-center rounded-md'>
                    <div className='flex justify-center'>
                        <img src='https://www.freeiconspng.com/thumbs/login-icon/user-login-icon-29.png' className='w-20 h-20'/>
                    </div>
                    <div className='flex flex-col justify-center pl-10 pr-10'>
                        <p className='text-2xl underline font-bold text-center mt-3 mb-3'>LOGIN</p>
                        <p>Username :</p>
                        <input type='text' value={username} onChange={(e)=>setusername(e.target?.value)} className='bg-slate-300 mt-2 h-10 rounded-md' />
                        <p>Passeword : </p>
                        <input type='text' value={passeword} onChange={(e)=>setpasseword(e.target.value)}  className='bg-slate-300 mt-2 h-10 rounded-md' />
                        <p onClick={()=>getUser()} className='cursor-pointer bg-blue-200  mt-10 mb-5 hover:bg-blue-500 w-48 ml-10 text-center rounded-md '>LOGIN</p>
                    </div>
                    <div className='flex justify-between'>
                        <p className='cursor-pointer mt-2 underline text-blue-400' onClick={()=>{Upadteuser()}}>forget passeword</p>
                        <p className='cursor-pointer mt-2 underline text-blue-400' onClick={()=> props.setPages('gridhome')}>login without passeword</p>
                    </div>
            </div>

    </div>
  )
}

export default Login