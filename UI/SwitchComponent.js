import React from 'react';
import {Switch} from 'react-native';

const SwitchComponent = props => {
    return (
        <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={props.isEnabled ? "#2c3e50" : "#f4f3f4"}
            onValueChange={(e) => { props.valueChangeHandler(e) }}
            value={props.isEnabled}
        />
    )
}

export default SwitchComponent;