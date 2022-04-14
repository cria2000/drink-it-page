// @flow 
import * as React from 'react';
import { useEffect, useState } from 'react';
import {useLocation} from 'react-router-dom';
import ReactGA from 'react-ga';

type Props = {
    
};
export const UseGaPageTracking = (props: Props) => {
    const TRACKING_ID = process.env.REACT_APP_GOOGLE_ANALYTICS_TRACKING_ID ?? ''
    
    // const location = useLocation();
    const [initialized, setInitialized] = useState(false);

    /* localhost는 인지 못하게  */
    useEffect(() => {
        if (!window.location.href.includes('localhost')) {
            ReactGA.initialize(TRACKING_ID);
        }
        setInitialized(true);
    }, []);

    // useEffect(() => {
    //     if (initialized) {
    //         ReactGA.pageview(location.pathname + location.search);
    //     }
    // }, [initialized, location]);

    // 개발용
    useEffect(() => {
        ReactGA.initialize(TRACKING_ID);
        // ReactGA.pageview(location.pathname + location.search);
    }, []);

    return (
        <div>

        </div>
    );
};