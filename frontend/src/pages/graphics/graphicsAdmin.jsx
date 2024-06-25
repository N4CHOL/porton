// eslint-disable-next-line no-unused-vars
import React from 'react'

export default function GraphicsAdmin() {
    return (
        <>

            <div className='ml-8 justify-center'>
                <iframe src="https://grafcds.aiphag.com/d/f7cecf6d-b28f-4726-9564-6cb5e8f7c583/cds?orgId=1&from=1715359683101&to=1715964483101" width="100%" height="1200px" ></iframe>
            </div>
            <div className='ml-8 grid md:grid-cols-2'>
                <div>
                    <iframe src="https://grafcds.aiphag.com/d-solo/f7cecf6d-b28f-4726-9564-6cb5e8f7c583/cds?orgId=1&from=now-1y&to=now&panelId=6" width="100%" height="100%" ></iframe>
                </div>
                <div>
                    <iframe src="https://grafcds.aiphag.com/d-solo/f7cecf6d-b28f-4726-9564-6cb5e8f7c583/cds?orgId=1&from=now-7d&to=now&panelId=7" width="100%" height="100%"></iframe>
                </div>
            </div>
            <div className='ml-8 justify-center'>
                <iframe src="https://grafcds.aiphag.com/d/f7cecf6d-b28f-4726-9564-6cb5e8f7c583/cds?orgId=1&from=1715359642215&to=1715964442215&viewPanel=8" width="100%" height="60%" ></iframe>
            </div>
        </>
    )
}
