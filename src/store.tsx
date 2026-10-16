import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from 'react'
export interface Line{key:string;name:string;price:number;qty:number;image?:string;meta:string}
export interface SavedDesign{id:string;name:string;garment:string;color:string;fabric:string;embroidery:string;pattern:string}
function load<T>(k:string,d:T):T{try{const v=localStorage.getItem(k);return v?JSON.parse(v) as T:d}catch{return d}}
function useLS<T>(k:string,d:T){const [v,s]=useState<T>(()=>load(k,d));useEffect(()=>{try{localStorage.setItem(k,JSON.stringify(v))}catch{/* storage unavailable */}},[k,v]);return [v,s] as const}
interface Ctx{cart:Line[];wish:number[];designs:SavedDesign[];toast:string;notify:(m:string)=>void;addLine:(l:Line)=>void;setQty:(k:string,q:number)=>void;remove:(k:string)=>void;toggleWish:(id:number)=>void;setDesigns:(d:SavedDesign[])=>void;clear:()=>void}
const C=createContext<Ctx|null>(null)
export const useStore=()=>{const c=useContext(C);if(!c)throw new Error('no store');return c}
export function StoreProvider({children}:{children:ReactNode}){
const [cart,setCart]=useLS<Line[]>('cc_cart',[]);const [wish,setWish]=useLS<number[]>('cc_wish',[]);const [designs,setDesigns]=useLS<SavedDesign[]>('cc_designs',[]);const [toast,setToast]=useState('')
const notify=useCallback((m:string)=>{setToast(m);setTimeout(()=>setToast(''),2200)},[])
const addLine=(l:Line)=>{setCart(c=>c.some(x=>x.key===l.key)?c.map(x=>x.key===l.key?{...x,qty:x.qty+l.qty}:x):[...c,l]);notify('Added to bag')}
const setQty=(k:string,q:number)=>setCart(c=>c.map(x=>x.key===k?{...x,qty:Math.min(10,Math.max(1,q||1))}:x))
const remove=(k:string)=>setCart(c=>c.filter(x=>x.key!==k))
const toggleWish=(id:number)=>{setWish(w=>w.includes(id)?w.filter(x=>x!==id):[...w,id])}
return <C.Provider value={{cart,wish,designs,toast,notify,addLine,setQty,remove,toggleWish,setDesigns,clear:()=>setCart([])}}>{children}</C.Provider>}
