
import React, { useState } from 'react';

import styles from './Farewell.module.scss';

export interface FarewellProps {
    isStandalone: boolean;
}

export default function Farewell({ isStandalone }: FarewellProps) {

    const [test, setTest] = useState("");
    
    return (
        <div className={styles.farewell} >
            <h1>I am a Microfrontend. Goodbye!</h1>
            <h2>Framework: NextJs create-next-app</h2>
            <div>Standalone: {String(isStandalone)}</div>
        </div>
    );
}