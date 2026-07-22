import arrowIcon from '../../../assets/svg/arrowRight.svg?url';
import styles from './PlansCta.module.css';

interface Props {
    name: string;
}

export default function PlansCta({ name }: Props) {
    const handleClick = () => {
        window.dispatchEvent(new CustomEvent('openPlansModal', { detail: { unitName: name } }));
    };

    return (
        <button className={styles.btn} onClick={handleClick}>
            Ver Planos
            <img src={arrowIcon} alt="" className={styles.icon} />
        </button>
    );
}
