import React from 'react'
import { FormattedMessage } from 'react-intl';

export default function IrisSelector({url, setUrl, predictionKey, setPredictionKey}) {


    const handleSelectionChange = (event) => {
        const selectedValue = event.target.value;
        console.log(url, predictionKey)
        if (selectedValue === 'option1') {

            setUrl('https://aiphagvcv1-prediction.cognitiveservices.azure.com/customvision/v3.0/Prediction/df13f58c-bc35-4396-a652-7f27f47bf92d/detect/iterations/aicopilot/image');
            setPredictionKey('e26a236064bc4ac7aafe1c09cd74cd34');
            console.log(url, predictionKey)
        } else if (selectedValue === 'option2') {
            setUrl('https://aiphagvcv1-prediction.cognitiveservices.azure.com/customvision/v3.0/Prediction/2a85fe3e-855b-4517-b5d0-b8c4bd50a809/detect/iterations/cvgenerico/image');
            setPredictionKey('e26a236064bc4ac7aafe1c09cd74cd34');
            console.log(url, predictionKey)
        }
    };


    return (
        <select defaultValue={"1"} onChange={handleSelectionChange}>
            <option value="1"  disabled><FormattedMessage id='choose'/></option>
            <option value="option1">ai Copilot</option>
            <option value="option2">ai CV</option>
        </select>
    )
}
