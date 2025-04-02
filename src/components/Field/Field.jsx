import React, {useCallback, useEffect} from 'react';
import axios from 'axios';

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


    useEffect(() => {
        WebAppMainButton.setText(`Your count: ${playerCount}`);
        WebAppMainButton.show();
    }, [WebAppMainButton, playerCount]);


    const onSendData = useCallback(async () => {
        const url = "http://localhost:2800/countPlayer";
        try {
            const response = await axios.post(url, user);
            console.log('Response:', response.data);
        } catch (error) {
            console.error('Error:', error.response?.data || error.message);
        }
    }, [user]);


    useEffect(() => {
        tg.onEvent('mainButtonClicked', onSendData);
        return () => {
            tg.offEvent('mainButtonClicked', onSendData);
        }
    }, [tg, onSendData]);

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
