import {  CheckBox } from 'react-native-elements';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
let spaceIdArray=[]

const ProjectSpaces=(props)=>{
    const {spaceNames}=props
    const {spaceName,spaceId}=spaceNames
    const [isSelected, setSelection] = useState(false);
    const changeCheckbox=async()=>{
      if(isSelected===true){
        setSelection(false)
        let valueToRemove =spaceId;
        console.log(valueToRemove)
      const index=spaceIdArray.indexOf(valueToRemove)
      if(index !==-1){
        spaceIdArray.splice(index, 1);
        
        await AsyncStorage.setItem('spaceIdArray',JSON.stringify(spaceIdArray))
      }
      console.log(spaceIdArray)
        
      }
      else{
        setSelection(true)

        spaceIdArray.push(spaceId)
        await AsyncStorage.setItem('spaceIdArray',JSON.stringify(spaceIdArray))
        console.log(spaceIdArray)
       
      }
      
    }
    return(
        <CheckBox
        checked={isSelected}
        onPress={changeCheckbox}
        iconType="material-community"
        checkedIcon="checkbox-outline"
        uncheckedIcon={'checkbox-blank-outline'}
        title={spaceName}
      />
    )
}
export default ProjectSpaces