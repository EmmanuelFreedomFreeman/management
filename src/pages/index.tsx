
import { useEffect, useState } from 'react'
import Header from './api/components/Header'
import Projet from './api/components/Projet'
import Listeprojets from './api/components/Listeprojets'
import Rubrique from './api/components/Rubrique'
import Listerubrique from './api/components/Listerubrique'
import { doc, setDoc ,addDoc,collection,getDocs,onSnapshot,query, getDoc, orderBy } from "firebase/firestore"; 
import { db } from "../../firebase";
import Items from './api/components/Items'
import Gridhome from './api/components/Gridhome'
import Login from './api/components/Login'

export default function Home() {
 // gridhome
  const [pages, setPages] = useState('login')
  const [user, setUser] = useState({username:'',passeword:''})
  const [users, setUsers] = useState({username:'',passeword:'',etat:''})
  const [data, setdata] = useState<any[]>([])
  const [datarub, setdatarub] = useState<any[]>([])
  const [dataitems, setdataitems] = useState<any[]>([])

  useEffect(() => {
    const getUser = async () => {
      const docRef = doc(db,"user", "OvnyDerOF8OovDctnc72");
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
          setUsers({username:docSnap.data()?.username,passeword:docSnap.data()?.passeword,etat:docSnap.data()?.etat})
      }

     
    }
      
      const q = query(collection(db, "management"),orderBy("temp"));
      const unsubscrib = onSnapshot(q, (querySnapshot) => {
        const dat:any = []
        querySnapshot.forEach((doc) => {
            const getdata = {id:doc.id,data:doc.data()}
            dat.push(getdata)
        });
        setdata(dat)
      });

      const quer = query(collection(db, "rubriques"),orderBy("temp"));
      const unsubscri = onSnapshot(quer, (querySnapshot) => {
        const dat:any = []
        querySnapshot.forEach((doc) => {
            const getdata = {id:doc.id,data:doc.data()}
            dat.push(getdata)
        });
        setdatarub(dat)
      });

      const queryy = query(collection(db, "items"),orderBy("temp"));
      const unsubscr = onSnapshot(queryy, (querySnapshot) => {
        const dat:any = []
        querySnapshot.forEach((doc) => {
            const getdata = {id:doc.id,data:doc.data()}
            dat.push(getdata)
        });
        setdataitems(dat)
      });


  }, [])
  
  if(pages == 'login')
  return (
    <div>
        
        <Login pages={pages} setPages={setPages} user={user} setUser={setUser} />

    </div>
  )

 if(pages == 'projet')
    return (
      <div>
          <Header pages={pages} setPages={setPages}/>
          <Projet data={data} setdata={setdata} user={user} setUser={setUser} />

      </div>
    )

    if(pages == 'gridhome')
    return (
      <div>
          <Header pages={pages} setPages={setPages}/>
          <Gridhome data={data} setdata={setdata} datarub={datarub} setdatarub={setdatarub} dataitems={dataitems} setdataitems={setdataitems} />

      </div>
    )

    if(pages == 'liste projet')
      return (
        <div>
            <Header pages={pages} setPages={setPages}/>
            <Listeprojets data={data} setdata={setdata} datarub={datarub} setdatarub={setdatarub} dataitems={dataitems} setdataitems={setdataitems} />

        </div>
      )
      if(pages == 'rubrique')
        return (
          <div>
              <Header pages={pages} setPages={setPages}/>
              <Rubrique data={data} setdata={setdata} datarub={datarub} setdatarub={setdatarub} user={user} setUser={setUser} />
    
          </div>
        )
        if(pages == 'liste rubrique')
          return (
            <div>
                <Header pages={pages} setPages={setPages}/>
                <Listerubrique data={data} setdata={setdata} datarub={datarub} setdatarub={setdatarub} dataitems={dataitems} setdataitems={setdataitems} />

            </div>
          )
          if(pages == 'items')
          return (
            <div>
                <Header pages={pages} setPages={setPages}/>
                <Items data={data} setdata={setdata} datarub={datarub} setdatarub={setdatarub} dataitems={dataitems} setdataitems={setdataitems} user={user} setUser={setUser} />

            </div>
          )
}
