import {useState, useEffect} from 'react';
import {createPortal} from 'react-dom';

const links = [
    {href: '#proyecto', label: 'Proyecto'},
    {href: '#planos', label: 'Planos'},
    {href: '#precios', label: 'Precios'},
    {href: '#ubicacion', label: 'Ubicación'}
];

export default function MobileSidebar()
{
    const [isOpen, setIsOpen] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() =>
    {
        setMounted(true);
    }, []);

    const open = () =>
    {
        setIsOpen(true);
        document.body.style.overflow = 'hidden';
    };

    const close = () =>
    {
        setIsOpen(false);
        document.body.style.overflow = '';
    };

    const portal = mounted
        ? createPortal(
            <>
                <div
                    onClick={close}
                    style={{
                        position: 'fixed',
                        inset: 0,
                        background: 'rgba(0,0,0,0.55)',
                        opacity: isOpen ? 1 : 0,
                        pointerEvents: isOpen ? 'auto' : 'none',
                        transition: 'opacity 0.3s ease',
                        zIndex: 9998
                    }}
                />
                <aside
                    style={{
                        position: 'fixed',
                        top: 0,
                        right: 0,
                        width: '280px',
                        height: '100%',
                        background: '#131B23',
                        color: '#FFF',
                        display: 'flex',
                        flexDirection: 'column',
                        transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
                        transition: 'transform 0.3s ease',
                        zIndex: 9999
                    }}
                >
                    <div style={{display: 'flex', justifyContent: 'flex-end', padding: '24px 24px 8px'}}>
                        <button
                            onClick={close}
                            aria-label="Cerrar menú"
                            style={{
                                background: 'none',
                                border: 'none',
                                color: '#FFF',
                                fontSize: '28px',
                                cursor: 'pointer',
                                padding: '4px 8px',
                                lineHeight: 1
                            }}
                        >
                            ✕
                        </button>
                    </div>
                    <nav style={{display: 'flex', flexDirection: 'column', padding: '24px 32px'}}>
                        {links.map(({href, label}, i) => (
                            <a
                                key={href}
                                href={href}
                                onClick={close}
                                style={{
                                    color: '#FFF',
                                    fontFamily: "'Satoshi', sans-serif",
                                    fontSize: '20px',
                                    fontWeight: 200,
                                    padding: '16px 0',
                                    borderBottom: i < links.length - 1 ? '1px solid rgba(255,255,255,0.1)' : 'none',
                                    textDecoration: 'none',
                                    display: 'block'
                                }}
                            >
                                {label}
                            </a>
                        ))}
                    </nav>
                </aside>
            </>,
            document.body
        )
        : null;

    return (
        <>
            <button
                onClick={open}
                aria-label="Abrir menú"
                style={{
                    background: 'none',
                    border: 'none',
                    color: '#FFF',
                    cursor: 'pointer',
                    padding: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24">
                    <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                          d="M4 5h16M4 12h16M4 19h16"/>
                </svg>
            </button>

            {portal}
        </>
    );
}
