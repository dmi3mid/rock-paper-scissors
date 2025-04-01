import React from 'react'

import classes from './Button.module.css';

export default function Button({children, ...props}) {
    return (
        <button className={[classes.reser, classes.button].join(" ")} {...props}>{children}</button>
    )
}
