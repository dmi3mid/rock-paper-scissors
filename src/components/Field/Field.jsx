import React, { useState } from 'react';

import Button from '../UI/Button/Button';

import classes from './Field.module.css';

export default function Field() {
    const [bot, setBot] = useState("WindСharged");
    const [player, setPlayer] = useState("WindСharged");
    return (
        <div className={classes.wrap}>
            <h1 className={classes.title}>Paper Scissors Stone</h1>
            <div className={classes.playfield}>
                <div className={classes.player}>
                    <img className={classes.img} src={require(`../../images/${bot}.webp`)} alt="" />
                </div>
                <div className={classes.player}>
                    <img className={classes.img} src={require(`../../images/${player}.webp`)} alt="" />
                </div>
            </div>
            <div className={classes.interaction}>
                <Button>
                    <img className={classes.buttonImg} src={require("../../images/Paper.webp")} alt="" />
                </Button>
                <Button>
                    <img className={classes.buttonImg} src={require("../../images/Stone.webp")} alt="" />
                </Button>
                <Button>
                    <img className={classes.buttonImg} src={require("../../images/Shears.webp")} alt="" />
                </Button>
                <Button>
                    <img className={classes.buttonImg} src={require("../../images/Door.webp")} alt="" />
                </Button>
            </div>
        </div>
    )
}
