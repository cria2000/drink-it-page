import * as React from 'react';
import messages from "./Constant/messages";
import './Styles/css/MainPage.css'
import {listPreset} from "./listPreset";
import ReactGA from 'react-ga';

type Props = {

};
export const MainPage = (props: Props) => {
    const TRACKING_ID = process.env.REACT_APP_GOOGLE_ANALYTICS_TRACKING_ID ?? ''

    useEffect(() => {
        ReactGA.initialize(TRACKING_ID);
        ReactGA.set({page: window.location.pathname});
        ReactGA.pageview(window.location.pathname + window.location.search);
    }, []);

    return (
        <div className='main_page'>
            <img className="drink_it_image" alt='drink_it' src={require(`./Images/drinkItHeader.png`)} />
            <div className="page_title_container">
                <div className="title">{messages.mainTitle}</div>
                <div className="content">{messages.explainMessages}</div>
                <a className="subscribe" href={`https://page.stibee.com/subscriptions/148567`}>{messages.subscribeMessages}</a>
            </div>
            {listPreset?.map(arc => (
                <div className="arc_data">
                    <a href={arc.link}>
                        <img className="arc_image" alt='arc_img' src={require(`./Images/${arc.image}`)} />
                        <div className="arc_name">{arc.name}</div>
                        <div className="arc_date">{arc.date}</div>
                    </a>
                </div>
            ))}
        </div>
    );
};

function useEffect(arg0: () => void, arg1: never[]) {
    throw new Error('Function not implemented.');
}
