import {useEffect, useRef, useState} from 'react';
import waIcon from '../../assets/svg/whatsapp.svg?url';
import s from './WhatsAppButton.module.css';

export default function WhatsAppButton()
{
    const [open, setOpen] = useState(false);
    const [form, setForm] = useState({name: '', email: '', phone: '', message: ''});
    const rootRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!open) return;

        const handleClickOutside = (e: MouseEvent) => {
            if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [open]);

    const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
        setForm(prev => ({...prev, [field]: e.target.value}));

    const send = (e: React.FormEvent) =>
    {
        e.preventDefault();
        const text = [
            `Hola, soy ${form.name}.`,
            form.email && `Email: ${form.email}`,
            form.phone && `Teléfono: ${form.phone}`,
            form.message && `Mensaje: ${form.message}`
        ].filter(Boolean).join('\n');
        window.open(`https://wa.me/573148526909?text=${encodeURIComponent(text)}`, '_blank');
        setForm({name: '', email: '', phone: '', message: ''});
        setOpen(false);
    };

    return (
        <div className={s.root} ref={rootRef}>
            {open && (
                <div className={s.popup}>
                    <div className={s.header}>
                        <img src={waIcon} alt="" className={s.headerIcon}/>
                        Contáctanos por WhatsApp
                        <button className={s.closeBtn} onClick={() => setOpen(false)}>✕</button>
                    </div>
                    <form className={s.form} onSubmit={send}>
                        <input className={s.input} type="text" placeholder="Tu nombre" value={form.name}
                               onChange={set('name')} required/>
                        <input className={s.input} type="email" placeholder="Tu email" value={form.email}
                               onChange={set('email')}/>
                        <input className={s.input} type="tel" placeholder="Tu teléfono" value={form.phone}
                               onChange={set('phone')}/>
                        <textarea className={s.textarea} placeholder="Tu mensaje..." value={form.message}
                                  onChange={set('message')} rows={3}/>
                        <button type="submit" className={s.sendBtn}>
                            <img src={waIcon} alt="" className={s.sendIcon}/>
                            Enviar por WhatsApp
                        </button>
                    </form>
                </div>
            )}

            <button className={s.fab} onClick={() => setOpen(o => !o)} aria-label="WhatsApp">
                <img src={waIcon} alt="WhatsApp" className={s.fabIcon}/>
            </button>
        </div>
    );
}
