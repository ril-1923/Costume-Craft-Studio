export interface Product{id:number;name:string;category:string;description:string;price:number;originalPrice?:number;image:string;colors:string[];sizes:string[];fabric:string;inStock:boolean;featured:boolean}
export const CATEGORIES=['Bridal Couture','Traditional Wear','Western Wear','Evening & Party Wear','Festive Collections','Stage & Performance']
const FABRICS=['Silk','Satin','Velvet','Chiffon','Georgette','Organza','Cotton','Linen']
const NAMES=['Rosewater Lehenga','Zari Banarasi Saree','Ivory Wrap Dress','Midnight Velvet Gown','Diwali Anarkali','Kathak Stage Ensemble']
const ADJ=['Heritage','Aurora','Noor','Celeste']
export const products:Product[]=Array.from({length:24},(_,i)=>{const c=i%6;const price=4500+((i*1370)%21000);return{id:i+1,name:`${ADJ[Math.floor(i/6)]} ${NAMES[c]}`,category:CATEGORIES[c],description:'Hand-finished with careful attention to drape, fit and detail. Made to order in our studio.',price,originalPrice:i%3===0?Math.round(price*1.2/100)*100:undefined,image:`https://picsum.photos/seed/costume${i+1}/600/800`,colors:['Maroon','Ivory','Emerald','Champagne'].slice(0,2+(i%3)),sizes:['XS','S','M','L','XL'],fabric:FABRICS[i%8],inStock:i%7!==6,featured:i%3===0}})
export const inr=(n:number)=>'₹'+Math.round(n).toLocaleString('en-IN')
export const COUPONS:Record<string,{label:string;min:number;calc:(s:number)=>number}>={WELCOME10:{label:'10% off any order',min:0,calc:s=>s*.1},FESTIVE500:{label:'₹500 off orders above ₹5,000',min:5000,calc:()=>500},SILK15:{label:'15% off orders above ₹10,000',min:10000,calc:s=>s*.15}}
