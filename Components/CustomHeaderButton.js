import React from 'react';
import { HeaderButton, HeaderButtons, Item } from 'react-navigation-header-buttons';
import { AntDesign } from '@expo/vector-icons';

const CustomHdrButton = props => {
   return <HeaderButton {...props} IconComponent={AntDesign}
      iconSize={23} color="#fff" >
   </HeaderButton>
}

const CustomHeaderButton = props => {
   return (
      <HeaderButtons HeaderButtonComponent={CustomHdrButton}>
         <Item title={props.title} iconName={props.iconName}
            onPress={props.pressHandler}>
         </Item>
      </HeaderButtons>
   )
}

export default CustomHeaderButton;