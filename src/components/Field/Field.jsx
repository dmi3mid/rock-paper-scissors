import React from 'react';
// import axios from 'axios';

import useGame from '../../hooks/useGame';
import useTelegram from '../../hooks/useTelegram';

import Button from '../UI/Button/Button';
// import SendDataButton from '../UI/Button/SendDataButton';

import classes from './Field.module.css';

export default function Field() {
    const { botCount,
            playerCount,
            bot,
            player,
            onMove } = useGame();
    const {tg, user, WebAppMainButton} = useTelegram();
    
    // const onSendData = async () => {
    //     const sentData = await axios.get(`https://api.telegram.org/bot${}/sendMessage?chat_id=${chat?.id}&text=Привіт%2C+це+повідомлення+з+бота%21`)
    // }

    // useEffect(() => {
    //     WebAppMainButton.setText(`Your count: ${playerCount}`);
    //     WebAppMainButton.show();
    // }, [WebAppMainButton, playerCount]);
    // const onSendData = useCallback(() => {
    //     tg.sendData(JSON.stringify({playerCount, user}));
    // }, [tg, user, playerCount]);
    const onSendData = () => {
        tg.sendData(JSON.stringify({playerCount, user}));
    };
    WebAppMainButton.setText(`Your count: ${playerCount}`);
    WebAppMainButton.show();
    WebAppMainButton.onClick(onSendData);
    // useEffect(() => {
    //     tg.onEvent('mainButtonClicked', onSendData);
    //     return () => {
    //         tg.offEvent('mainButtonClicked', onSendData);
    //     }
    // }, [tg]);

    return (
        <div className={classes.wrap}>
            <h1 className={classes.title}>Paper Scissors Stone {user?.username}</h1>
            <div className={classes.playfield}>
                <div className={classes.player}>
                    <p className={classes.counter}>{botCount}</p>
                    <img className={classes.img} src={require(`../../images/${bot}.webp`)} alt="" />
                </div>
                <div className={classes.player}>
                    <p className={classes.counter}>{playerCount}</p>
                    <img className={classes.img} src={require(`../../images/${player}.webp`)} alt="" />
                </div>
            </div>
            <div className={classes.interaction}>
                <Button onMove={onMove} playerMove="Paper">
                    <img className={classes.buttonImg} src={require("../../images/Paper.webp")} alt="" />
                </Button>
                <Button onMove={onMove} playerMove="Stone">
                    <img className={classes.buttonImg} src={require("../../images/Stone.webp")} alt="" />
                </Button>
                <Button onMove={onMove} playerMove="Shears">
                    <img className={classes.buttonImg} src={require("../../images/Shears.webp")} alt="" />
                </Button>
                {/* <SendDataButton onSendData={onSendData}>
                    <img className={classes.buttonImg} src={require("../../images/Door.webp")} alt="" />
                </SendDataButton> */}
            </div>
        </div>
    )
}
