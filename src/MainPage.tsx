import * as React from 'react';
import messages from "./Constant/messages";
import './Styles/css/MainPage.css'
import {listPreset} from "./listPreset";
import ReactGA from 'react-ga';
import { useEffect } from 'react';

type Props = {

};
export const MainPage = (props: Props) => {
    const TRACKING_ID = process.env.REACT_APP_GOOGLE_ANALYTICS_TRACKING_ID ?? ''

    useEffect(() => {
        ReactGA.initialize(TRACKING_ID);
        ReactGA.set({page: window.location.pathname});
        ReactGA.pageview(window.location.pathname + window.location.search);
    }, []);

    useEffect(() => {
        const script = document.createElement('script')
        script.src = 'https://developers.kakao.com/sdk/js/kakao.js'
        script.async = true

        document.body.appendChild(script)

        if(!window?.Kakao?.isInitialized()) window?.Kakao?.init?.(process.env.REACT_APP_KAKAO)
        console.log(process.env.REACT_APP_KAKAO)
        return () => {
            document.body.removeChild(script)
        }
    }, [])

    const shareKakao = () => {
        window?.Kakao?.Link?.sendDefault({
            objectType: 'feed',
            content: {
                title: '나의 DrinkIt은 무엇일까?',
                description: '당신과 잘 어울리는 공간과 술을 알아보세요!',
                imageUrl: './Images/drinkItHeader.png',
                link:{
                    webUrl: 'https://luxury-madeleine-944cc7.netlify.app',
                }
            },
            buttons: [
                {
                    title: '알아보러가자!',
                    link: {
                        webUrl: 'https://luxury-madeleine-944cc7.netlify.app',
                    }
                }
            ]
        })
    }



    return (
        <div className='main_page'>
            <img className="drink_it_image" alt='drink_it' src={require(`./Images/drinkItHeader.png`)} />
            <div className="page_title_container">
                <div className="title">{messages.mainTitle}</div>
                <div className="content">{messages.explainMessages}</div>
                <a className="subscribe" href={`https://page.stibee.com/subscriptions/148567`}>{messages.subscribeMessages}</a>
            </div>
            {listPreset?.map(arc => (
                <div className="arc_data" key={arc.id}>
                    <a href={arc.link}>
                        <img className="arc_image" alt='arc_img' src={require(`./Images/${arc.image}`)} />
                        <div className="arc_name">{arc.name}</div>
                        <div className="arc_date">{arc.date}</div>
                    </a>
                </div>
            ))}
            <button className='kakao_share_button' id='kakao-link-btn' onClick={shareKakao}>{'카카오톡으로 공유하기' }</button>
        </div>
    );
};
