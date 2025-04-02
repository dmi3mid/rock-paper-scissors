import React, {useEffect, useCallback, useState} from 'react';
import Motion from "rc-motion";

import useGame from '../../hooks/useGame';
import useTelegram from '../../hooks/useTelegram';

import Button from '../UI/Button/Button';


import classes from './Field.module.css';
import "./Field.animations.css"; 

export default function Field() {
    const { botCount,
            playerCount,
            bot,
            player,
            onMove } = useGame();
    const {tg, WebAppMainButton} = useTelegram();

    const [botKey, setBotKey] = useState(0);
    const [playerKey, setPlayerKey] = useState(0);

    useEffect(() => {
        setBotKey(prevKey => prevKey + 1);
    }, [bot]);

    useEffect(() => {
        setPlayerKey(prevKey => prevKey + 1);
    }, [player])
    
    useEffect(() => {
        WebAppMainButton.setText(`Your count: ${playerCount}`);
        WebAppMainButton.show();
    }, [WebAppMainButton, playerCount]);
 
    const onSendData = useCallback(() => {
        tg.sendData(JSON.stringify({playerCount}));
    }, [tg, playerCount]);

    useEffect(() => {
        tg.onEvent('mainButtonClicked', onSendData);
        return () => {
            tg.offEvent('mainButtonClicked', onSendData);
        }
    }, [tg, onSendData]);

    return (
        <div className={classes.wrap}>
            <h1 className={classes.title}>Paper Scissors Stone</h1>
            <div className={classes.playfield}>
                <div className={classes.player}>
                    <p className={classes.counter}>{botCount}</p>
                    <Motion key={botKey} visible={!!bot} motionName="fade-scale" removeOnLeave>
                        {({ className }) => (
                            <img className={`${classes.img} ${className}`} 
                                 src={require(`../../images/${bot}.webp`)} 
                                 alt="" />
                        )}
                    </Motion>
                </div>
                <div className={classes.player}>
                    <p className={classes.counter}>{playerCount}</p>
                    <Motion key={playerKey} visible={!!player} motionName="fade-scale" removeOnLeave>
                        {({ className }) => (
                            <img className={`${classes.img} ${className}`} 
                                 src={require(`../../images/${player}.webp`)} 
                                 alt="" />
                        )}
                    </Motion>
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
            </div>
        </div>
    
        // <div className={classes.wrap}>
        //     <h1 className={classes.title}>Paper Scissors Stone</h1>
        //     <div className={classes.playfield}>
        //         <div className={classes.player}>
        //             <p className={classes.counter}>{botCount}</p>
        //             <Motion visible={!!bot} motionName="fade-scale" removeOnLeave>
        //                 {({ className }) => (
        //                     <img className={`${classes.img} ${className}`} 
        //                          src={require(`../../images/${bot}.webp`)} 
        //                          alt="" />
        //                 )}
        //             </Motion>
        //             {/* <img className={classes.img} src={require(`../../images/${bot}.webp`)} alt="" /> */}
        //         </div>
        //         <div className={classes.player}>
        //             <p className={classes.counter}>{playerCount}</p>
        //             <Motion visible={!!player} motionName="fade-scale" removeOnLeave>
        //                 {({ className }) => (
        //                     <img className={`${classes.img} ${className}`} 
        //                          src={require(`../../images/${player}.webp`)} 
        //                          alt="" />
        //                 )}
        //             </Motion>
        //             {/* <img className={classes.img} src={require(`../../images/${player}.webp`)} alt="" /> */}
        //         </div>
        //     </div>
        //     <div className={classes.interaction}>
        //         <Button onMove={onMove} playerMove="Paper">
        //             <img className={classes.buttonImg} src={require("../../images/Paper.webp")} alt="" />
        //         </Button>
        //         <Button onMove={onMove} playerMove="Stone">
        //             <img className={classes.buttonImg} src={require("../../images/Stone.webp")} alt="" />
        //         </Button>
        //         <Button onMove={onMove} playerMove="Shears">
        //             <img className={classes.buttonImg} src={require("../../images/Shears.webp")} alt="" />
        //         </Button>
        //     </div>
        // </div>
    )
}
