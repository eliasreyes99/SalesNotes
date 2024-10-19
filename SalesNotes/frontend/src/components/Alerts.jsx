import PropTypes from 'prop-types';
import "../Styles/Alerts.css";
import { useEffect, useState } from 'react';

export default function Alerts({ description, status, resetAlert }) {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        setIsVisible(true);
        const timer = setTimeout(() => {
            setIsVisible(false);
            resetAlert();
        }, 2000);
        return () => {
            clearTimeout(timer);
        };
    }, [description, status, resetAlert]);

    let Status = '';

    if (status === 'alert-success') {
        Status = 'alert-success';
    } else {
        Status = 'alert-error';
    }

    return (
        isVisible && (
            <div className={`alert ${Status}`}>{description}</div>
        )
    );
}

Alerts.propTypes = {
    description: PropTypes.string.isRequired,
    status: PropTypes.oneOf(['alert-success', 'alert-error']).isRequired,
    resetAlert: PropTypes.func.isRequired,
};
