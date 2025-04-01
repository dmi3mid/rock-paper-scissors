import React, { useEffect, useState } from 'react';

import Button from '../UI/Button/Button';

import classes from './Field.module.css';


function getRandomNumber(x, y) {
    return Math.floor(Math.random() * (y - x + 1)) + x;
}

export default function Field() {
    const settings = {
        1: "Paper",
        2: "Stone",
        3: "Shears"
    }
    const [bot, setBot] = useState("WindСharged");
    const [player, setPlayer] = useState("WindСharged");
    const [count, setCount] = useState({botCount: 0, playerCount: 0});
    const onMove = (playerMove) => {
        let botNumberMove = getRandomNumber(1, 3);
        while (settings[botNumberMove] === bot) {
            botNumberMove = getRandomNumber(1, 3);
        }
        let botMove = settings[botNumberMove];
        setBot(botMove);
        setPlayer(playerMove);
        console.log("Bot:", bot);
        console.log("Player:", player);
    }

    useEffect(() => {
        if ((bot === "Paper" && player === "Stone") ||
            (bot === "Stone" && player === "Shears") ||
            (bot === "Shears" && player === "Paper")) {
            setCount(prevCount => ({ 
                ...prevCount, 
                botCount: prevCount.botCount + 3, 
                playerCount: prevCount.playerCount - 2 
            }));
        }
    
        if ((player === "Paper" && bot === "Stone") ||
            (player === "Stone" && bot === "Shears") ||
            (player === "Shears" && bot === "Paper")) {
            setCount(prevCount => ({ 
                ...prevCount, 
                botCount: prevCount.botCount - 2, 
                playerCount: prevCount.playerCount + 3 
            }));
        }

    }, [bot, player])
    return (
        <div className={classes.wrap}>
            <h1 className={classes.title}>Paper Scissors Stone</h1>
            <div className={classes.playfield}>
                <div className={classes.player}>
                    <p className={classes.counter}>{count.botCount}</p>
                    <img className={classes.img} src={require(`../../images/${bot}.webp`)} alt="" />
                </div>
                <div className={classes.player}>
                    <p className={classes.counter}>{count.playerCount}</p>
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
                <Button>
                    <img className={classes.buttonImg} src={require("../../images/Door.webp")} alt="" />
                </Button>
            </div>
        </div>
    )
}
