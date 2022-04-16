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
        console.log(window?.Kakao?.Link)
        console.log(window?.Kakao?.isInitialized())
        return () => {
            document.body.removeChild(script)
        }
    }, [kakaoInit])

    useEffect(() => {
        const tagScript = document.createElement('script')
        tagScript.src= "https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
        tagScript.async = true
        tagScript.innerHTML = `
            function(w,d,s,l,i)
              window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'GA_MEASUREMENT_ID');`

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
                title: '술을 즐기는 이들을 위한 브랜드, Drink It',
                description: '🥂drink it이 소개해주는 다양한 술과 공간을 통해 자신만의 취향을 발견해보세요🥂',
                imageUrl: './Images/drinkItHeader.png',
                link:{
                    webUrl: 'https://luxury-madeleine-944cc7.netlify.app',
                }
            },
            buttons: [
                {
                    title: 'Empty glass, Fully relaxed.',
                    link: {
                        webUrl: 'https://luxury-madeleine-944cc7.netlify.app',
                    }
                }
            ]
        })
    }

    const handleClickSubscription = () => {
        ReactGA.event({
            category: "Event",
            action: "Press subscription Link",
            label: "Subscription",
        });
    }

    const handleClickArcLink = () => {
        ReactGA.event({
            category: "Event",
            action: "Press Arc Link",
            label: "Watch Arc",
        });
    }

    return (
        <div className='main_page'>
            <img className="drink_it_image" alt='drink_it' src={require(`./Images/drinkItHeader.png`)} />
            <div className="page_title_container">
                <div className="title">{messages.mainTitle}</div>
                <div className="content">{messages.explainMessages}</div>
                <a className="subscribe" id="subscribe" href={`https://page.stibee.com/subscriptions/148567`} onClick={handleClickSubscription}>{messages.subscribeMessages}</a>
            </div>
            {listPreset?.map(arc => (
                <div className="arc_data" key={arc.id}>
                    <a href={arc.link} id="link_to_arc" onClick={handleClickArcLink}>
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
