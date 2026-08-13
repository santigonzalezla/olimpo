import { useState } from 'react';
import lobbyImg from '../../assets/images/benefits/lobby.png';
import zonaSocialImg from '../../assets/images/benefits/zonasocial.png';
import zonaInfantilImg from '../../assets/images/benefits/zonadejuegos.png';
import parqueaderoImg from '../../assets/images/benefits/parqueadero.png';

const STRIP = 44;

const items = [
    {
        img: lobbyImg.src,
        label: 'Lobby',
    },
    {
        img: zonaSocialImg.src,
        label: 'Zona Social',
    },
    {
        img: zonaInfantilImg.src,
        label: 'Zona infantil',
    },
    {
        img: parqueaderoImg.src,
        label: 'Parqueadero',
    },
];

export default function BenefitsGallery() {
    const [active, setActive] = useState(0);

    return (
        <div style={{
            display: 'flex',
            width: '100%',
            height: '100%',
            gap: '8px',
        }}>
            {items.map((item, i) => {
                const isActive = i === active;
                return (
                    <div
                        key={i}
                        onClick={() => setActive(i)}
                        style={{
                            flex: isActive ? '1 1 0' : `0 0 ${STRIP}px`,
                            transition: 'flex 0.45s cubic-bezier(0.4, 0, 0.2, 1)',
                            overflow: 'hidden',
                            position: 'relative',
                            cursor: 'pointer',
                        }}
                    >
                        <img
                            src={item.img}
                            alt={item.label}
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                display: 'block',
                            }}
                        />
                        {!isActive && (
                            <div style={{
                                position: 'absolute',
                                inset: 0,
                                background: 'rgba(0,0,0,0.45)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                                <span style={{
                                    color: '#fff',
                                    fontSize: '11px',
                                    fontWeight: 600,
                                    fontFamily: 'Satoshi, sans-serif',
                                    writingMode: 'vertical-rl',
                                    transform: 'rotate(180deg)',
                                    whiteSpace: 'nowrap',
                                }}>
                                    {item.label}
                                </span>
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}
