import React from 'react'
import photo from '../../../assets/img/page/DX1.png';
import "./matriceriaImg.css"
import CompensatorButton from '../CompensatorButton';
import CompensatorSelector from '../compensatorSelector/CompensatorSelector';

export default function MatriceriaImg({ data, handleInput }) {

    return (
        <div className="mt-24 md:mt-16 relative flex items-center justify-center h-auto ">

            <img src={photo} className="matriceriaImg" alt="photo" />

            {/* <CompensatorButton valueChange={handleInput} styling={"absolute lg:px-4 lg:py-2 lg:top-[13%] lg:left-[77.2%]  3xl:top-[14%] 3xl:left-[68.6%]  4xl:top-[14.5%] 4xl:left-[77.6%] bg-card-background text-custom-white 2xl:px-7 2xl:py-5 rounded-full"} />
            <button className="absolute lg:px-4 lg:py-2 lg:top-[13%] lg:left-[77.2%]  3xl:top-[14%] 3xl:left-[68.6%]  4xl:top-[14.5%] 4xl:left-[77.6%] bg-card-background text-custom-white 2xl:px-7 2xl:py-5 rounded-full" >1</button> 
            <button className="absolute lg:px-4 lg:py-2 lg:top-[2.4%] lg:left-[58.7%] 3xl:top-[4.8%] 3xl:left-[55.5%] 4xl:top-[2.8%] 4xl:left-[59%] bg-card-background text-custom-white 2xl:px-7 2xl:py-5 rounded-full">2</button>
            <button className="absolute lg:px-4 lg:py-2 lg:top-[2.3%] lg:left-[40.5%] 3xl:top-[4.7%] 3xl:left-[44.5%] 4xl:top-[2.6%] 4xl:left-[40.8%] bg-card-background text-custom-white 2xl:px-7 2xl:py-5 rounded-full">3</button>
            <button className="absolute lg:px-4 lg:py-2 lg:top-[13%] lg:left-[20.3%] 3xl:top-[13.6%] 3xl:left-[32.5%] 4xl:top-[13%] 4xl:left-[20.6%] bg-card-background text-custom-white 2xl:px-7 2xl:py-5 rounded-full">4</button>
            <button className="absolute lg:px-4 lg:py-2 lg:top-[42.7%] lg:left-[6.3%] 3xl:top-[39.7%] 3xl:left-[24.4%] 4xl:top-[43%] 4xl:left-[6.5%] bg-card-background text-custom-white 2xl:px-8 2xl:py-6 rounded-full">5</button>
            <button className="absolute lg:px-4 lg:py-2 lg:top-[65.8%] lg:left-[11.6%] 3xl:top-[60%] 3xl:left-[27.3%] 4xl:top-[66.7%] 4xl:left-[11.9%] bg-card-background text-custom-white 2xl:px-7 2xl:py-5 rounded-full">6</button>
            <button className="absolute lg:px-4 lg:py-2 lg:top-[80.4%] lg:left-[25.4%] 3xl:top-[72.5%] 3xl:left-[35.5%] 4xl:top-[80.8%] 4xl:left-[25.7%] bg-card-background text-custom-white 2xl:px-7 2xl:py-5 rounded-full">7</button>
            <button className="absolute lg:px-4 lg:py-2 lg:top-[87.8%] lg:left-[39.9%] 3xl:top-[79%] 3xl:left-[44.2%] 4xl:top-[88.6%] 4xl:left-[40.1%] bg-card-background text-custom-white 2xl:px-7 2xl:py-5 rounded-full">8</button>
            <button className="absolute lg:px-4 lg:py-2 lg:top-[88.4%] lg:left-[58.4%] 3xl:top-[79.4%] 3xl:left-[55.4%] 4xl:top-[89.6%] 4xl:left-[59.1%] bg-card-background text-custom-white 2xl:px-6 2xl:py-4 rounded-full">9</button>
            <button className="absolute lg:px-4 lg:py-3 lg:top-[87.4%] lg:left-[75.4%] 4xl:top-[88.7%] 4xl:left-[75.8%] bg-card-background text-custom-white 2xl:px-6 2xl:py-5 rounded-full">10</button>
            <button className="absolute lg:px-4 lg:py-3 lg:top-[60.4%] lg:left-[88.4%] 3xl:top-[79.4%] 3xl:left-[65.4%] 4xl:top-[61.7%] 4xl:left-[89.5%] bg-card-background text-custom-white 2xl:px-6 2xl:py-5 rounded-full">11</button>
            <button className="absolute lg:px-4 lg:py-3 lg:top-[39.4%] lg:left-[88.4%] 3xl:top-[79.4%] 3xl:left-[65.4%] 4xl:top-[40%] 4xl:left-[88.8%] bg-card-background text-custom-white 2xl:px-6 2xl:py-5 rounded-full">12</button>
            <button className="absolute lg:px-4 lg:py-3 lg:top-[58.4%] lg:left-[47.2%] 3xl:top-[34.4%] 3xl:left-[61.4%] 4xl:top-[60.4%] 4xl:left-[47.9%] bg-card-background text-custom-white 2xl:px-6 2xl:py-5 rounded-full">13</button>
            <button className="absolute lg:px-4 lg:py-3 lg:top-[44.9%] lg:left-[40%] 3xl:top-[27.1%] 3xl:left-[56.9%] 4xl:top-[46.9%] 4xl:left-[40.8%] bg-card-background text-custom-white 2xl:px-6 2xl:py-5 rounded-full">14</button>
            <button className="absolute lg:px-4 lg:py-3 lg:top-[30.1%] lg:left-[45.7%] 3xl:top-[54.1%] 3xl:left-[56.7%] 4xl:top-[30.9%] 4xl:left-[46.4%] bg-card-background text-custom-white 2xl:px-6 2xl:py-5 rounded-full">15</button>
            <button className="absolute lg:px-4 lg:py-3 lg:top-[32%] lg:left-[60.7%] 3xl:top-[50%] 3xl:left-[63.7%] 4xl:top-[33.2%] 4xl:left-[61.2%] bg-card-background text-custom-white 2xl:px-6 2xl:py-5 rounded-full">16</button>
            <button className="absolute lg:px-4 lg:py-3 lg:top-[59%] lg:left-[60.6%] 3xl:top-[29%] 3xl:left-[47.2%] 4xl:top-[60.9%] 4xl:left-[61.4%] bg-card-background text-custom-white 2xl:px-6 2xl:py-5 rounded-full">17</button>
            <button className="absolute lg:px-4 lg:py-3 lg:top-[47.5%] lg:left-[73.2%] 3xl:top-[40.5%] 3xl:left-[44.4%] 4xl:top-[49.9%] 4xl:left-[73.9%] bg-card-background text-custom-white 2xl:px-6 2xl:py-5 rounded-full">18</button>
            <button className="absolute lg:px-4 lg:py-3 lg:top-[36%] lg:left-[68.6%] 3xl:top-[52.3%] 3xl:left-[50.6%] 4xl:top-[37%] 4xl:left-[69.5%] bg-card-background text-custom-white 2xl:px-6 2xl:py-5 rounded-full">19</button>*/}



            {data.activities.slice(0, 19).map((activity, index) => {
                let styling = 'absolute lg:px-4 lg:py-2 lg:top-[13%] lg:left-[77.2%]  3xl:top-[14%] 3xl:left-[68.6%]  4xl:top-[14.5%] 4xl:left-[77.6%] bg-card-background text-custom-white 2xl:px-7 2xl:py-5 rounded-full';
                let span = 'Compensador'
                let loader = false
                switch (index) {
                    case 0:
                        styling = 'absolute sm:px-2 sm:py-0  sm:top-[13%] sm:left-[80.2%] lg:px-4 lg:py-2  lg:top-[13%] lg:left-[77.2%]  3xl:top-[14%] 3xl:left-[68.6%]  4xl:top-[14.5%] 4xl:left-[77.6%] bg-card-background text-custom-white 2xl:px-7 2xl:py-5 rounded-full';
                        span = 'Compensador Externo Nº 1'
                        break;
                    case 1:
                        styling = 'absolute absolute sm:px-2 sm:py-0  sm:top-[3%] sm:left-[59.7%] lg:px-4 lg:py-2 lg:top-[2.4%] lg:left-[58.7%] 3xl:top-[4.8%] 3xl:left-[55.5%] 4xl:top-[2.8%] 4xl:left-[59%] bg-card-background text-custom-white 2xl:px-7 2xl:py-5 rounded-full';
                        span = 'Compensador Externo Nº 2'
                        break;
                    case 2:
                        styling = 'absolute lg:px-4 sm:px-2 sm:py-0  sm:top-[2%] sm:left-[39.5%] lg:py-2 lg:top-[2.3%] lg:left-[40.5%] 3xl:top-[4.7%] 3xl:left-[44.5%] 4xl:top-[2.6%] 4xl:left-[40.8%] bg-card-background text-custom-white 2xl:px-7 2xl:py-5 rounded-full';
                        span = 'Compensador Externo Nº 3'
                        break;
                    case 3:
                        styling = 'absolute lg:px-4 sm:px-2 sm:py-0  sm:top-[12.8%] sm:left-[17%] lg:py-2 lg:top-[13%] lg:left-[20.3%] 3xl:top-[13.6%] 3xl:left-[32.5%] 4xl:top-[13%] 4xl:left-[20.6%] bg-card-background text-custom-white 2xl:px-7 2xl:py-5 rounded-full';
                        span = 'Compensador Externo Nº 4'
                        break;
                    case 4:
                        styling = 'absolute lg:px-4 sm:px-2 sm:py-0  sm:top-[42.8%] sm:left-[1.6%] lg:py-2 lg:top-[42.7%] lg:left-[6.3%] 3xl:top-[39.7%] 3xl:left-[24.4%] 4xl:top-[43%] 4xl:left-[6.5%] bg-card-background text-custom-white 2xl:px-8 2xl:py-6 rounded-full';
                        span = 'Compensador Externo Nº 5'
                        break;
                    case 5:
                        styling = 'absolute lg:px-4 sm:px-2 sm:py-0  sm:top-[65.8%] sm:left-[7.4%] lg:py-2 lg:top-[65.8%] lg:left-[11.6%] 3xl:top-[60%] 3xl:left-[27.3%] 4xl:top-[66.7%] 4xl:left-[11.9%] bg-card-background text-custom-white 2xl:px-7 2xl:py-5 rounded-full';
                        span = 'Compensador Externo Nº 6'
                        break;
                    case 6:
                        styling = 'absolute lg:px-4 lg:py-2 lg:top-[80.4%] lg:left-[25.4%] 3xl:top-[72.5%] 3xl:left-[35.5%] 4xl:top-[80.8%] 4xl:left-[25.7%] bg-card-background text-custom-white 2xl:px-7 2xl:py-5 rounded-full';
                        span = 'Compensador Externo Nº 7'
                        break;
                    case 7:
                        styling = 'absolute lg:px-4 lg:py-2 lg:top-[87.8%] lg:left-[39.9%] 3xl:top-[79%] 3xl:left-[44.2%] 4xl:top-[88.6%] 4xl:left-[40.1%] bg-card-background text-custom-white 2xl:px-7 2xl:py-5 rounded-full';
                        span = 'Compensador Externo Nº 8'
                        break;
                    case 8:
                        styling = 'absolute lg:px-4 lg:py-2 lg:top-[88.4%] lg:left-[58.4%] 3xl:top-[79.4%] 3xl:left-[55.4%] 4xl:top-[89.6%] 4xl:left-[59.1%] bg-card-background text-custom-white 2xl:px-6 2xl:py-4 rounded-full';
                        span = 'Compensador Externo Nº 9'
                        break;
                    case 9:
                        styling = 'absolute lg:px-4 lg:py-3 lg:top-[87.4%] lg:left-[75.4%] 4xl:top-[88.7%] 4xl:left-[75.8%] bg-card-background text-custom-white 2xl:px-6 2xl:py-5 rounded-full';
                        span = 'Compensador Externo Nº 10'
                        break;
                    case 10:
                        styling = 'absolute lg:px-4 lg:py-3 lg:top-[60.4%] lg:left-[88.4%] 3xl:top-[79.4%] 3xl:left-[65.4%] 4xl:top-[61.7%] 4xl:left-[89.5%] bg-card-background text-custom-white 2xl:px-6 2xl:py-5 rounded-full';
                        span = 'Compensador Externo Nº 11'
                        break;
                    case 11:
                        styling = 'absolute lg:px-4 lg:py-3 lg:top-[39.4%] lg:left-[88.4%] 3xl:top-[79.4%] 3xl:left-[65.4%] 4xl:top-[40%] 4xl:left-[88.8%] bg-card-background text-custom-white 2xl:px-6 2xl:py-5 rounded-full';
                        span = 'Compensador Externo Nº 12'
                        break;
                    case 12:
                        styling = 'absolute lg:px-4 lg:py-3 lg:top-[58.4%] lg:left-[47.2%] 3xl:top-[34.4%] 3xl:left-[61.4%] 4xl:top-[60.4%] 4xl:left-[47.9%] bg-card-background text-custom-white 2xl:px-6 2xl:py-5 rounded-full';
                        span = 'Compensador Isla Delantera Nº 13'
                        loader = true
                        break;
                    case 13:
                        styling = 'absolute lg:px-4 lg:py-3 lg:top-[44.9%] lg:left-[40%] 3xl:top-[27.1%] 3xl:left-[56.9%] 4xl:top-[46.9%] 4xl:left-[40.8%] bg-card-background text-custom-white 2xl:px-6 2xl:py-5 rounded-full';
                        span = 'Compensador Isla Delantera Nº 14'
                        loader = true
                        break;
                    case 14:
                        styling = 'absolute lg:px-4 lg:py-3 lg:top-[30.1%] lg:left-[45.7%] 3xl:top-[54.1%] 3xl:left-[56.7%] 4xl:top-[30.9%] 4xl:left-[46.4%] bg-card-background text-custom-white 2xl:px-6 2xl:py-5 rounded-full';
                        span = 'Compensador Isla Delantera Nº 15'
                        loader = true
                        break;
                    case 15:
                        styling = 'absolute lg:px-4 lg:py-3 lg:top-[32%] lg:left-[60.7%] 3xl:top-[50%] 3xl:left-[63.7%] 4xl:top-[33.2%] 4xl:left-[61.2%] bg-card-background text-custom-white 2xl:px-6 2xl:py-5 rounded-full';
                        span = 'Compensador Isla Delantera Nº 16'
                        loader = true
                        break;
                    case 16:
                        styling = 'absolute lg:px-4 lg:py-3 lg:top-[59%] lg:left-[60.6%] 3xl:top-[29%] 3xl:left-[47.2%] 4xl:top-[60.9%] 4xl:left-[61.4%] bg-card-background text-custom-white 2xl:px-6 2xl:py-5 rounded-full';
                        span = 'Compensador Isla Delantera Nº 17'
                        loader = true
                        break;
                    case 17:
                        styling = 'absolute lg:px-4 lg:py-3 lg:top-[47.5%] lg:left-[73.2%] 3xl:top-[40.5%] 3xl:left-[44.4%] 4xl:top-[49.9%] 4xl:left-[73.9%] bg-card-background text-custom-white 2xl:px-6 2xl:py-5 rounded-full';
                        span = 'Compensador Isla Delantera Nº 18'
                        loader = true
                        break;
                    case 18:
                        styling = 'absolute lg:px-4 lg:py-3 lg:top-[36%] lg:left-[68.6%] 3xl:top-[52.3%] 3xl:left-[50.6%] 4xl:top-[37%] 4xl:left-[69.5%] bg-card-background text-custom-white 2xl:px-6 2xl:py-5 rounded-full';
                        span = 'Compensador Isla Delantera Nº 19'
                        loader = true
                        break;
                }

                return (
                    <>
                        {loader === false ? (
                            <CompensatorButton key={index} styling={styling} data={activity.name} span={span} index={index} valueChange={handleInput} />

                        ) : (
                            <CompensatorSelector key={index} styling={styling} data={activity.name} span={span} index={index} valueChange={handleInput} />
                        )}

                    </>

                );
            })}



        </div>
    )
}
