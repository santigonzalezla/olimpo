import {useState, useEffect, useRef} from 'react';
import {createPortal} from 'react-dom';

import aptVista3d from '../../../assets/images/apartment/VISTA 3D APARTAMENTO 3 HABITACIONES.png';
import render1 from '../../../assets/images/apartment/aptplanta2.png';
import hab1 from '../../../assets/images/apartment/apthab1.png';
import hab2 from '../../../assets/images/apartment/apthab2.png';
import hab3 from '../../../assets/images/apartment/apthab3.png';
import sala from '../../../assets/images/apartment/aptsala.png';
import studioVista3d from '../../../assets/images/studio/VISTA 3D APARTAESTUDIO.png';
import studio1 from '../../../assets/images/studio/VISTA APARTAESTUDIO 1.png';
import studio2 from '../../../assets/images/studio/VISTA APARTAESTUDIO 2.png';
import studio3 from '../../../assets/images/studio/VISTA APARTAESTUDIO 3.png';
import studio4 from '../../../assets/images/studio/VISTA APARTAESTUDIO 4.png';
import studio5 from '../../../assets/images/studio/VISTA APARTAESTUDIO 5.png';
import studio6 from '../../../assets/images/studio/VISTA APARTAESTUDIO 6.png';
import bedIcon from '../../../assets/svg/bed.svg?url';
import bathIcon from '../../../assets/svg/bath.svg?url';
import s from './PlansModal.module.css';

interface UnitData
{
    name: string;
    beds: number;
    baths: number;
    sqm: number;
    floorPlan: string;
    images: string[];
}

const unitsData: Record<string, UnitData> = {
    'Apartaestudio': {
        name: 'Apartaestudio',
        beds: 1,
        baths: 1,
        sqm: 23.6,
        floorPlan: studioVista3d.src,
        images: [studio1.src, studio2.src, studio3.src, studio4.src, studio5.src, studio6.src]
    },
    '3 Alcobas': {
        name: '3 Alcobas',
        beds: 3,
        baths: 2,
        sqm: 64.26,
        floorPlan: aptVista3d.src,
        images: [render1.src, hab1.src, hab2.src, hab3.src, sala.src]
    }
};

export default function PlansModal()
{
    const [unit, setUnit] = useState<UnitData | null>(null);
    const [activeImg, setActiveImg] = useState(0);
    const [mounted, setMounted] = useState(false);
    const [paused, setPaused] = useState(false);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    useEffect(() =>
    {
        setMounted(true);
        const handler = (e: Event) =>
        {
            const {unitName} = (e as CustomEvent<{ unitName: string }>).detail;
            const data = unitsData[unitName];
            if (data) {
                setUnit(data);
                setActiveImg(0);
                setPaused(false);
                document.body.style.overflow = 'hidden';
            }
        };
        window.addEventListener('openPlansModal', handler);
        return () => window.removeEventListener('openPlansModal', handler);
    }, []);

    useEffect(() =>
    {
        if (!unit || paused) {
            if (intervalRef.current) clearInterval(intervalRef.current);
            return;
        }
        intervalRef.current = setInterval(() =>
        {
            setActiveImg(prev => (prev + 1) % unit.images.length);
        }, 3500);
        return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
    }, [unit, paused]);

    const close = () =>
    {
        setUnit(null);
        if (intervalRef.current) clearInterval(intervalRef.current);
        document.body.style.overflow = '';
    };

    const prev = (e: React.MouseEvent) =>
    {
        e.stopPropagation();
        if (!unit) return;
        setActiveImg(i => (i - 1 + unit.images.length) % unit.images.length);
    };

    const next = (e: React.MouseEvent) =>
    {
        e.stopPropagation();
        if (!unit) return;
        setActiveImg(i => (i + 1) % unit.images.length);
    };

    if (!mounted || !unit) return null;

    return createPortal(
        <div className={s.overlay} onClick={close}>
            <div className={s.frame} onClick={e => e.stopPropagation()}>
                <button className={s.closeBtn} onClick={close}>✕</button>

                <div className={s.card}>
                    {/* Col 1 — Title */}
                    <div className={s.titleCol}>
                        <p className={s.title}>{unit.name}</p>
                    </div>

                    {/* Col 2 — Blueprint */}
                    <div className={s.blueprintCol}>
                        <img src={unit.floorPlan} alt="Planta" className={s.blueprint}/>
                    </div>

                    {/* Col 3 — Carousel */}
                    <div
                        className={s.carousel}
                        onMouseEnter={() => setPaused(true)}
                        onMouseLeave={() => setPaused(false)}
                    >
                        <div className={s.mainWrap}>
                            <img
                                key={activeImg}
                                src={unit.images[activeImg]}
                                alt="Vista principal"
                                className={s.mainImg}
                            />
                            <button className={s.arrowLeft} onClick={prev}>‹</button>
                            <button className={s.arrowRight} onClick={next}>›</button>
                        </div>

                        <div className={s.thumbRow}>
                            {unit.images.map((img, i) => (
                                <img
                                    key={i}
                                    src={img}
                                    alt={`Vista ${i + 1}`}
                                    onClick={() => setActiveImg(i)}
                                    className={`${s.thumb} ${activeImg === i ? s.thumbActive : ''}`}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Col 4 — Specs */}
                    <div className={s.specsCol}>
                        <div className={s.specItem}>
                            <p className={s.specNum}>{unit.beds}</p>
                            <img src={bedIcon} alt="" className={s.specIcon}/>
                        </div>
                        <div className={s.specItem}>
                            <p className={s.specNum}>{unit.baths}</p>
                            <img src={bathIcon} alt="" className={s.specIcon}/>
                        </div>
                        <div className={s.specM2}>
                            <p className={s.specNum}>{unit.sqm}</p>
                            <p className={s.specUnit}>m2</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
}
