import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {title:"Ammar Tariq & Musfirah Siraj — Blossom & Oud",description:"Baraat: Saturday, 14 November 2026. Walima: Sunday, 15 November 2026. Bahawalpur, Pakistan.",icons:{icon:"/pakistani/pk-attire.png"},openGraph:{title:"Ammar Tariq & Musfirah Siraj — You are invited",images:["/pakistani/pk-couple.png"]}};
export default function Layout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>;}
