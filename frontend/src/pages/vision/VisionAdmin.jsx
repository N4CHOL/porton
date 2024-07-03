// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import AdminTitle from '../../components/titles/adminTitle/AdminTitle';
import { FormattedMessage } from 'react-intl';
import Slider from '../../components/slider/Slider.jsx';
import "./VisionAdmin.css"
import IrisSelector from '../../components/iris/selector/IrisSelector.jsx';
import { PuffLoader } from 'react-spinners';

export default function VisionAdmin() {
    const [image, setImage] = useState(null);
    const [predictions, setPredictions] = useState(null);
    const [value, setValue] = useState(0.8);
    const [selectedValue, setSelectedValue] = useState('Option1');
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [predictionKey, setPredictionKey] = useState('e26a236064bc4ac7aafe1c09cd74cd34');
    const [url, setUrl] = useState('https://aiphagvcv1-prediction.cognitiveservices.azure.com/customvision/v3.0/Prediction/2a85fe3e-855b-4517-b5d0-b8c4bd50a809/detect/iterations/cvgenerico/image');
    const [loading, setLoading] = useState(false);
    const [showAnalyzeMessage, setShowAnalyzeMessage] = useState(false);

    //const predictionKey = "e26a236064bc4ac7aafe1c09cd74cd34";
    //const predictionKey = "e26a236064bc4ac7aafe1c09cd74cd34"

    const handleImageUpload = (event) => {
        setImage(event.target.files[0]);
        setPredictions(null);
        setLoading(false);
        setShowAnalyzeMessage(true); // Show message when image is uploaded
    };

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
       
    };

    const handlePredict = async () => {
        setPredictions(null)
        if (!image) return;

        setLoading(true);
        //const url = `https://aiphagvcv1-prediction.cognitiveservices.azure.com/customvision/v3.0/Prediction/df13f58c-bc35-4396-a652-7f27f47bf92d/detect/iterations/aicopilot/image`;
        //const url = `https://aiphagvcv1-prediction.cognitiveservices.azure.com/customvision/v3.0/Prediction/2a85fe3e-855b-4517-b5d0-b8c4bd50a809/detect/iterations/cvgenerico/image`
         const headers = {
         'Prediction-Key': predictionKey,
             'Content-Type': 'application/octet-stream',
         };

         const imageData = await image.arrayBuffer();

         const response = await fetch(url, {
             method: 'POST',
             headers: headers,
             body: imageData,
         });

         const data = await response.json();
         setPredictions(data.predictions);
         setLoading(false);
    };

    return (
        <div>
            <div className='irisTitle'>
                <AdminTitle titleTxt="i.r.i.s" />
                <span className='text-custom-white'>Intelligent Recognition and Imaging System</span>
            </div>
            <div className='md:ml-8 grid md:grid-cols-12'>

                <div className='col-span-8'>
                    {loading ? (
                        <div className='loadingContainer'>
                            <PuffLoader color="#3b82f6" loading={true} size={150} />
                        </div>
                    ) : predictions ? (
                        <div>
                            <div style={{ position: 'relative', display: 'inline-block' }}>
                                <img src={URL.createObjectURL(image)} className='irisImage' alt="Uploaded" style={{ maxWidth: '800px', maxHeight: '700px' }} />
                                {predictions
                                    .filter(prediction => prediction.probability > value)
                                    .map((prediction, index) => (
                                        <div
                                            key={index}
                                            className='prediction'
                                            style={{
                                                position: 'absolute',
                                                left: prediction.boundingBox.left * 100 + '%',
                                                top: prediction.boundingBox.top * 100 + '%',
                                                width: prediction.boundingBox.width * 100 + '%',
                                                height: prediction.boundingBox.height * 100 + '%',
                                                border: '2px solid red',
                                                opacity: hoveredIndex === index ? 0.8 : 1, // Change opacity on hover

                                            }}
                                            onMouseEnter={() => setHoveredIndex(index)}
                                            onMouseLeave={() => setHoveredIndex(null)}
                                        >
                                            {hoveredIndex === index && (
                                                <div className="predictionValue">{prediction.tagName}: {(prediction.probability * 100).toPrecision(3)}%</div>
                                            )}
                                        </div>
                                    ))}
                            </div>

                        </div>
                    ) : !showAnalyzeMessage ? (

                        <div className='md:mt-40 bg-card-background p-8 rounded irisMessage ' style={{
                            width: 60 + "%"

                        }}>
                            <div className=''>
                                <p>
                                    <FormattedMessage id='irisyap' />
                                </p>
                            </div>
                        </div>
                    ) : showAnalyzeMessage && !predictions && (
                        <div className='md:mt-40 bg-card-background p-8 rounded irisMessage' style={{ width: '60%' }}>
                            <div>
                                <p>
                                    <FormattedMessage id='pressAnalyze' />
                                </p>
                            </div>
                        </div>
                    )}


                </div>
                <div className='col-span-4 '>
                    <div className='irisButton'>
                        <input type="file" onChange={handleImageUpload} />
                    </div>

                    <button className='bg-blue-500 text-black hover:bg-blue-300 mt-8' onClick={handlePredict}><FormattedMessage id='Analize' /></button>
                    {/* <div className='mt-4'>
                        <div className="select-container">
                            <label className='text-custom-white block' htmlFor="options"><FormattedMessage id='Iteration' /></label>
                            <select id="options" value={selectedValue} onChange={handleChange}>
                                <option value="11">11</option>
                                <option value="8">8</option>
                            </select>
                        </div>
                    </div> */}

                    <div className='mt-4 grid w-60'>
                        <span className='text-custom-white'><FormattedMessage id='chooseAi' /></span>
                        <IrisSelector url={url} setUrl={setUrl} predictionKey={predictionKey} setPredictionKey={setPredictionKey} />
                    </div>


                    <div className='mt-4'>
                        <span className='text-custom-white'><FormattedMessage id='threshold' /></span>
                        <Slider value={value} setValue={setValue} />
                    </div>

                    {predictions && (
                        <div className='mt-8  rounded mr-8' >
                            {
                                predictions
                                    .filter(prediction => prediction.probability > value)
                                    .map((prediction, index) => (
                                        <div
                                            key={index}
                                            className='hover:text-blue-400 text-custom-white'

                                        >
                                            <div className='grid grid-cols-12 whitespace-nowrap '>
                                                <div className='col-span-10'>
                                                    {prediction.tagName}:

                                                </div>
                                                <div className='col-span-2 md:ml-8'>
                                                    {(prediction.probability * 100).toPrecision(3)}%

                                                </div>
                                            </div>
                                        </div>
                                    ))
                            }</div>)

                    }
                </div>
            </div>

        </div>
    );
}