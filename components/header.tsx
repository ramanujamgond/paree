"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useRef, useState } from "react";
import { NAV } from "@/content/site";
import { LOGO } from "@/lib/config";
import { OrderTrigger, useDialog } from "@/components/order";
export function Header({ hasLogo }: { hasLogo: boolean }) { const path = usePathname(); const [menu, setMenu] = useState(false); const ref = useRef<HTMLElement>(null); const close = useCallback(() => setMenu(false), []); useDialog(menu, close, ref); return <header className="site-header"><div className="header-inner"><Link href="/" className="wordmark" aria-label="Pyaree home">{hasLogo ? <Image src={LOGO.src} alt={LOGO.alt} width={LOGO.width} height={LOGO.height} className="logo-mark" sizes="72px" preload/> : <>pyaree<span>WOODPRESSED OILS</span></>}</Link><nav className="desktop-nav" aria-label="Main navigation">{NAV.map(item => <Link key={item.href} href={item.href} aria-current={path === item.href ? "page" : undefined}>{item.label}</Link>)}</nav><div className="header-actions"><OrderTrigger/><button className="menu-button" aria-label="Open navigation" aria-haspopup="dialog" onClick={() => setMenu(true)}>☰</button></div></div>{menu && <div className="dialog-layer"><button className="scrim" aria-label="Close navigation" onClick={close}/><nav ref={ref} className="mobile-nav" role="dialog" aria-modal="true" aria-label="Navigation"><button className="icon-button" aria-label="Close navigation" onClick={close}>×</button>{[...NAV, { href: "/faq", label: "Questions" }, { href: "/contact", label: "Contact" }].map(item => <Link key={item.href} href={item.href} onClick={close}>{item.label}<span>↗</span></Link>)}</nav></div>}</header>; }
