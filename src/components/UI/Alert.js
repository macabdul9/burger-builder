import React from 'react';
import Alert,  from '@material-ui/core/alert'

const alert = (props) => (
    <Alert severity={props.action}>
        <AlertTitle>{props.action}</AlertTitle>
            Purchase {props.actions} — check it out!
    </Alert>
)
