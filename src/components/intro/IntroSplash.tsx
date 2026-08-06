import {useEffect, useRef, useState} from 'react';
import introVideo from '../../assets/images/videoconstruccion.mp4';
import s from './IntroSplash.module.css';

const STORAGE_KEY = 'olimpo_intro_seen';
const PLAYBACK_RATE = 4;

export default function IntroSplash()
{
    const [visible, setVisible] = useState(false);
    const [closing, setClosing] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (!localStorage.getItem(STORAGE_KEY)) setVisible(true);
    }, []);

    const close = () =>
    {
        localStorage.setItem(STORAGE_KEY, '1');
        setClosing(true);
        window.dispatchEvent(new CustomEvent('olimpo:introDone'));
        setTimeout(() => setVisible(false), 800);
    };

    if (!visible) return null;

    return (
        <div className={`${s.splash} ${closing ? s.closing : ''}`}>
            <video
                ref={videoRef}
                className={s.video}
                src={introVideo}
                autoPlay
                muted
                playsInline
                onLoadedMetadata={() => {
                    if (videoRef.current) videoRef.current.playbackRate = PLAYBACK_RATE;
                }}
                onEnded={close}
                onError={close}
            />
            <button className={s.skipBtn} onClick={close}>
                Saltar ✕
            </button>
        </div>
    );
}
