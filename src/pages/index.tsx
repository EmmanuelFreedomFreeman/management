
import { useEffect, useState } from 'react'
import Header from './api/components/Header'
import Projet from './api/components/Projet'
import Listeprojets from './api/components/Listeprojets'
import Rubrique from './api/components/Rubrique'
import Listerubrique from './api/components/Listerubrique'
import { doc, setDoc ,addDoc,collection,getDocs,onSnapshot,query } from "firebase/firestore"; 
import { db } from "../../firebase";
import Items from './api/components/Items'
import Gridhome from './api/components/Gridhome'

export default function Home() {
 
  const [pages, setPages] = useState('gridhome')
  const [data, setdata] = useState<any[]>([])
  const [datarub, setdatarub] = useState<any[]>([])
  const [dataitems, setdataitems] = useState<any[]>([])

  useEffect(() => {
      
      const q = query(collection(db, "management"));
      const unsubscrib = onSnapshot(q, (querySnapshot) => {
        const dat:any = []
        querySnapshot.forEach((doc) => {
            const getdata = {id:doc.id,data:doc.data()}
            dat.push(getdata)
        });
        setdata(dat)
      });

      const quer = query(collection(db, "rubriques"));
      const unsubscri = onSnapshot(quer, (querySnapshot) => {
        const dat:any = []
        querySnapshot.forEach((doc) => {
            const getdata = {id:doc.id,data:doc.data()}
            dat.push(getdata)
        });
        setdatarub(dat)
      });

      const queryy = query(collection(db, "items"));
      const unsubscr = onSnapshot(queryy, (querySnapshot) => {
        const dat:any = []
        querySnapshot.forEach((doc) => {
            const getdata = {id:doc.id,data:doc.data()}
            dat.push(getdata)
        });
        setdataitems(dat)
      });


  }, [])
  


 if(pages == 'projet')
    return (
      <div>
          <Header pages={pages} setPages={setPages}/>
          <Projet data={data} setdata={setdata} />

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
              <Rubrique data={data} setdata={setdata} datarub={datarub} setdatarub={setdatarub} />
    
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
                <Items data={data} setdata={setdata} datarub={datarub} setdatarub={setdatarub} dataitems={dataitems} setdataitems={setdataitems} />

            </div>
          )
}
