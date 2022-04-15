import * as React from 'react';
import messages from "./Constant/messages";
import './Styles/css/MainPage.css'
import {listPreset} from "./listPreset";
import ReactGA from 'react-ga';
import { useEffect, useState } from 'react';

type Props = {

};
export const MainPage = (props: Props) => {
    const [kakaoInit, setKakaoInit] = useState<boolean>(false)
    const TRACKING_ID = process.env.REACT_APP_GOOGLE_ANALYTICS_TRACKING_ID ?? ''

    useEffect(() => {
        const script = document.createElement('script')
        script.src = 'https://developers.kakao.com/sdk/js/kakao.js'
        script.async = true

        document.body.appendChild(script)
        if(!window?.Kakao?.isInitialized()) {
            window?.Kakao?.init?.(process.env.REACT_APP_KAKAO)

            setKakaoInit(!kakaoInit)
        }

        return () => {
            document.body.removeChild(script)
        }
    }, [kakaoInit])

    useEffect(() => {
        const tagScript = document.createElement('script')
        tagScript.src= 'https://www.googletagmanager.com/gtm.js?id='
        tagScript.async = true
        tagScript.innerHTML = `
            function(w,d,s,l,i)
            {
                w[l]=w[l]||[];
                w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});
                var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
                j.async=true;
                j.src= 'https://www.googletagmanager.com/gtm.js?id='+i+dl;
                f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-5GC2QZP');`

        document.body.appendChild(tagScript)
        return () => {
            document.body.removeChild(tagScript)
        }
    }, [])

    useEffect(() => {
        ReactGA.initialize(TRACKING_ID);
        ReactGA.set({page: window.location.pathname});
        ReactGA.pageview(window.location.pathname + window.location.search);
    }, []);

    const shareKakao = () => {
        window?.Kakao?.Link?.sendDefault({
            objectType: 'feed',

            content: {
                title: '나의 DrinkIt은 무엇일까?',
                description: '🥂당신과 잘 어울리는 공간과 술을 알아보세요🥂',
                imageUrl: './Images/drinkItHeader.png',
                link:{
                    webUrl: 'https://luxury-madeleine-944cc7.netlify.app',
                }
            },
            buttons: [
                {
                    title: 'DrinkIt 테스트하러가기',
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
            <button className='kakao_share_button' id='kakao-link-btn' onClick={shareKakao}><img className="kakao_icon" src={require('./Images/kakao.png')}/>{'카카오톡으로 공유하기' }</button>
        </div>
    );
};
