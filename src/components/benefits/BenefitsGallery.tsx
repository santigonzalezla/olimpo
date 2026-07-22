import { useState } from 'react';

const STRIP = 44;

const items = [
    {
        img: 'https://www.figma.com/api/mcp/asset/f38a76bc-6efe-47ed-b668-d9a73edc0005',
        label: 'Lavandería',
    },
    {
        img: 'https://www.figma.com/api/mcp/asset/5238fd81-5914-4c27-a40a-13906d30d439',
        label: 'Coworking',
    },
    {
        img: 'https://www.figma.com/api/mcp/asset/43d0417d-f38e-4b37-b491-2ec41904acc6',
        label: 'Zona infantil',
    },
    {
        img: 'https://www.figma.com/api/mcp/asset/20833829-4abd-4fd1-995f-3da656976ab5',
        label: 'Sala de juntas',
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
